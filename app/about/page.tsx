import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "About Millibar Nitrox",
  description:
    "Millibar Nitrox is a free Enriched Air Nitrox calculator for divers and instructors: MOD, best mix, EAD and dive planning, with the formula behind every result.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LegalPage
      eyebrow="About"
      title="About Millibar Nitrox"
      intro="An Enriched Air Nitrox calculator built for divers and instructors."
    >
      <p>
        Millibar Nitrox is an Enriched Air Nitrox calculator built for divers
        and instructors. Work out your Maximum Operating Depth, find the best
        mix for a planned depth and compare a nitrox dive with air using
        Equivalent Air Depth. Every result shows the formula behind it, so it
        works on the boat and in the classroom.
      </p>

      <h2>Made by divers, for divers</h2>
      <p>
        Millibar Nitrox is one of Millibar&apos;s free digital tools for divers
        and instructors, alongside Millibar Quest and Dive Theory Physics. It
        works the same whichever training agency you dive with.
      </p>

      <h2>About Millibar</h2>
      <p>
        Millibar builds digital infrastructure for the diving industry: tools
        that connect divers, instructors and dive centers, from course learning
        to daily dive operations. Based in Berlin.
      </p>
      <p>
        <a href="https://millibar.io">Visit millibar.io →</a>
      </p>

      <p className="text-sm italic text-muted-foreground">
        Millibar Nitrox is for certified Nitrox divers. It does not replace
        training, gas analysis or a dive computer.
      </p>
    </LegalPage>
  );
}
