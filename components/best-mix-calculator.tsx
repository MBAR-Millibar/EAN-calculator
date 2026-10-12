"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormulaNote, ResultHero } from "@/components/result-hero";
import { Calculator } from "lucide-react";
import { calculateBestMixPercent } from "@/lib/ean-calculations";

export function BestMixCalculator() {
  const [maxDepth, setMaxDepth] = useState("30");
  const [maxPO2, setMaxPO2] = useState("1.4");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const depth = parseFloat(maxDepth);
    const po2 = parseFloat(maxPO2);
    if (isNaN(depth) || isNaN(po2)) return;
    setResult(calculateBestMixPercent(depth, po2));
  };

  useEffect(() => {
    calculate();
  }, [maxDepth, maxPO2]);

  const reset = () => {
    setMaxDepth("30");
    setMaxPO2("1.4");
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div>
            <Label htmlFor="depth">
              Maximum Depth (m)
            </Label>
            <Input
              id="depth"
              type="number"
              value={maxDepth}
              onChange={(e) => setMaxDepth(e.target.value)}
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div>
            <Label htmlFor="po2">
              Maximum PO₂ (bar)
            </Label>
            <Input
              id="po2"
              type="number"
              value={maxPO2}
              onChange={(e) => setMaxPO2(e.target.value)}
              min="0.1"
              max="1.8"
              step="0.1"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={calculate} className="flex-1">
              <Calculator aria-hidden="true" />
              Calculate Best Mix
            </Button>
            <Button variant="outline" onClick={reset}>
              Reset
            </Button>
          </div>
        </div>

        {result !== null && (
          <ResultHero
            label="Optimal Oxygen Percentage"
            value={result}
            unit="%"
            detail={`EAN${Math.round(result)}`}
          />
        )}
      </div>

      <FormulaNote formula="Best Mix = (Max PO₂ ÷ (Max Depth ÷ 10 + 1)) × 100">
        <p>
          <strong className="text-foreground">Note:</strong> This calculates the richest Nitrox mix that can
          be safely used at your planned maximum depth.
        </p>
      </FormulaNote>
    </div>
  );
}
