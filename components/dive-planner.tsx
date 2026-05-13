"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, AlertTriangle, Share2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DivePlan {
  mod: number;
  ead: number;
  bestMix: number;
  oxygenToxicity: string;
  ndl: number | null;
}

export function DivePlanner() {
  const [plannedDepth, setPlannedDepth] = useState<number>(30);
  const [oxygenPercentage, setOxygenPercentage] = useState<number>(32);
  const [maxPO2, setMaxPO2] = useState<number>(1.4);
  const [result, setResult] = useState<DivePlan | null>(null);

  const calculateDivePlan = () => {
    // MOD calculation
    const mod = (maxPO2 / (oxygenPercentage / 100) - 1) * 10;

    // EAD calculation
    const ead =
      ((1 - oxygenPercentage / 100) / 0.79) * (plannedDepth + 10) - 10;

    // Best Mix calculation
    const bestMix = (maxPO2 / (plannedDepth / 10 + 1)) * 100;

    // Oxygen toxicity assessment
    let oxygenToxicity = "Safe";
    const currentPO2 = (oxygenPercentage / 100) * (plannedDepth / 10 + 1);

    if (currentPO2 > 1.6) {
      oxygenToxicity = `Dangerous - ${currentPO2.toFixed(2)} bar PO₂`;
    } else if (currentPO2 > 1.4) {
      oxygenToxicity = "Caution - Exceeds recreational limit";
    }

    // NDL calculation using PADI recreational dive planner approximation
    // Based on EAD for Nitrox, using simplified NDL table values
    const eadRounded = Math.ceil(ead);
    let ndl: number | null = null;
    
    // NDL values based on EAD (using PADI RDP approximation)
    if (eadRounded <= 10) ndl = 219;
    else if (eadRounded <= 12) ndl = 147;
    else if (eadRounded <= 14) ndl = 98;
    else if (eadRounded <= 16) ndl = 72;
    else if (eadRounded <= 18) ndl = 56;
    else if (eadRounded <= 20) ndl = 45;
    else if (eadRounded <= 22) ndl = 37;
    else if (eadRounded <= 25) ndl = 29;
    else if (eadRounded <= 30) ndl = 20;
    else if (eadRounded <= 35) ndl = 14;
    else if (eadRounded <= 40) ndl = 9;
    else if (eadRounded <= 42) ndl = 8;
    else ndl = null; // Beyond recreational limits

    setResult({
      mod: Math.ceil(mod),
      ead: Math.ceil(ead),
      bestMix: Math.ceil(bestMix),
      oxygenToxicity,
      ndl,
    });
  };

  // Calculate automatically when inputs change
  useEffect(() => {
    calculateDivePlan();
  }, [plannedDepth, oxygenPercentage, maxPO2]);

  const reset = () => {
    setPlannedDepth(25);
    setOxygenPercentage(32);
    setMaxPO2(1.4);
    setResult(null);
  };

  const shareDivePlan = async () => {
    if (!result) return;

    const shareText = `Dive Plan (EAN${oxygenPercentage})
Depth: ${plannedDepth}m (${Math.round(plannedDepth * 3.28)}ft)
Max PO2: ${maxPO2} bar

Results:
MOD: ${result.mod}m (${Math.round(result.mod * 3.28)}ft)
EAD: ${result.ead}m (${Math.round(result.ead * 3.28)}ft)
NDL: ${result.ndl ? `${result.ndl} min` : "Beyond recreational limits"}
Best Mix: ${result.bestMix}% (EAN${result.bestMix})
O2 Toxicity: ${result.oxygenToxicity}

Calculated with ean.millibar.io`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Nitrox Dive Plan",
          text: shareText,
          url: "https://ean.millibar.io",
        });
      } catch (err) {
        // User cancelled or share failed, fallback to clipboard
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Dive plan copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="planned-depth" className="text-slate-700 dark:text-gray-200">
            Planned Depth (m)
          </Label>
          <Input
            id="planned-depth"
            type="number"
            value={plannedDepth}
            onChange={(e) => setPlannedDepth(Number(e.target.value))}
            min="0"
            max="100"
            step="0.1"
          />
        </div>
        <div>
          <Label htmlFor="oxygen-mix" className="text-slate-700 dark:text-gray-200">
            Oxygen Percentage (%)
          </Label>
          <Input
            id="oxygen-mix"
            type="number"
            value={oxygenPercentage}
            onChange={(e) => setOxygenPercentage(Number(e.target.value))}
            min="21"
            max="100"
            step="0.1"
          />
        </div>
        <div>
          <Label htmlFor="max-po2" className="text-slate-700 dark:text-gray-200">
            Maximum PO₂ (bar)
          </Label>
          <Input
            id="max-po2"
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
      </div>

      <div className="flex gap-2">
        <Button onClick={calculateDivePlan} className="flex-1">
          <Calculator className="w-4 h-4 mr-2" />
          Plan Dive
        </Button>
        <Button variant="outline" onClick={reset}>
          Reset
        </Button>
        {result && (
          <Button variant="outline" onClick={shareDivePlan}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        )}
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-400/50 flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-blue-800 dark:text-gray-200">
                Maximum Operating Depth
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-300">
                  {result.mod} m
                </div>
                <div className="text-sm text-blue-500 dark:text-gray-400">
                  ({Math.round(result.mod * 3.28)} ft)
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-400/50 flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-purple-800 dark:text-gray-200">
                Equivalent Air Depth
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-300">
                  {result.ead} m
                </div>
                <div className="text-sm text-purple-500 dark:text-gray-400">
                  ({Math.round(result.ead * 3.28)} ft)
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-400/50 flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-amber-800 dark:text-gray-200">
                No Decompression Limit
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                {result.ndl ? (
                  <>
                    <div className="text-4xl font-bold text-amber-600 dark:text-amber-300">
                      {result.ndl} min
                    </div>
                    <div className="text-sm text-amber-500 dark:text-gray-400">
                      at EAD {result.ead}m
                    </div>
                  </>
                ) : (
                  <div className="text-xl font-semibold text-red-600 dark:text-red-400">
                    Beyond recreational limits
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-400/50 flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-800 dark:text-gray-200">
                Optimal Mix for Depth
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-300">
                  {result.bestMix}%
                </div>
                <div className="text-sm text-green-500 dark:text-gray-400">
                  EAN{Math.round(result.bestMix)}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-white/10 border-slate-200 dark:border-white/20 flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-700 dark:text-gray-200">
                Oxygen Toxicity
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <div
                className={`text-4xl font-semibold ${
                  result.oxygenToxicity === "Safe"
                    ? "text-green-600"
                    : result.oxygenToxicity.includes("Caution")
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {result.oxygenToxicity}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {result && result.oxygenToxicity !== "Safe" && (
        <Alert className="border-red-400 bg-red-50 dark:bg-red-900/20">
          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-700 dark:text-red-200">
            <strong>Warning:</strong> Current gas mix and depth combination may
            pose oxygen toxicity risks. Review your dive plan and consider using
            a different mix or reducing maximum depth.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
