"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, AlertTriangle, Share2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { hapticTap } from "@/lib/platform";
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

const PALETTE = {
  blue: {
    card: "border-blue-200 bg-blue-50 dark:border-blue-400/40 dark:bg-blue-900/30",
    title: "text-blue-800 dark:text-blue-300",
    value: "text-blue-600 dark:text-blue-300",
  },
  purple: {
    card: "border-purple-200 bg-purple-50 dark:border-purple-400/40 dark:bg-purple-900/30",
    title: "text-purple-800 dark:text-purple-300",
    value: "text-purple-600 dark:text-purple-300",
  },
  amber: {
    card: "border-amber-200 bg-amber-50 dark:border-amber-400/40 dark:bg-amber-900/30",
    title: "text-amber-800 dark:text-amber-300",
    value: "text-amber-600 dark:text-amber-300",
  },
  green: {
    card: "border-green-200 bg-green-50 dark:border-green-400/40 dark:bg-green-900/30",
    title: "text-green-800 dark:text-green-300",
    value: "text-green-600 dark:text-green-300",
  },
  slate: {
    card: "border-slate-200 bg-slate-50 dark:border-slate-400/40 dark:bg-slate-900/30",
    title: "text-slate-800 dark:text-slate-300",
    value: "text-slate-700 dark:text-slate-200",
  },
};

type Palette = (typeof PALETTE)[keyof typeof PALETTE];

function MetricCard({
  palette,
  title,
  value,
  detail,
  source,
  valueClassName,
}: {
  palette: Palette;
  title: string;
  value: string;
  detail: string;
  source?: string;
  valueClassName?: string;
}) {
  return (
    <div className={`flex flex-col rounded-[1.25rem] border p-6 ${palette.card}`}>
      <p className={`eyebrow text-[11px] tracking-[0.16em] ${palette.title}`}>{title}</p>
      <p className={`mt-4 text-4xl font-semibold tracking-[-0.05em] ${valueClassName ?? palette.value}`}>
        {value}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
      {source && <p className="mt-auto pt-4 text-xs text-muted-foreground">{source}</p>}
    </div>
  );
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
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
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
        <Button
          onClick={() => {
            calculate();
            hapticTap();
          }}
          className="flex-1"
        >
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
        <div role="status" aria-live="polite" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              palette={PALETTE.blue}
              title="Maximum Operating Depth"
              value={`${result.mod} m`}
              detail={`${floorSafe(metersToFeet(result.mod))} ft`}
            />
            <MetricCard
              palette={PALETTE.purple}
              title="Equivalent Air Depth"
              value={`${result.ead} m`}
              detail={`${Math.round(result.ead * 3.28)} ft`}
            />
            {result.ndl ? (
              <MetricCard
                palette={PALETTE.amber}
                title="No Decompression Limit"
                value={`${result.ndl} min`}
                detail={`at EAD ${result.ead} m`}
                source={NDL_TABLE_SOURCE}
              />
            ) : (
              <MetricCard
                palette={PALETTE.amber}
                title="No Decompression Limit"
                value="Deco"
                detail="This dive would require decompression"
                valueClassName="text-destructive"
              />
            )}
            <MetricCard
              palette={PALETTE.green}
              title="Optimal Mix for Depth"
              value={`${result.bestMix}%`}
              detail={`EAN${Math.round(result.bestMix)}`}
            />
          </div>

          <div className={`grid gap-6 rounded-[1.25rem] border p-6 sm:grid-cols-3 sm:items-end ${PALETTE.slate.card}`}>
            <div>
              <p className={`eyebrow text-[11px] tracking-[0.16em] ${PALETTE.slate.title}`}>
                Oxygen Exposure
              </p>
              <p
                className={`mt-3 text-4xl font-semibold tracking-[-0.05em] ${
                  result.oxygenToxicity.level === "safe"
                    ? PALETTE.slate.value
                    : result.oxygenToxicity.level === "caution"
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-destructive"
                }`}
              >
                {result.po2.toFixed(2)} bar
              </p>
              <p className="mt-1 text-sm text-muted-foreground">PO₂ at planned depth</p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Limit
              </p>
              <p className="mt-2 text-base font-medium">{po2Status(result)}</p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                CNS clock
              </p>
              <p className="mt-2 text-base font-medium">{cnsLabel(result)}</p>
              <p className="mt-1 text-xs text-muted-foreground">NOAA single-exposure limits</p>
            </div>
          </div>
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
