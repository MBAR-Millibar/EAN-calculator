"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MODCalculator } from "@/components/mod-calculator";
import { BestMixCalculator } from "@/components/best-mix-calculator";
import { EADCalculator } from "@/components/ead-calculator";
import { DivePlanner } from "@/components/dive-planner";
import { Resources } from "@/components/resources";

const SECTIONS = [
  {
    value: "mod",
    tab: "MOD",
    eyebrow: "Maximum operating depth",
    title: "How deep can this mix go?",
    description:
      "Calculate the maximum safe depth for a given Nitrox mix based on partial pressure limits.",
    content: <MODCalculator />,
  },
  {
    value: "bestmix",
    tab: "Best Mix",
    eyebrow: "Best mix",
    title: "Which mix suits this depth?",
    description: "Determine the optimal Nitrox mix for your planned maximum depth.",
    content: <BestMixCalculator />,
  },
  {
    value: "ead",
    tab: "EAD",
    eyebrow: "Equivalent air depth",
    title: "What depth is this on air?",
    description:
      "Calculate the equivalent air depth for decompression planning with Nitrox.",
    content: <EADCalculator />,
  },
  {
    value: "planner",
    tab: "Planner",
    eyebrow: "Dive planner",
    title: "Plan the whole dive.",
    description:
      "Plan your Nitrox dive with comprehensive gas calculations and safety information.",
    content: <DivePlanner />,
  },
  {
    value: "resources",
    tab: "Resources",
    eyebrow: "Resources",
    title: "Terms, limits and references.",
    description:
      "Diving terminology, safety guidelines, and useful references for Nitrox diving.",
    content: <Resources />,
  },
];

export default function NitroxCalculator() {
  return (
    <div id="top" className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-5 pb-16 md:px-10">
        <section className="pb-10 pt-9 md:pb-14 md:pt-12">
          <p className="eyebrow mb-5">Enriched Air Nitrox</p>
          <h1 className="max-w-2xl text-balance text-[clamp(2.75rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.06em]">
            Nitrox calculator for <span className="text-primary">every dive.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-foreground/80 md:text-xl">
            For Nitrox divers and learners. Calculate MOD, Best Mix, EAD, and
            plan your dives safely.
          </p>
        </section>

        <Tabs defaultValue="mod" className="w-full">
          <TabsList>
            {SECTIONS.map((section) => (
              <TabsTrigger key={section.value} value={section.value}>
                {section.tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {SECTIONS.map((section) => (
            <TabsContent key={section.value} value={section.value}>
              <section className="rounded-[1.75rem] border bg-card p-6 md:p-10">
                <p className="eyebrow">{section.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                  {section.title}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {section.description}
                </p>
                <div className="mt-8">{section.content}</div>
              </section>
            </TabsContent>
          ))}
        </Tabs>

        <aside
          aria-labelledby="safety-heading"
          className="mt-10 rounded-[1.75rem] border-2 border-amber-500 bg-amber-50 p-6 text-amber-950 dark:border-amber-400/70 dark:bg-amber-950/40 dark:text-amber-100 md:p-8"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            <h2 id="safety-heading" className="text-xl font-semibold tracking-[-0.02em]">
              Safety warning
            </h2>
          </div>
          <p className="mt-4 max-w-3xl text-base leading-relaxed">
            Only certified Nitrox divers should dive with nitrox. If you are
            learning, use these calculations for training and practice. Always
            verify calculations independently and follow safe diving practices.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed opacity-80">
            The application is provided &apos;as is&apos; without warranty of
            any kind. We do not accept any responsibility for inaccuracies,
            errors, or any consequences that may result from the use of the
            application.
          </p>
        </aside>
      </main>

      <SiteFooter />
    </div>
  );
}
