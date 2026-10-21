import { beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { clearAuthCache, type AuthDeps } from "./auth.ts";
import {
  bestMixEndpoint,
  divePlanEndpoint,
  eadEndpoint,
  modEndpoint,
} from "./endpoints.ts";
import { handleCalculation } from "./handler.ts";
import { json } from "./json.ts";

const TOKEN = "valid-token";
const USER = { id: 7, name: "Jane Diver", email: "jane@example.com" };

/** Fake DEM: answers /api/v1/user for TOKEN, 401 for anything else. */
function fakeDem(overrides: Partial<AuthDeps> = {}) {
  const calls: Array<{ url: string; auth: string | null }> = [];
  let clock = 1_000_000;
  const deps: AuthDeps = {
    baseUrl: "https://dem.test",
    now: () => clock,
    fetch: (async (input: URL | RequestInfo, init?: RequestInit) => {
      const auth = new Headers(init?.headers).get("authorization");
      calls.push({ url: String(input), auth });
      return auth === `Bearer ${TOKEN}`
        ? json({ user: USER, is_super_admin: false, member: null })
        : json({ message: "Unauthenticated." }, { status: 401 });
    }) as typeof fetch,
    ...overrides,
  };
  return { deps, calls, advance: (ms: number) => (clock += ms) };
}

function get(path: string, token: string | null = TOKEN) {
  return new Request(`https://ean.test${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

beforeEach(() => clearAuthCache());

// --- Authentication -------------------------------------------------------

test("missing token → 401 without calling DEM", async () => {
  const dem = fakeDem();
  const res = await handleCalculation(get("/api/v1/mod?o2=32&maxPO2=1.4", null), modEndpoint, dem.deps);
  assert.equal(res.status, 401);
  assert.equal((await res.json()).error, "unauthenticated");
  assert.match(res.headers.get("www-authenticate") ?? "", /^Bearer/);
  assert.equal(dem.calls.length, 0);
});

test("token rejected by DEM → 401", async () => {
  const dem = fakeDem();
  const res = await handleCalculation(get("/api/v1/mod?o2=32&maxPO2=1.4", "revoked"), modEndpoint, dem.deps);
  assert.equal(res.status, 401);
});

test("valid token is checked against DEM /api/v1/user", async () => {
  const dem = fakeDem();
  const res = await handleCalculation(get("/api/v1/mod?o2=32&maxPO2=1.4"), modEndpoint, dem.deps);
  assert.equal(res.status, 200);
  assert.deepEqual(dem.calls, [{ url: "https://dem.test/api/v1/user", auth: `Bearer ${TOKEN}` }]);
});

test("validated token is cached for 60 s, then re-checked", async () => {
  const dem = fakeDem();
  const req = () => get("/api/v1/mod?o2=32&maxPO2=1.4");
  await handleCalculation(req(), modEndpoint, dem.deps);
  dem.advance(59_000);
  await handleCalculation(req(), modEndpoint, dem.deps);
  assert.equal(dem.calls.length, 1);
  dem.advance(2_000);
  await handleCalculation(req(), modEndpoint, dem.deps);
  assert.equal(dem.calls.length, 2);
});

test("DEM unreachable → 503 (fails closed)", async () => {
  const dem = fakeDem({ fetch: (async () => { throw new TypeError("fetch failed"); }) as typeof fetch });
  const res = await handleCalculation(get("/api/v1/mod?o2=32&maxPO2=1.4"), modEndpoint, dem.deps);
  assert.equal(res.status, 503);
  assert.equal((await res.json()).error, "auth_unavailable");
});

test("DEM 5xx → 503", async () => {
  const dem = fakeDem({ fetch: (async () => new Response("oops", { status: 502 })) as typeof fetch });
  const res = await handleCalculation(get("/api/v1/mod?o2=32&maxPO2=1.4"), modEndpoint, dem.deps);
  assert.equal(res.status, 503);
});

test("auth runs before validation: bad params without a token → 401", async () => {
  const dem = fakeDem();
  const res = await handleCalculation(get("/api/v1/mod?o2=abc", null), modEndpoint, dem.deps);
  assert.equal(res.status, 401);
});

// --- Validation -----------------------------------------------------------

async function issues(path: string, endpoint: Parameters<typeof handleCalculation>[1]) {
  const res = await handleCalculation(get(path), endpoint, fakeDem().deps);
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.equal(body.error, "validation_failed");
  return body.issues as Array<{ field: string; message: string }>;
}

test("missing and empty params are reported per field", async () => {
  const found = await issues("/api/v1/dive-plan?depth=&o2=32", divePlanEndpoint);
  assert.deepEqual(found.map((i) => i.field).sort(), ["depth", "maxPO2"]);
});

test("non-numeric and out-of-range params → 400", async () => {
  assert.equal((await issues("/api/v1/mod?o2=abc&maxPO2=1.4", modEndpoint))[0].field, "o2");
  assert.equal((await issues("/api/v1/mod?o2=20&maxPO2=1.4", modEndpoint))[0].field, "o2");
  assert.equal((await issues("/api/v1/mod?o2=32&maxPO2=1.7", modEndpoint))[0].field, "maxPO2");
  assert.equal((await issues("/api/v1/ead?o2=32&depth=61", eadEndpoint))[0].field, "depth");
  assert.equal((await issues("/api/v1/ead?o2=32&depth=-1", eadEndpoint))[0].field, "depth");
});

// --- Results match the website (WEB-3 reference table) --------------------

async function result(path: string, endpoint: Parameters<typeof handleCalculation>[1]) {
  const res = await handleCalculation(get(path), endpoint, fakeDem().deps);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("cache-control"), "private, no-store");
  const body = await res.json();
  assert.ok(body.disclaimer);
  return body.result;
}

const MOD_CASES: Array<[number, number, number]> = [
  [32, 1.4, 33],
  [32, 1.6, 40],
  [36, 1.4, 28],
  [36, 1.6, 34],
  [40, 1.4, 25],
  [40, 1.6, 30],
  [34, 1.4, 31],
  [28, 1.4, 40],
  [21, 1.4, 56],
  [21, 1.6, 66],
];

test("/mod matches the WEB-3 reference table", async () => {
  for (const [o2, po2, expected] of MOD_CASES) {
    const r = await result(`/api/v1/mod?o2=${o2}&maxPO2=${po2}`, modEndpoint);
    assert.equal(r.mod, expected, `EAN${o2} @ ${po2}`);
  }
  assert.equal((await result("/api/v1/mod?o2=32&maxPO2=1.4", modEndpoint)).modFeet, 108);
});

test("/best-mix rounds down", async () => {
  assert.equal((await result("/api/v1/best-mix?depth=33&maxPO2=1.4", bestMixEndpoint)).bestMix, 32);
  assert.equal((await result("/api/v1/best-mix?depth=25&maxPO2=1.4", bestMixEndpoint)).bestMix, 40);
});

test("/ead returns unrounded and rounded-up EAD", async () => {
  const r = await result("/api/v1/ead?depth=30&o2=32", eadEndpoint);
  assert.ok(Math.abs(r.ead - 24.430379746835442) < 1e-9);
  assert.equal(r.eadRoundedUp, 25);
});

test("/dive-plan returns the full plan with NDL source", async () => {
  const r = await result("/api/v1/dive-plan?depth=30&o2=32&maxPO2=1.4", divePlanEndpoint);
  assert.equal(r.mod, 33);
  assert.equal(r.bestMix, 35);
  assert.equal(r.ndl, 29);
  assert.equal(r.oxygenToxicity.level, "safe");
  assert.equal(r.ndlSource, "PADI Recreational Dive Planner (air)");
});

test("validation messages name the field and the problem", async () => {
  const found = await issues("/api/v1/ead?depth=99", eadEndpoint);
  assert.deepEqual(found, [
    { field: "depth", message: "depth must be at most 60" },
    { field: "o2", message: "o2 is required" },
  ]);
});
