import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/security", label: "Security" },
  { href: "/imprint", label: "Imprint" },
];

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-10">
      <Link href="/" className="inline-flex items-center gap-2 font-semibold text-foreground">
        <span className="brand-mark brand-mark-small" aria-hidden="true">
          <span />
        </span>
        Millibar Nitrox
      </Link>
      <p>Built for the people who make diving happen.</p>
      <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-2">
        {FOOTER_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="transition hover:text-foreground">
            {link.label}
          </Link>
        ))}
        <a href="https://millibar.io" className="transition hover:text-foreground">
          millibar.io <span aria-hidden="true">↗</span>
        </a>
        <span>© {new Date().getFullYear()} Millibar</span>
        <a href="#top" className="transition hover:text-foreground">
          Back to top ↑
        </a>
      </nav>
    </footer>
  );
}
