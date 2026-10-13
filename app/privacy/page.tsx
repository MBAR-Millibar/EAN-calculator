import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { COMPANY, CONTACT } from "@/lib/site";
import { CONSENT_KEY } from "@/lib/consent";

export const metadata: Metadata = {
  title: "Privacy Policy | Millibar Nitrox",
  description:
    "How Millibar Nitrox handles personal data: no accounts, calculations stay in your browser, Vercel hosting and consent-based Google Analytics.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy policy"
      intro="Millibar Nitrox has no accounts and your calculations never leave your browser. This page explains the little data that is processed."
      lastUpdated="13 October 2026"
    >
      <p>
        This policy covers Millibar Nitrox at ean.millibar.io only. Other
        Millibar services, such as the platform at app.millibar.io, have their
        own privacy policies.
      </p>

      <h2>1. Controller</h2>
      <p>
        <strong>{COMPANY.name}</strong>
        <br />
        {COMPANY.careOf}, {COMPANY.street}, {COMPANY.city}
        <br />
        Represented by: {COMPANY.representedBy}
        <br />
        Email: <a href={`mailto:${CONTACT.privacy}`}>{CONTACT.privacy}</a>
      </p>

      <h2>2. No account, and your inputs stay on your device</h2>
      <p>
        You can use the calculator without registering or giving us your name
        or email address. All calculations (MOD, best mix, EAD and the dive
        planner) run in your browser. The values you enter are not sent to our
        servers, and we do not store them.
      </p>

      <h2>3. Hosting and server logs</h2>
      <p>
        The site is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA
        91723, USA. Static files are delivered through Vercel&apos;s global
        edge network, so a request may be answered by the server closest to
        you, which can be outside the EU. Server-side functions run in
        Vercel&apos;s Frankfurt region (fra1).
      </p>
      <p>
        When you open the site, Vercel automatically processes technical data
        needed to deliver it: your IP address, the date and time of the
        request, the page requested, the browser and operating system (user
        agent) and the referring page. This data is used to deliver the site,
        keep it secure and fix errors. Vercel keeps these logs only for a
        limited period and deletes them automatically; we do not combine them
        with other data or use them to identify you.
      </p>
      <p>
        Legal basis: our legitimate interest in operating a secure and
        reliable website (Art. 6(1)(f) GDPR). Vercel processes the data on our
        behalf under a data processing agreement (Art. 28 GDPR). Transfers to
        the USA are based on the EU-US Data Privacy Framework, under which
        Vercel is certified, and on the EU Standard Contractual Clauses
        included in Vercel&apos;s data processing agreement.
      </p>

      <h2>4. Google Analytics (only with your consent)</h2>
      <p>
        If you click &quot;Accept&quot; in the cookie banner, we use Google
        Analytics 4 to understand how the calculator is used, for example which
        tabs are opened and roughly where visitors come from. If you click
        &quot;Decline&quot;, or do not choose, Google Analytics is not loaded
        and no analytics cookies are set.
      </p>
      <p>
        The provider is Google Ireland Limited, Gordon House, Barrow Street,
        Dublin 4, Ireland. Google Analytics sets cookies (such as{" "}
        <code>_ga</code> and <code>_ga_&lt;ID&gt;</code>) that are kept for up
        to 2 years, and processes your IP address, device and browser
        information, and the pages you visit. Data may be transferred to
        Google LLC in the USA; Google is certified under the EU-US Data
        Privacy Framework.
      </p>
      <p>
        Legal basis: your consent (Art. 6(1)(a) GDPR and § 25(1) TDDDG). You
        can withdraw it at any time with effect for the future by deleting
        this site&apos;s cookies and stored data in your browser; the banner
        then asks again. More information:{" "}
        <a href="https://policies.google.com/privacy">Google privacy policy</a>.
      </p>

      <h2>5. Data stored in your browser</h2>
      <p>
        The site stores two small values in your browser&apos;s local storage.
        They never leave your device:
      </p>
      <ul>
        <li>
          <code>theme</code>: whether you chose the light or dark theme.
        </li>
        <li>
          <code>{CONSENT_KEY}</code>: whether you accepted or declined
          analytics, so the banner is not shown on every visit.
        </li>
      </ul>
      <p>
        Both are needed to provide the features you asked for (§ 25(2) TDDDG)
        and do not require consent. You can delete them at any time in your
        browser settings.
      </p>
      <p>
        Fonts are served from our own domain; no request is made to Google
        Fonts or other font providers.
      </p>

      <h2>6. Contacting us</h2>
      <p>
        If you email us, we use your email address and message only to reply
        to you (Art. 6(1)(f) GDPR) and delete them once your request is
        resolved, unless we must keep them by law.
      </p>

      <h2>7. Your rights</h2>
      <p>Under the GDPR you have the right to:</p>
      <ul>
        <li>access the personal data we hold about you (Art. 15);</li>
        <li>have it corrected (Art. 16) or erased (Art. 17);</li>
        <li>restrict its processing (Art. 18);</li>
        <li>receive it in a portable format (Art. 20);</li>
        <li>
          object to processing based on legitimate interests (Art. 21);
        </li>
        <li>withdraw consent at any time (Art. 7(3)).</li>
      </ul>
      <p>
        To exercise these rights, email{" "}
        <a href={`mailto:${CONTACT.privacy}`}>{CONTACT.privacy}</a>. You also
        have the right to lodge a complaint with a data protection supervisory
        authority, for example the Berlin Commissioner for Data Protection and
        Freedom of Information (Berliner Beauftragte für Datenschutz und
        Informationsfreiheit).
      </p>

      <h2>8. Changes</h2>
      <p>
        We update this policy when the site or the law changes. The date below
        shows the current version.
      </p>
    </LegalPage>
  );
}
