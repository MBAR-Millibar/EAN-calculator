import { ArrowUpRight } from "lucide-react";
import { DISCLAIMER } from "@/lib/disclaimer";

const LINKS = [
  { href: "https://ean.millibar.io/privacy", label: "Privacy policy" },
  { href: "https://ean.millibar.io/about", label: "About and support" },
  { href: "https://ean.millibar.io", label: "Web version" },
];

/** Info tab of the mobile app: disclaimer, links and version. */
export function AppInfo() {
  return (
    <div className="space-y-8">
      <div className="rounded-[1.25rem] border-2 border-amber-500 bg-amber-50 p-6 text-amber-950 dark:border-amber-400/70 dark:bg-amber-950/40 dark:text-amber-100">
        <h3 className="text-lg font-semibold">{DISCLAIMER.title}</h3>
        <div className="mt-3 space-y-3 text-base leading-relaxed">
          {DISCLAIMER.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
      <ul className="space-y-2">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline">
              {link.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
      <p className="text-sm text-muted-foreground">
        Millibar Nitrox {process.env.NEXT_PUBLIC_APP_VERSION} · All calculations run on this device and work offline.
      </p>
    </div>
  );
}
