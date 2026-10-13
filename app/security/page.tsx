import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security | Millibar Nitrox",
  description:
    "How Millibar Nitrox is secured and how to report a security vulnerability.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <LegalPage
      eyebrow="Security"
      title="Security"
      intro="A small app with a small attack surface, and a clear way to tell us if something is wrong."
      lastUpdated="13 October 2026"
    >
      <h2>How Millibar Nitrox is built</h2>
      <ul>
        <li>
          <strong>HTTPS only.</strong> The site is served exclusively over
          HTTPS; plain HTTP requests are redirected.
        </li>
        <li>
          <strong>No accounts.</strong> There is no sign-up, login or password,
          so there are no credentials to steal.
        </li>
        <li>
          <strong>Calculations stay in your browser.</strong> Everything you
          type into the calculator is processed on your device and is not sent
          to our servers or stored by us.
        </li>
        <li>
          <strong>No stored personal data.</strong> We keep no database of
          users. The only data involved are short-lived hosting logs and, if you
          accept, Google Analytics, as described in the{" "}
          <Link href="/privacy">privacy policy</Link>.
        </li>
      </ul>

      <h2>Reporting a vulnerability</h2>
      <p>
        If you believe you have found a security issue, please email{" "}
        <a href={`mailto:${CONTACT.security}`}>{CONTACT.security}</a> with a
        description, the steps to reproduce it and the affected URL. We will
        acknowledge your report and keep you updated while we fix it.
      </p>
      <p>
        Please give us reasonable time to fix the issue before disclosing it,
        and do not access other people&apos;s data or disrupt the service while
        testing. Our contact details are also published in{" "}
        <a href="/.well-known/security.txt">security.txt</a>.
      </p>
    </LegalPage>
  );
}
