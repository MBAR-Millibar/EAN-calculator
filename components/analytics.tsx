"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_EVENT, readConsent, type Consent } from "@/lib/consent";

const GA_ID = "G-G4JT0N0VW9";

/** Loads Google Analytics only after the visitor accepts the consent banner. */
export function Analytics() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setAccepted(readConsent() === "accepted");
    const onChange = (event: Event) =>
      setAccepted((event as CustomEvent<Consent>).detail === "accepted");
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!accepted) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
