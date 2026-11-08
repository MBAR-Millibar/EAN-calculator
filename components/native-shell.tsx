"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISCLAIMER } from "@/lib/disclaimer";

const DISCLAIMER_KEY = "nitrox-disclaimer-accepted";

/**
 * Mobile app only: hides the native splash screen once React has mounted and
 * shows the disclaimer until the diver accepts it once.
 */
export function NativeShell() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    import("@capacitor/splash-screen")
      .then(({ SplashScreen }) => SplashScreen.hide())
      .catch(() => {});
    if (!localStorage.getItem(DISCLAIMER_KEY)) setShowDisclaimer(true);
  }, []);

  const accept = () => {
    localStorage.setItem(DISCLAIMER_KEY, new Date().toISOString());
    setShowDisclaimer(false);
  };

  if (!showDisclaimer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:items-center">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="disclaimer-title"
        className="w-full max-w-lg rounded-[1.75rem] border-2 border-amber-500 bg-card p-6 shadow-lg dark:border-amber-400/70"
      >
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <h2 id="disclaimer-title" className="text-xl font-semibold tracking-[-0.02em]">
            {DISCLAIMER.title}
          </h2>
        </div>
        <div className="mt-4 space-y-3 text-base leading-relaxed">
          {DISCLAIMER.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <Button className="mt-6 w-full" onClick={accept}>
          I understand
        </Button>
      </div>
    </div>
  );
}
