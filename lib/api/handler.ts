/**
 * Shared GET handler for the calculation API: authenticate, validate, compute.
 */
import type { z } from "zod";
import { requireMillibarUser, type AuthDeps } from "./auth.ts";
import { DISCLAIMER, readParams, type Endpoint } from "./endpoints.ts";
import { json } from "./json.ts";

const NO_STORE = { "Cache-Control": "private, no-store" };

export async function handleCalculation<S extends z.ZodTypeAny>(
  request: Request,
  endpoint: Endpoint<S>,
  authDeps?: AuthDeps
): Promise<Response> {
  const auth = await requireMillibarUser(request, authDeps);
  if (!auth.ok) return auth.response;

  const parsed = endpoint.schema.safeParse(readParams(new URL(request.url)));
  if (!parsed.success) {
    return json(
      {
        error: "validation_failed",
        issues: parsed.error.issues.map((i) => ({ field: i.path.join("."), message: i.message })),
      },
      { status: 400, headers: NO_STORE }
    );
  }

  return json(
    { input: parsed.data, result: endpoint.compute(parsed.data), disclaimer: DISCLAIMER },
    { headers: NO_STORE }
  );
}

/** Build a Next.js route `GET` export for an endpoint. */
export function calculationRoute<S extends z.ZodTypeAny>(endpoint: Endpoint<S>) {
  return (request: Request) => handleCalculation(request, endpoint);
}
