"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormulaNote, ResultHero } from "@/components/result-hero";
import { Calculator } from "lucide-react";
import { calculateMODMetres, floorSafe, metersToFeet } from "@/lib/ean-calculations";

export function MODCalculator() {
  const [oxygenPercentage, setOxygenPercentage] = useState("32");
  const [maxPO2, setMaxPO2] = useState("1.4");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const o2 = parseFloat(oxygenPercentage);
    const po2 = parseFloat(maxPO2);
    if (isNaN(o2) || isNaN(po2) || oxygenPercentage.replace(".", "").length < 2 || o2 < 21) {
      setResult(null);
      return;
    }
    setResult(calculateMODMetres(o2, po2));
  };

  useEffect(() => {
    calculate();
  }, [oxygenPercentage, maxPO2]);

  const reset = () => {
    setOxygenPercentage("32");
    setMaxPO2("1.4");
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5">
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
              Calculate MOD
            </Button>
            <Button variant="outline" onClick={reset}>
              Reset
            </Button>
          </div>
        </div>

        {result !== null && (
          <ResultHero
            label="Maximum Operating Depth"
            value={result}
            unit="m"
            detail={`${floorSafe(metersToFeet(result))} ft`}
          />
        )}
      </div>

      <FormulaNote formula="MOD = ((Max PO₂ ÷ (O₂% ÷ 100)) - 1) × 10">
        <p>
          The result is rounded <strong className="text-foreground">down</strong> to the whole metre, so
          it never takes you past the PO₂ limit.
        </p>
        <p>
          <strong className="text-foreground">Note:</strong> 1.4 bar PO₂ is the working limit for the
          whole dive. 1.6 bar is a contingency limit only (and used for
          decompression in technical diving), never a depth to plan for.
        </p>
      </FormulaNote>
    </div>
  );
}
