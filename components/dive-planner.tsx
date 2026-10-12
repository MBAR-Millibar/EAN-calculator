"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, AlertTriangle, Share2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  calculateDivePlan,
  DivePlanResult,
  floorSafe,
  metersToFeet,
  NDL_TABLE_SOURCE,
} from "@/lib/ean-calculations";

function po2Status(result: DivePlanResult): string {
  const { level } = result.oxygenToxicity;
  if (level === "dangerous") return "Above 1.6 bar - do not dive";
  if (level === "caution") return "Above 1.4 bar working limit";
  return "Within 1.4 bar working limit";
}

function cnsLabel(result: DivePlanResult): string {
  if (result.cnsAtNDL === null) return "CNS: n/a";
  return `CNS ${Math.ceil(result.cnsAtNDL)}% at ${result.ndl} min`;
}

export function DivePlanner() {
  const [plannedDepth, setPlannedDepth] = useState("30");
  const [oxygenPercentage, setOxygenPercentage] = useState("32");
  const [maxPO2, setMaxPO2] = useState("1.4");
  const [result, setResult] = useState<DivePlanResult | null>(null);

  const calculate = () => {
    const depth = parseFloat(plannedDepth);
    const o2 = parseFloat(oxygenPercentage);
    const po2 = parseFloat(maxPO2);
    if (isNaN(depth) || isNaN(o2) || isNaN(po2) || oxygenPercentage.replace(".", "").length < 2 || o2 < 21) {
      setResult(null);
      return;
    }
    const plan = calculateDivePlan(depth, o2, po2);
    setResult({ ...plan, ead: Math.ceil(plan.ead) });
  };

  useEffect(() => {
    calculate();
  }, [plannedDepth, oxygenPercentage, maxPO2]);

  const reset = () => {
    setPlannedDepth("25");
    setOxygenPercentage("32");
    setMaxPO2("1.4");
    setResult(null);
  };

  const shareDivePlan = async () => {
    if (!result) return;

    const shareText = `Dive Plan (EAN${oxygenPercentage})
Depth: ${plannedDepth}m (${Math.round(parseFloat(plannedDepth) * 3.28)}ft)
Max PO2: ${maxPO2} bar

Results:
MOD: ${result.mod}m (${floorSafe(metersToFeet(result.mod))}ft)
EAD: ${result.ead}m (${Math.round(result.ead * 3.28)}ft)
NDL: ${result.ndl ? `${result.ndl} min (${NDL_TABLE_SOURCE})` : "It will require DECO"}
Best Mix: ${result.bestMix}% (EAN${result.bestMix})
PO2 at depth: ${result.po2.toFixed(2)} bar (${po2Status(result)})
${cnsLabel(result)}

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
          <Label htmlFor="planned-depth">
            Planned Depth (m)
          </Label>
          <Input
            id="planned-depth"
            type="number"
            value={plannedDepth}
            onChange={(e) => setPlannedDepth(e.target.value)}
            min="0"
            max="100"
            step="0.1"
          />
        </div>
        <div>
          <Label htmlFor="oxygen-mix">
            Oxygen Percentage (%)
          </Label>
          <Input
            id="oxygen-mix"
            type="number"
            value={oxygenPercentage}
            onChange={(e) => setOxygenPercentage(e.target.value)}
            min="21"
            max="100"
            step="0.1"
          />
        </div>
        <div>
          <Label htmlFor="max-po2">
            Maximum PO₂ (bar)
          </Label>
          <Input
            id="max-po2"
            type="number"
            value={maxPO2}
            onChange={(e) => setMaxPO2(e.target.value)}
            min="0.1"
            max="1.8"
            step="0.1"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={calculate} className="flex-1">
          <Calculator aria-hidden="true" />
          Plan Dive
        </Button>
        <Button variant="outline" onClick={reset}>
          Reset
        </Button>
        {result && (
          <Button variant="outline" onClick={shareDivePlan}>
            <Share2 aria-hidden="true" />
            Share
          </Button>
        )}
      </div>

      {result && (
        <div
          role="status"
          aria-live="polite"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          <Card className="flex flex-col border-transparent bg-secondary">
            <CardHeader className="pb-2">
              <CardTitle className="eyebrow text-[11px] leading-snug tracking-[0.16em]">
                Maximum Operating Depth
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-semibold tracking-[-0.05em] text-primary">
                  {result.mod} m
                </div>
                <div className="text-sm text-muted-foreground">
                  ({floorSafe(metersToFeet(result.mod))} ft)
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col border-transparent bg-secondary">
            <CardHeader className="pb-2">
              <CardTitle className="eyebrow text-[11px] leading-snug tracking-[0.16em]">
                Equivalent Air Depth
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-semibold tracking-[-0.05em] text-primary">
                  {result.ead} m
                </div>
                <div className="text-sm text-muted-foreground">
                  ({Math.round(result.ead * 3.28)} ft)
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col border-transparent bg-secondary">
            <CardHeader className="pb-2">
              <CardTitle className="eyebrow text-[11px] leading-snug tracking-[0.16em]">
                No Decompression Limit
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                {result.ndl ? (
                  <>
                    <div className="text-4xl font-semibold tracking-[-0.05em] text-primary">
                      {result.ndl} min
                    </div>
                    <div className="text-sm text-muted-foreground">
                      at EAD {result.ead}m
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {NDL_TABLE_SOURCE}
                    </div>
                  </>
                ) : (
                  <div className="text-xl font-semibold text-destructive">
                    It will require DECO
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col border-transparent bg-secondary">
            <CardHeader className="pb-2">
              <CardTitle className="eyebrow text-[11px] leading-snug tracking-[0.16em]">
                Optimal Mix for Depth
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-semibold tracking-[-0.05em] text-primary">
                  {result.bestMix}%
                </div>
                <div className="text-sm text-muted-foreground">
                  EAN{Math.round(result.bestMix)}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col border-transparent bg-secondary">
            <CardHeader className="pb-2">
              <CardTitle className="eyebrow text-[11px] leading-snug tracking-[0.16em]">
                Oxygen Exposure
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div
                  className={`text-4xl font-semibold tracking-[-0.05em] ${
                    result.oxygenToxicity.level === "safe"
                      ? "text-primary"
                      : result.oxygenToxicity.level === "caution"
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-destructive"
                  }`}
                >
                  {result.po2.toFixed(2)} bar
                </div>
                <div className="text-sm text-muted-foreground">
                  PO₂ at depth · {po2Status(result)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {cnsLabel(result)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {result && result.oxygenToxicity.level !== "safe" && (
        <Alert className="rounded-[1.25rem] border-destructive/50 bg-destructive/10">
          <AlertTriangle className="h-4 w-4 text-destructive" aria-hidden="true" />
          <AlertDescription className="text-foreground">
            <strong>Warning:</strong> Current gas mix and depth combination may
            pose oxygen toxicity risks. Review your dive plan and consider using
            a different mix or reducing maximum depth.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
