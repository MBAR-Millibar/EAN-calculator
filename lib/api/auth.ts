/**
 * Millibar user authentication for the calculation API (WEB-33).
 *
 * The API accepts a Millibar Passport access token and validates it by asking
 * DEM (app.millibar.io) who it belongs to: GET /api/v1/user. DEM stays the
 * single source of truth, and revoked tokens stop working within CACHE_TTL_MS.
 *
 * Only the SHA-256 hash of a token is ever stored or used as a key; the raw
 * token is sent to DEM and nowhere else.
 */

import { json } from "./json.ts";

export const DEFAULT_MILLIBAR_API_URL = "https://app.millibar.io";

const CACHE_TTL_MS = 60_000;
const CACHE_MAX_ENTRIES = 1_000;
const DEM_TIMEOUT_MS = 5_000;

export interface MillibarUser {
  id: number;
  name: string;
  email: string;
}

export type AuthResult =
  | { ok: true; user: MillibarUser }
  | { ok: false; response: Response };

export interface AuthDeps {
  fetch: typeof fetch;
  now: () => number;
  baseUrl: string;
}

const cache = new Map<string, { user: MillibarUser; expiresAt: number }>();

/** Clear the validated-token cache. For tests. */
export function clearAuthCache(): void {
  cache.clear();
}

function defaultDeps(): AuthDeps {
  return {
    fetch: globalThis.fetch,
    now: Date.now,
    baseUrl: process.env.MILLIBAR_API_URL || DEFAULT_MILLIBAR_API_URL,
  };
}

export function bearerToken(request: Request): string | null {
  const match = request.headers.get("authorization")?.match(/^Bearer\s+(\S+)\s*$/i);
  return match ? match[1] : null;
}

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

function remember(key: string, user: MillibarUser, now: number): void {
  if (cache.size >= CACHE_MAX_ENTRIES) {
    for (const [k, entry] of cache) {
      if (entry.expiresAt <= now) cache.delete(k);
    }
    // Still full of live entries: drop the oldest (Map keeps insertion order).
    if (cache.size >= CACHE_MAX_ENTRIES) cache.delete(cache.keys().next().value!);
  }
  cache.set(key, { user, expiresAt: now + CACHE_TTL_MS });
}

function unauthenticated(): Response {
  return json(
    { error: "unauthenticated", message: "A valid Millibar access token is required." },
    { status: 401, headers: { "WWW-Authenticate": 'Bearer realm="millibar"' } }
  );
}

function unavailable(): Response {
  return json(
    { error: "auth_unavailable", message: "Could not verify the token with Millibar. Try again shortly." },
    { status: 503, headers: { "Retry-After": "30" } }
  );
}

/**
 * Resolve the Millibar user behind the request's bearer token. Fails closed:
 * if DEM can't be reached the request is rejected (503), never let through.
 */
export async function requireMillibarUser(
  request: Request,
  deps: AuthDeps = defaultDeps()
): Promise<AuthResult> {
  const token = bearerToken(request);
  if (!token) return { ok: false, response: unauthenticated() };

  const key = await sha256(token);
  const now = deps.now();
  const cached = cache.get(key);
  if (cached && cached.expiresAt > now) return { ok: true, user: cached.user };

  let res: Response;
  try {
    res = await deps.fetch(new URL("/api/v1/user", deps.baseUrl), {
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(DEM_TIMEOUT_MS),
    });
  } catch {
    return { ok: false, response: unavailable() };
  }

  if (res.status === 401 || res.status === 403) {
    cache.delete(key);
    return { ok: false, response: unauthenticated() };
  }
  if (!res.ok) return { ok: false, response: unavailable() };

  let user: MillibarUser | undefined;
  try {
    const body = await res.json();
    user = body?.user;
  } catch {
    // fall through: a 200 without a usable body is a DEM problem, not the caller's
  }
  if (!user || typeof user.id !== "number") return { ok: false, response: unavailable() };

  const identity = { id: user.id, name: user.name, email: user.email };
  remember(key, identity, now);
  return { ok: true, user: identity };
}
