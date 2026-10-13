import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
  lastUpdated?: string;
  children: React.ReactNode;
};

/** Shell for the footer-only info pages: About, Terms, Privacy, Security, Imprint. */
export function LegalPage({ eyebrow, title, intro, lastUpdated, children }: LegalPageProps) {
  return (
    <div id="top" className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto w-full max-w-7xl px-5 pb-16 md:px-10">
        <section className="pb-10 pt-9 md:pb-14 md:pt-12">
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="max-w-3xl text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-foreground/80">
              {intro}
            </p>
          )}
        </section>

        <article className="legal-prose rounded-[1.75rem] border bg-card p-6 md:p-10">
          {children}
          {lastUpdated && (
            <p className="mt-10 border-t pt-6 text-xs text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          )}
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
