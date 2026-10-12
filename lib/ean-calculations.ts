/**
 * EAN (Enriched Air Nitrox) diving calculations.
 *
 * Pure TypeScript — no framework dependencies. Suitable for use in web apps,
 * native mobile apps, or as a standalone NPM package.
 *
 * All depth values are in metres. Oxygen values are percentages (e.g. 32 for EAN32).
 * PO₂ values are in bar.
 */

// ---------------------------------------------------------------------------
// Core calculations
// ---------------------------------------------------------------------------

/**
 * Maximum Operating Depth (MOD) in metres (unrounded).
 * MOD = (maxPO2 / (o2% / 100) - 1) × 10
 * Source: NOAA Diving Manual, enriched air nitrox chapter.
 */
export function calculateMOD(oxygenPercentage: number, maxPO2: number): number {
  return (maxPO2 / (oxygenPercentage / 100) - 1) * 10;
}

/**
 * Floor a value to a whole number, tolerating binary floating-point error.
 * A naive Math.floor turns 24.999999999999996 (EAN40 at 1.4 bar) into 24;
 * rounding to 6 decimal places first keeps exact whole numbers whole.
 */
export function floorSafe(value: number): number {
  return Math.floor(Number(value.toFixed(6)));
}

/**
 * MOD in whole metres, rounded DOWN. This is the figure to display anywhere:
 * rounding up would place the diver beyond the PO₂ limit the MOD protects.
 */
export function calculateMODMetres(oxygenPercentage: number, maxPO2: number): number {
  return floorSafe(calculateMOD(oxygenPercentage, maxPO2));
}

/**
 * Equivalent Air Depth (EAD) in metres.
 * EAD = ((1 - o2% / 100) / 0.79) × (depth + 10) - 10
 */
export function calculateEAD(depth: number, oxygenPercentage: number): number {
  return ((1 - oxygenPercentage / 100) / 0.79) * (depth + 10) - 10;
}

/**
 * Best (richest safe) nitrox mix for a given depth and max PO₂, as a percentage.
 * BestMix = (maxPO2 / (depth / 10 + 1)) × 100
 */
export function calculateBestMix(depth: number, maxPO2: number): number {
  return (maxPO2 / (depth / 10 + 1)) * 100;
}

/**
 * Best mix as a whole percentage, rounded DOWN. Rounding up would give a mix
 * whose PO₂ exceeds maxPO2 at the planned depth.
 */
export function calculateBestMixPercent(depth: number, maxPO2: number): number {
  return floorSafe(calculateBestMix(depth, maxPO2));
}

/**
 * Partial pressure of oxygen (PO₂) at depth, in bar.
 * PO₂ = (o2% / 100) × (depth / 10 + 1)
 */
export function calculatePO2(oxygenPercentage: number, depth: number): number {
  return (oxygenPercentage / 100) * (depth / 10 + 1);
}

// ---------------------------------------------------------------------------
// Oxygen toxicity
// ---------------------------------------------------------------------------

export type OxygenToxicityLevel = "safe" | "caution" | "dangerous";

export interface OxygenToxicityResult {
  level: OxygenToxicityLevel;
  /** The actual PO₂ value that was assessed, in bar */
  po2: number;
}

/**
 * Classify a PO₂ value against the standard limits.
 * - safe:      PO₂ ≤ 1.4 bar (within the working limit)
 * - caution:   1.4 < PO₂ ≤ 1.6 bar (contingency / decompression only)
 * - dangerous: PO₂ > 1.6 bar
 * This is a PO₂ check only; oxygen exposure also depends on time (see CNS).
 */
export function assessOxygenToxicity(po2: number): OxygenToxicityResult {
  if (po2 > 1.6) return { level: "dangerous", po2 };
  if (po2 > 1.4) return { level: "caution", po2 };
  return { level: "safe", po2 };
}

/**
 * NOAA single-exposure CNS oxygen limits: [PO₂ (bar), max minutes].
 * Source: NOAA Diving Manual, Oxygen Exposure Limits table.
 */
const NOAA_CNS_LIMITS: Array<[number, number]> = [
  [0.6, 720],
  [0.7, 570],
  [0.8, 450],
  [0.9, 360],
  [1.0, 300],
  [1.1, 240],
  [1.2, 210],
  [1.3, 180],
  [1.4, 150],
  [1.5, 120],
  [1.6, 45],
];

/**
 * CNS oxygen clock (%) for a single exposure of `minutes` at `po2`, using the
 * NOAA limits. PO₂ is rounded up to the next table row (conservative).
 * Returns 0 below 0.6 bar and null above 1.6 bar (no NOAA limit exists).
 */
export function calculateCNS(po2: number, minutes: number): number | null {
  const po2Rounded = Math.ceil(Number((po2 * 10).toFixed(6))) / 10;
  if (po2Rounded < 0.6) return 0;
  for (const [limitPO2, limitMinutes] of NOAA_CNS_LIMITS) {
    if (po2Rounded <= limitPO2) return (minutes / limitMinutes) * 100;
  }
  return null;
}

// ---------------------------------------------------------------------------
// NDL lookup (PADI RDP approximation)
// ---------------------------------------------------------------------------

/** Name of the air table behind lookupNDL, for display. */
export const NDL_TABLE_SOURCE = "PADI Recreational Dive Planner (air)";

/** [maxEAD (inclusive), ndlMinutes] */
const NDL_TABLE: Array<[number, number]> = [
  [10, 219],
  [12, 147],
  [14, 98],
  [16, 72],
  [18, 56],
  [20, 45],
  [22, 37],
  [25, 29],
  [30, 20],
  [35, 14],
  [40, 9],
  [42, 8],
];

/**
 * No Decompression Limit (NDL) in minutes for a given EAD, using a PADI RDP
 * approximation table. Returns null when beyond recreational limits (EAD > 42 m).
 */
export function lookupNDL(ead: number): number | null {
  const eadRounded = Math.ceil(ead);
  for (const [maxEAD, ndl] of NDL_TABLE) {
    if (eadRounded <= maxEAD) return ndl;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Combined dive plan
// ---------------------------------------------------------------------------

export interface DivePlanResult {
  /** Maximum Operating Depth in whole metres, rounded down */
  mod: number;
  /** Equivalent Air Depth in metres (unrounded) */
  ead: number;
  /** Best nitrox mix as a whole percentage, rounded down */
  bestMix: number;
  /** Partial pressure of oxygen at planned depth, in bar */
  po2: number;
  /** Oxygen toxicity assessment */
  oxygenToxicity: OxygenToxicityResult;
  /** No Decompression Limit in minutes, or null if beyond recreational limits */
  ndl: number | null;
  /** CNS % for a bottom time equal to the NDL, or null if no NDL / PO₂ > 1.6 */
  cnsAtNDL: number | null;
}

/**
 * Calculate a complete nitrox dive plan from depth, gas mix and max PO₂.
 * MOD and best mix are returned rounded down (their safe direction); EAD is
 * unrounded — round it up in the presentation layer.
 */
export function calculateDivePlan(
  plannedDepth: number,
  oxygenPercentage: number,
  maxPO2: number
): DivePlanResult {
  const mod = calculateMODMetres(oxygenPercentage, maxPO2);
  const ead = calculateEAD(plannedDepth, oxygenPercentage);
  const bestMix = calculateBestMixPercent(plannedDepth, maxPO2);
  const po2 = calculatePO2(oxygenPercentage, plannedDepth);
  const ndl = lookupNDL(ead);

  return {
    mod,
    ead,
    bestMix,
    po2,
    oxygenToxicity: assessOxygenToxicity(po2),
    ndl,
    cnsAtNDL: ndl === null ? null : calculateCNS(po2, ndl),
  };
}

// ---------------------------------------------------------------------------
// Unit conversion
// ---------------------------------------------------------------------------

/** Convert metres to feet */
export function metersToFeet(meters: number): number {
  return meters * 3.28084;
}
