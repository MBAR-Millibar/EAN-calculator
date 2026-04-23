"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator } from "lucide-react";

export function EADCalculator() {
  const [actualDepth, setActualDepth] = useState<number>(30);
  const [oxygenPercentage, setOxygenPercentage] = useState<number>(32);
  const [result, setResult] = useState<number | null>(null);

  const calculateEAD = () => {
    // EAD = ((1 - (O2% / 100)) / 0.79) * (Actual Depth + 10) - 10
    const ead = ((1 - oxygenPercentage / 100) / 0.79) * (actualDepth + 10) - 10;
    setResult(Math.ceil(ead));
  };

  // Calculate automatically when inputs change
  useEffect(() => {
    calculateEAD();
  }, [actualDepth, oxygenPercentage]);

  const reset = () => {
    setActualDepth(30);
    setOxygenPercentage(32);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="depth" className="text-slate-700 dark:text-gray-200">
              Actual Depth (m)
            </Label>
            <Input
              id="depth"
              type="number"
              value={actualDepth}
              onChange={(e) => setActualDepth(Number(e.target.value))}
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div>
            <Label htmlFor="oxygen" className="text-slate-700 dark:text-gray-200">
              Oxygen Percentage (%)
            </Label>
            <Input
              id="oxygen"
              type="number"
              value={oxygenPercentage}
              onChange={(e) => setOxygenPercentage(Number(e.target.value))}
              min="21"
              max="100"
              step="0.1"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={calculateEAD} className="flex-1">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate EAD
            </Button>
            <Button variant="outline" onClick={reset}>
              Reset
            </Button>
          </div>
        </div>

        {result !== null && (
          <Card className="bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-400/50 flex items-center justify-center">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-purple-600 dark:text-purple-300 mb-2">
                  {result} m
                </div>
                <div className="text-base text-purple-700 dark:text-purple-200">
                  Equivalent Air Depth
                </div>
                <div className="text-sm text-purple-500 dark:text-purple-400 mt-2">
                  ({Math.round(result * 3.28)} ft)
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="text-sm text-slate-600 dark:text-gray-300 bg-slate-100 dark:bg-white/5 p-4 rounded-lg">
        <h4 className="font-semibold mb-2 text-slate-800 dark:text-white">Formula:</h4>
        <p>EAD = ((1 - (O₂% ÷ 100)) ÷ 0.79) × (Actual Depth + 10) - 10</p>
        <p className="mt-2">
          <strong>Note:</strong> EAD is used for decompression calculations when
          diving with Nitrox. Use air tables with the EAD value.
        </p>
      </div>
    </div>
  );
}
