"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator } from "lucide-react";

interface MODResult {
  mod: number;
  ead: number;
  ndl: number | null;
}

export function MODCalculator() {
  const [oxygenPercentage, setOxygenPercentage] = useState<number>(32);
  const [maxPO2, setMaxPO2] = useState<number>(1.4);
  const [result, setResult] = useState<MODResult | null>(null);

  const calculateNDL = (ead: number): number | null => {
    const eadRounded = Math.ceil(ead);
    if (eadRounded <= 10) return 219;
    if (eadRounded <= 12) return 147;
    if (eadRounded <= 14) return 98;
    if (eadRounded <= 16) return 72;
    if (eadRounded <= 18) return 56;
    if (eadRounded <= 20) return 45;
    if (eadRounded <= 22) return 37;
    if (eadRounded <= 25) return 29;
    if (eadRounded <= 30) return 20;
    if (eadRounded <= 35) return 14;
    if (eadRounded <= 40) return 9;
    if (eadRounded <= 42) return 8;
    return null;
  };

  const calculateMOD = () => {
    // MOD = ((Max PO2 / (O2% / 100)) - 1) * 10
    const mod = (maxPO2 / (oxygenPercentage / 100) - 1) * 10;
    const modCeil = Math.ceil(mod);
    
    // EAD calculation at MOD
    const ead = ((1 - oxygenPercentage / 100) / 0.79) * (modCeil + 10) - 10;
    const eadCeil = Math.ceil(ead);
    
    // NDL based on EAD at MOD
    const ndl = calculateNDL(eadCeil);
    
    setResult({ mod: modCeil, ead: eadCeil, ndl });
  };

  // Calculate automatically when inputs change
  useEffect(() => {
    calculateMOD();
  }, [oxygenPercentage, maxPO2]);

  const reset = () => {
    setOxygenPercentage(32);
    setMaxPO2(1.4);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
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
          <div>
            <Label htmlFor="po2" className="text-slate-700 dark:text-gray-200">
              Maximum PO₂ (bar)
            </Label>
            <Input
              id="po2"
              type="number"
              value={maxPO2}
              onChange={(e) => {
                const value = Number(e.target.value);
                setMaxPO2(Math.min(value, 1.8));
              }}
              min="0.1"
              max="1.8"
              step="0.1"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={calculateMOD} className="flex-1">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate MOD
            </Button>
            <Button variant="outline" onClick={reset}>
              Reset
            </Button>
          </div>
        </div>

        {result !== null && (
          <div className="flex flex-col gap-4">
            <Card className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-400/50 flex items-center justify-center flex-1">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 dark:text-blue-300 mb-2">
                    {result.mod} m
                  </div>
                  <div className="text-base text-blue-700 dark:text-blue-200">
                    Maximum Operating Depth
                  </div>
                  <div className="text-sm text-blue-500 dark:text-blue-400 mt-2">
                    ({Math.round(result.mod * 3.28)} ft)
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-400/50">
              <CardContent className="py-3">
                <div className="text-center">
                  {result.ndl ? (
                    <>
                      <div className="text-2xl font-bold text-amber-600 dark:text-amber-300">
                        {result.ndl} min
                      </div>
                      <div className="text-xs text-amber-700 dark:text-amber-200">
                        No Decompression Limit at MOD
                      </div>
                      <div className="text-xs text-amber-500 dark:text-amber-400 mt-1">
                        (EAD: {result.ead}m)
                      </div>
                    </>
                  ) : (
                    <div className="text-sm font-semibold text-red-600 dark:text-red-400">
                      Beyond recreational limits
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <div className="text-sm text-slate-600 dark:text-gray-300 bg-slate-100 dark:bg-white/5 p-4 rounded-lg">
        <h4 className="font-semibold mb-2 text-slate-800 dark:text-white">Formula:</h4>
        <p>MOD = ((Max PO₂ ÷ (O₂% ÷ 100)) - 1) × 10</p>
        <p className="mt-2">
          <strong>Note:</strong> Standard recreational limit is 1.4 bar PO₂.
          Technical diving may use 1.6 bar for working portions of the dive.
        </p>
      </div>
    </div>
  );
}
