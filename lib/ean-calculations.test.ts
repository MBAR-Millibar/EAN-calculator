import { test } from "node:test";
import assert from "node:assert/strict";
import {
  calculateBestMixPercent,
  calculateCNS,
  calculateDivePlan,
  calculateMODMetres,
} from "./ean-calculations.ts";

// Reference table from WEB-3. MOD is floored to the whole metre.
const MOD_CASES: Array<[number, number, number]> = [
  [32, 1.4, 33],
  [32, 1.6, 40],
  [36, 1.4, 28],
  [36, 1.6, 34],
  [40, 1.4, 25], // float trap: naive floor gives 24
  [40, 1.6, 30],
  [34, 1.4, 31],
  [28, 1.4, 40], // float trap: naive floor gives 39
  [21, 1.4, 56],
  [21, 1.6, 66],
];

for (const [o2, po2, expected] of MOD_CASES) {
  test(`MOD EAN${o2} @ ${po2} bar = ${expected} m`, () => {
    assert.equal(calculateMODMetres(o2, po2), expected);
  });
}

test("Planner MOD uses the same rounded-down figure", () => {
  for (const [o2, po2, expected] of MOD_CASES) {
    assert.equal(calculateDivePlan(20, o2, po2).mod, expected);
  }
});

test("Best mix rounds down so PO₂ never exceeds the limit", () => {
  assert.equal(calculateBestMixPercent(30, 1.4), 35);
  assert.equal(calculateBestMixPercent(33, 1.4), 32); // exact 32.56
  assert.equal(calculateBestMixPercent(25, 1.4), 40); // exact 40.00
});

test("CNS uses NOAA limits, rounding PO₂ up to the next row", () => {
  assert.equal(calculateCNS(1.4, 150), 100);
  assert.equal(calculateCNS(1.28, 18), 10); // 1.3 row: 180 min
  assert.equal(calculateCNS(0.5, 60), 0);
  assert.equal(calculateCNS(1.7, 10), null);
});
