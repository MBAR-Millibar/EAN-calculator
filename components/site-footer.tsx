const LEGAL_LINKS = [
  { href: "https://app.millibar.io/terms", label: "Terms" },
  { href: "https://app.millibar.io/privacy", label: "Privacy" },
  { href: "https://app.millibar.io/security", label: "Security" },
  { href: "https://app.millibar.io/imprint", label: "Imprint" },
];

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-10">
      <a href="https://millibar.io" className="inline-flex items-center gap-2 font-semibold text-foreground">
        <span className="brand-mark brand-mark-small" aria-hidden="true">
          <span />
        </span>
        millibar
      </a>
      <p>Built for the people who make diving happen.</p>
      <nav aria-label="Legal" className="flex flex-wrap gap-x-4 gap-y-2">
        {LEGAL_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="transition hover:text-foreground">
            {link.label}
          </a>
        ))}
        <span>© {new Date().getFullYear()} Millibar</span>
        <a href="#top" className="transition hover:text-foreground">
          Back to top ↑
        </a>
      </nav>
    </footer>
  );
}
