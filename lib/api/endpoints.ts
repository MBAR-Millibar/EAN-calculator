/**
 * Calculation API endpoints (WEB-33): query-param schemas and result shapes.
 *
 * Every figure comes from lib/ean-calculations.ts and is rounded exactly as
 * the website rounds it, so the API and the UI can never disagree.
 */
import { z } from "zod";
import {
  NDL_TABLE_SOURCE,
  calculateBestMix,
  calculateBestMixPercent,
  calculateDivePlan,
  calculateEAD,
  calculateMOD,
  calculateMODMetres,
  floorSafe,
  metersToFeet,
} from "../ean-calculations.ts";

export const DISCLAIMER =
  "Provided for educational purposes, for divers learning nitrox and as a planning aid for certified nitrox divers. " +
  "Verify all calculations independently with certified dive tables or a dive computer, and dive within your certification limits.";

/** A numeric query param: required, finite, and within [min, max]. */
const num = (field: string, min: number, max: number) =>
  z
    .string({ required_error: `${field} is required` })
    .pipe(z.coerce.number().refine(Number.isFinite, `${field} must be a number`))
    .pipe(
      z
        .number()
        .min(min, `${field} must be at least ${min}`)
        .max(max, `${field} must be at most ${max}`)
    );

const o2 = num("o2", 21, 100);
const maxPO2 = num("maxPO2", 1.0, 1.6);
const depth = num("depth", 0, 60);

export interface Endpoint<S extends z.ZodTypeAny> {
  schema: S;
  compute(input: z.infer<S>): Record<string, unknown>;
}

function endpoint<S extends z.ZodTypeAny>(e: Endpoint<S>): Endpoint<S> {
  return e;
}

export const modEndpoint = endpoint({
  schema: z.object({ o2, maxPO2 }),
  compute: ({ o2, maxPO2 }) => {
    const mod = calculateMODMetres(o2, maxPO2);
    return { mod, modUnrounded: calculateMOD(o2, maxPO2), modFeet: floorSafe(metersToFeet(mod)) };
  },
});

export const bestMixEndpoint = endpoint({
  schema: z.object({ depth, maxPO2 }),
  compute: ({ depth, maxPO2 }) => ({
    bestMix: calculateBestMixPercent(depth, maxPO2),
    bestMixUnrounded: calculateBestMix(depth, maxPO2),
  }),
});

export const eadEndpoint = endpoint({
  schema: z.object({ depth, o2 }),
  compute: ({ depth, o2 }) => {
    const ead = calculateEAD(depth, o2);
    return { ead, eadRoundedUp: Math.ceil(ead) };
  },
});

export const divePlanEndpoint = endpoint({
  schema: z.object({ depth, o2, maxPO2 }),
  compute: ({ depth, o2, maxPO2 }) => ({
    ...calculateDivePlan(depth, o2, maxPO2),
    ndlSource: NDL_TABLE_SOURCE,
  }),
});

/**
 * Read query params into a plain object. Absent and empty params are left out,
 * so they fail as "required" instead of coercing to 0.
 */
export function readParams(url: URL): Record<string, string> {
  const params: Record<string, string> = {};
  for (const [key, value] of url.searchParams) {
    if (value.trim() !== "") params[key] = value.trim();
  }
  return params;
}
