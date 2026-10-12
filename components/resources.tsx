import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, AlertTriangle, Calculator, Waves } from "lucide-react";
import { calculateMODMetres } from "@/lib/ean-calculations";

/** Deepest depth covered by recreational nitrox training, in metres. */
const RECREATIONAL_DEPTH_LIMIT = 40;

export function Resources() {
  const terminology = [
    {
      term: "MOD",
      definition:
        "Maximum Operating Depth - The deepest depth at which a gas mix can be safely used",
    },
    {
      term: "EAD",
      definition:
        "Equivalent Air Depth - The depth of air that would have the same nitrogen partial pressure",
    },
    {
      term: "PO₂",
      definition:
        "Partial Pressure of Oxygen - The pressure exerted by oxygen in a gas mixture",
    },
    {
      term: "EAN",
      definition:
        "Enriched Air Nitrox - Air with higher oxygen content than normal air (21%)",
    },
    {
      term: "CNS",
      definition:
        "Central Nervous System oxygen toxicity - Risk from high oxygen partial pressures",
    },
    {
      term: "OTU",
      definition:
        "Oxygen Tolerance Unit - Measure of pulmonary oxygen toxicity exposure",
    },
  ];

  const safetyGuidelines = [
    "Always analyze your gas mix before diving",
    "Never exceed 1.4 bar PO₂ for the working part of any dive",
    "Treat 1.6 bar PO₂ as a contingency limit only, never a planning target",
    "Plan your maximum depth with a margin above the MOD",
    "Carry appropriate emergency procedures",
    "Maintain proper certification and training",
  ];

  const commonMixes = [
    { name: "EAN32", oxygen: 32 },
    { name: "EAN36", oxygen: 36 },
    { name: "EAN40", oxygen: 40 },
    { name: "Air", oxygen: 21 },
  ].map((mix) => ({
    ...mix,
    nitrogen: 100 - mix.oxygen,
    mod_14: calculateMODMetres(mix.oxygen, 1.4),
    mod_16: calculateMODMetres(mix.oxygen, 1.6),
  }));

  const modCell = (mod: number) =>
    mod > RECREATIONAL_DEPTH_LIMIT ? (
      <span className="text-muted-foreground">{mod}m *</span>
    ) : (
      `${mod}m`
    );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
              Diving Terminology
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {terminology.map((item, index) => (
              <div
                key={index}
                className="border-b pb-3 last:border-b-0"
              >
                <div className="flex items-start gap-2">
                  <span className="eyebrow">{item.term}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{item.definition}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <AlertTriangle className="h-5 w-5 text-primary" aria-hidden="true" />
              Safety Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {safetyGuidelines.map((guideline, index) => (
                <li key={index} className="flex items-start gap-3 text-base">
                  <div className="mt-2.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {guideline}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
              <Calculator className="h-5 w-5 text-primary" aria-hidden="true" />
            Common Nitrox Mixes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">Mix</th>
                  <th className="p-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">O₂%</th>
                  <th className="p-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">N₂%</th>
                  <th className="p-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">MOD @ 1.4 bar</th>
                  <th className="p-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">MOD @ 1.6 bar (contingency)</th>
                </tr>
              </thead>
              <tbody>
                {commonMixes.map((mix, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="p-2 font-semibold">{mix.name}</td>
                    <td className="p-2">{mix.oxygen}%</td>
                    <td className="p-2">{mix.nitrogen}%</td>
                    <td className="p-2">{modCell(mix.mod_14)}</td>
                    <td className="p-2">{modCell(mix.mod_16)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            MODs are rounded down to the whole metre. * Beyond the{" "}
            {RECREATIONAL_DEPTH_LIMIT} m recreational limit: technical diving,
            outside the scope of recreational nitrox training. Shown for
            reference only, not as a target depth.
          </p>
        </CardContent>
      </Card>

      <Card className="border-transparent bg-secondary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Waves className="h-5 w-5 text-primary" aria-hidden="true" />
            Important Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground/80">
          <p className="text-sm leading-relaxed">
            This calculator is provided for educational purposes, for divers
            learning nitrox in a training course and as a planning tool for
            certified Nitrox divers. All calculations should
            be verified independently using certified dive tables or dive
            computers. The user assumes all responsibility for the safe planning
            and execution of their dives. Always dive within your certification
            limits and follow established safety protocols. If you are not yet
            nitrox certified, use it to learn and practise, and dive nitrox
            only once you are certified.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
