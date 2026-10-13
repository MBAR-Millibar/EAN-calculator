"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormulaNote, ResultHero } from "@/components/result-hero";
import { Calculator } from "lucide-react";
import { calculateEAD } from "@/lib/ean-calculations";
import { hapticTap } from "@/lib/platform";

export function EADCalculator() {
  const [actualDepth, setActualDepth] = useState("30");
  const [oxygenPercentage, setOxygenPercentage] = useState("32");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const depth = parseFloat(actualDepth);
    const o2 = parseFloat(oxygenPercentage);
    if (isNaN(depth) || isNaN(o2)) return;
    setResult(Math.ceil(calculateEAD(depth, o2)));
  };

  useEffect(() => {
    calculate();
  }, [actualDepth, oxygenPercentage]);

  const reset = () => {
    setActualDepth("30");
    setOxygenPercentage("32");
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div>
            <Label htmlFor="depth">
              Actual Depth (m)
            </Label>
            <Input
              id="depth"
              type="number"
              value={actualDepth}
              onChange={(e) => setActualDepth(e.target.value)}
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div>
            <Label htmlFor="oxygen">
              Oxygen Percentage (%)
            </Label>
            <Input
              id="oxygen"
              type="number"
              value={oxygenPercentage}
              onChange={(e) => setOxygenPercentage(e.target.value)}
              min="21"
              max="100"
              step="0.1"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => {
                calculate();
                hapticTap();
              }}
              className="flex-1"
            >
              <Calculator aria-hidden="true" />
              Calculate EAD
            </Button>
            <Button variant="outline" onClick={reset}>
              Reset
            </Button>
          </div>
        </div>

        {result !== null && (
          <ResultHero
            label="Equivalent Air Depth"
            value={result}
            unit="m"
            detail={`${Math.round(result * 3.28)} ft`}
          />
        )}
      </div>

      <FormulaNote formula="EAD = ((1 - (O₂% ÷ 100)) ÷ 0.79) × (Actual Depth + 10) - 10">
        <p>
          <strong className="text-foreground">Note:</strong> EAD is used for decompression calculations when
          diving with Nitrox. Use air tables with the EAD value.
        </p>
      </FormulaNote>
    </div>
  );
}
