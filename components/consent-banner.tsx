"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { readConsent, writeConsent } from "@/lib/consent";

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!readConsent()) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    writeConsent("accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    writeConsent("declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          With your consent we use Google Analytics cookies to see how the
          calculator is used. The calculator works the same if you decline.{" "}
          <Link href="/privacy" className="font-medium text-primary underline-offset-4 hover:underline">
            Privacy policy
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={handleDecline}>
            Decline
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
