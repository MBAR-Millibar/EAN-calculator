import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { COMPANY, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use | Millibar Nitrox",
  description:
    "Terms of use for Millibar Nitrox, a free nitrox calculator for certified Nitrox divers and learners.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of use"
      intro="The rules for using Millibar Nitrox at ean.millibar.io."
      lastUpdated="13 October 2026"
    >
      <h2>1. Provider and scope</h2>
      <p>
        Millibar Nitrox (&quot;the calculator&quot;) is provided free of charge
        by {COMPANY.name} (&quot;Millibar&quot;, &quot;we&quot;). These terms
        apply to every use of the calculator at ean.millibar.io. By using it
        you accept these terms. No account or registration is needed.
      </p>

      <h2>2. Who the calculator is for</h2>
      <p>
        Only certified Nitrox divers should dive with nitrox. If you are
        learning, use these calculations for training and practice. Always
        verify calculations independently and follow safe diving practices.
      </p>
      <p>
        This calculator is provided for educational purposes, for divers
        learning nitrox in a training course and as a planning tool for
        certified Nitrox divers. All calculations should be verified
        independently using certified dive tables or dive computers. The user
        assumes all responsibility for the safe planning and execution of their
        dives. Always dive within your certification limits and follow
        established safety protocols. If you are not yet nitrox certified, use
        it to learn and practise, and dive nitrox only once you are certified.
      </p>

      <h2>3. What the calculator does not replace</h2>
      <p>The calculator is a reference tool. It does not replace:</p>
      <ul>
        <li>nitrox training and certification by a recognised training agency;</li>
        <li>analysing your gas yourself before every dive;</li>
        <li>dive planning by a qualified professional;</li>
        <li>a dive computer or certified dive tables.</li>
      </ul>
      <p>
        You must check every result independently before relying on it. Results
        are rounded as described on the site and may differ from your training
        agency&apos;s tables.
      </p>

      <h2>4. No warranty</h2>
      <p>
        The application is provided &apos;as is&apos; without warranty of any
        kind. We do not accept any responsibility for inaccuracies, errors, or
        any consequences that may result from the use of the application. We
        do not guarantee that the calculator is available at all times or free
        of errors, and we may change or discontinue it at any time.
      </p>

      <h2>5. Limitation of liability</h2>
      <p>
        Because the calculator is provided free of charge, we are liable only
        for intent (Vorsatz) and gross negligence (grobe Fahrlässigkeit).
        Nothing in these terms excludes or limits liability for injury to life,
        body or health, liability under the German Product Liability Act
        (Produkthaftungsgesetz), or any other liability that cannot be excluded
        or limited under mandatory German or EU law.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        The calculator, its design and its texts are the property of Millibar
        or its licensors and are protected by copyright and trade mark law.
        Millibar and Millibar Nitrox are trade names of {COMPANY.name}.
      </p>

      <h2>7. Privacy</h2>
      <p>
        How we handle data when you use the calculator is explained in our{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>

      <h2>8. Governing law</h2>
      <p>
        These terms are governed by the laws of the Federal Republic of
        Germany, excluding the UN Convention on Contracts for the International
        Sale of Goods. If you use the calculator as a consumer, this choice of
        law does not take away the protection of mandatory provisions of the
        law of the country where you live.
      </p>
      <p>
        If any provision of these terms is invalid, the remaining provisions
        stay in effect.
      </p>

      <h2>9. Changes and contact</h2>
      <p>
        We may update these terms; the date below shows the current version.
        Questions: <a href={`mailto:${CONTACT.general}`}>{CONTACT.general}</a>.
      </p>
    </LegalPage>
  );
}
