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
 * Maximum Operating Depth (MOD) in metres.
 * MOD = (maxPO2 / (o2% / 100) - 1) × 10
 */
export function calculateMOD(oxygenPercentage: number, maxPO2: number): number {
  return (maxPO2 / (oxygenPercentage / 100) - 1) * 10;
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
 * Assess oxygen toxicity for a given PO₂ value.
 * - safe:      PO₂ ≤ 1.4 bar
 * - caution:   1.4 < PO₂ ≤ 1.6 bar (exceeds recreational limit)
 * - dangerous: PO₂ > 1.6 bar
 */
export function assessOxygenToxicity(po2: number): OxygenToxicityResult {
  if (po2 > 1.6) return { level: "dangerous", po2 };
  if (po2 > 1.4) return { level: "caution", po2 };
  return { level: "safe", po2 };
}

// ---------------------------------------------------------------------------
// NDL lookup (PADI RDP approximation)
// ---------------------------------------------------------------------------

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
  /** Maximum Operating Depth in metres (unrounded) */
  mod: number;
  /** Equivalent Air Depth in metres (unrounded) */
  ead: number;
  /** Best nitrox mix as a percentage (unrounded) */
  bestMix: number;
  /** Partial pressure of oxygen at planned depth, in bar */
  po2: number;
  /** Oxygen toxicity assessment */
  oxygenToxicity: OxygenToxicityResult;
  /** No Decompression Limit in minutes, or null if beyond recreational limits */
  ndl: number | null;
}

/**
 * Calculate a complete nitrox dive plan from depth, gas mix and max PO₂.
 * Returns unrounded values; apply Math.ceil / toFixed in the presentation layer.
 */
export function calculateDivePlan(
  plannedDepth: number,
  oxygenPercentage: number,
  maxPO2: number
): DivePlanResult {
  const mod = calculateMOD(oxygenPercentage, maxPO2);
  const ead = calculateEAD(plannedDepth, oxygenPercentage);
  const bestMix = calculateBestMix(plannedDepth, maxPO2);
  const po2 = calculatePO2(oxygenPercentage, plannedDepth);

  return {
    mod,
    ead,
    bestMix,
    po2,
    oxygenToxicity: assessOxygenToxicity(po2),
    ndl: lookupNDL(ead),
  };
}

// ---------------------------------------------------------------------------
// Unit conversion
// ---------------------------------------------------------------------------

/** Convert metres to feet */
export function metersToFeet(meters: number): number {
  return meters * 3.28084;
}
