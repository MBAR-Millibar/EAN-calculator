"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator } from "lucide-react";

export function BestMixCalculator() {
  const [maxDepth, setMaxDepth] = useState<number>(30);
  const [maxPO2, setMaxPO2] = useState<number>(1.4);
  const [result, setResult] = useState<number | null>(null);

  const calculateBestMix = () => {
    // Best Mix = (Max PO2 / (Max Depth/10 + 1)) * 100
    const bestMix = (maxPO2 / (maxDepth / 10 + 1)) * 100;
    setResult(Math.ceil(bestMix));
  };

  // Calculate automatically when inputs change
  useEffect(() => {
    calculateBestMix();
  }, [maxDepth, maxPO2]);

  const reset = () => {
    setMaxDepth(30);
    setMaxPO2(1.4);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="depth" className="text-slate-700 dark:text-gray-200">
              Maximum Depth (m)
            </Label>
            <Input
              id="depth"
              type="number"
              value={maxDepth}
              onChange={(e) => setMaxDepth(Number(e.target.value))}
              min="0"
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
            <Button onClick={calculateBestMix} className="flex-1">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Best Mix
            </Button>
            <Button variant="outline" onClick={reset}>
              Reset
            </Button>
          </div>
        </div>

        {result !== null && (
          <Card className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-400/50 flex items-center justify-center">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 dark:text-green-300 mb-2">
                  {result}%
                </div>
                <div className="text-base text-green-700 dark:text-green-200">
                  Optimal Oxygen Percentage
                </div>
                <div className="text-sm text-green-500 dark:text-green-400 mt-2">
                  EAN{Math.round(result)}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="text-sm text-slate-600 dark:text-gray-300 bg-slate-100 dark:bg-white/5 p-4 rounded-lg">
        <h4 className="font-semibold mb-2 text-slate-800 dark:text-white">Formula:</h4>
        <p>Best Mix = (Max PO₂ ÷ (Max Depth ÷ 10 + 1)) × 100</p>
        <p className="mt-2">
          <strong>Note:</strong> This calculates the richest Nitrox mix that can
          be safely used at your planned maximum depth.
        </p>
      </div>
    </div>
  );
}
