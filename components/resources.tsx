import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, AlertTriangle, Calculator, Waves } from "lucide-react";

export function Resources() {
  const terminology = [
    {
      term: "MOD",
      definition:
        "Maximum Operating Depth - The deepest depth at which a gas mix can be safely used",
      color: "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-400/50",
    },
    {
      term: "EAD",
      definition:
        "Equivalent Air Depth - The depth of air that would have the same nitrogen partial pressure",
      color: "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-400/50",
    },
    {
      term: "PO₂",
      definition:
        "Partial Pressure of Oxygen - The pressure exerted by oxygen in a gas mixture",
      color: "bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-400/50",
    },
    {
      term: "EAN",
      definition:
        "Enriched Air Nitrox - Air with higher oxygen content than normal air (21%)",
      color: "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-400/50",
    },
    {
      term: "CNS",
      definition:
        "Central Nervous System oxygen toxicity - Risk from high oxygen partial pressures",
      color: "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-400/50",
    },
    {
      term: "OTU",
      definition:
        "Oxygen Tolerance Unit - Measure of pulmonary oxygen toxicity exposure",
      color: "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-400/50",
    },
  ];

  const safetyGuidelines = [
    "Always analyze your gas mix before diving",
    "Never exceed 1.4 bar PO₂ for recreational diving",
    "Use 1.6 bar PO₂ maximum for technical diving working portions",
    "Plan contingency depths and gas switches",
    "Carry appropriate emergency procedures",
    "Maintain proper certification and training",
  ];

  const commonMixes = [
    {
      name: "EAN32",
      oxygen: 32,
      nitrogen: 68,
      mod_14: "33.8m",
      mod_16: "40.0m",
    },
    {
      name: "EAN36",
      oxygen: 36,
      nitrogen: 64,
      mod_14: "28.9m",
      mod_16: "34.4m",
    },
    {
      name: "EAN40",
      oxygen: 40,
      nitrogen: 60,
      mod_14: "25.0m",
      mod_16: "30.0m",
    },
    { name: "Air", oxygen: 21, nitrogen: 79, mod_14: "56.7m", mod_16: "66.2m" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-white/10 backdrop-blur-sm border-slate-200 dark:border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-gray-200">
              <BookOpen className="h-5 w-5" />
              Diving Terminology
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {terminology.map((item, index) => (
              <div
                key={index}
                className="border-b border-slate-200 dark:border-white/10 pb-2 last:border-b-0"
              >
                <div className="flex items-start gap-2">
                  <Badge
                    variant="outline"
                    className={`font-mono text-xs ${item.color}`}
                  >
                    {item.term}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-gray-300 mt-1">{item.definition}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-white/10 backdrop-blur-sm border-slate-200 dark:border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-gray-200">
              <AlertTriangle className="h-5 w-5" />
              Safety Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {safetyGuidelines.map((guideline, index) => (
                <li key={index} className="flex items-start gap-3 text-base text-slate-700 dark:text-gray-200">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2.5 flex-shrink-0" />
                  {guideline}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-white/10 backdrop-blur-sm border-slate-200 dark:border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-gray-200">
            <Calculator className="h-5 w-5" />
            Common Nitrox Mixes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-slate-700 dark:text-gray-200">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10">
                  <th className="text-left p-2">Mix</th>
                  <th className="text-left p-2">O₂%</th>
                  <th className="text-left p-2">N₂%</th>
                  <th className="text-left p-2">MOD @ 1.4 bar</th>
                  <th className="text-left p-2">MOD @ 1.6 bar</th>
                </tr>
              </thead>
              <tbody>
                {commonMixes.map((mix, index) => (
                  <tr key={index} className="border-b border-slate-200 dark:border-white/10">
                    <td className="p-2 font-semibold">{mix.name}</td>
                    <td className="p-2">{mix.oxygen}%</td>
                    <td className="p-2">{mix.nitrogen}%</td>
                    <td className="p-2">{mix.mod_14}</td>
                    <td className="p-2">{mix.mod_16}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-400/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-200">
            <Waves className="h-5 w-5" />
            Important Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-600 dark:text-blue-200">
          <p className="text-sm leading-relaxed">
            This calculator is provided for educational purposes and as a
            planning tool for certified Nitrox divers. All calculations should
            be verified independently using certified dive tables or dive
            computers. The user assumes all responsibility for the safe planning
            and execution of their dives. Always dive within your certification
            limits and follow established safety protocols.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
