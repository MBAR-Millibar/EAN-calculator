"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator } from "lucide-react";

export function MODCalculator() {
  const [oxygenPercentage, setOxygenPercentage] = useState<number>(32);
  const [maxPO2, setMaxPO2] = useState<number>(1.4);
  const [result, setResult] = useState<number | null>(null);

  const calculateMOD = () => {
    // MOD = ((Max PO2 / (O2% / 100)) - 1) * 10
    const mod = (maxPO2 / (oxygenPercentage / 100) - 1) * 10;
    setResult(Math.round(mod * 10) / 10);
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
            <Label htmlFor="oxygen" className="text-gray-200">
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
            <Label htmlFor="po2" className="text-gray-200">
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
          <Card className="bg-blue-900/30 border-blue-400/50 flex items-center justify-center">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-300 mb-2">
                  {result} m
                </div>
                <div className="text-base text-blue-200">
                  Maximum Operating Depth
                </div>
                <div className="text-sm text-blue-600 mt-2">
                  ({Math.round(result * 3.28)} ft)
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="text-sm text-gray-300 bg-white/5 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Formula:</h4>
        <p>MOD = ((Max PO₂ ÷ (O₂% ÷ 100)) - 1) × 10</p>
        <p className="mt-2">
          <strong>Note:</strong> Standard recreational limit is 1.4 bar PO₂.
          Technical diving may use 1.6 bar for working portions of the dive.
        </p>
      </div>
    </div>
  );
}
