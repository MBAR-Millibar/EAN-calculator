import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-5 md:px-10">
      <a href="https://millibar.io" className="flex items-center gap-2.5" aria-label="Millibar home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/millibar-logo.svg"
          alt="Millibar"
          width={78}
          height={65}
          className="h-10 w-auto object-contain dark:brightness-0 dark:invert"
        />
        <span className="ml-1 hidden border-l border-foreground/15 pl-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground sm:inline">
          Nitrox calculator
        </span>
      </a>
      <nav aria-label="Main navigation" className="flex items-center gap-3">
        <ThemeToggle />
        <a
          href="https://millibar.io"
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-foreground/15 px-4 text-sm font-semibold transition hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          millibar.io <span className="ml-2" aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
