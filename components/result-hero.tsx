import { cn } from "@/lib/utils";

interface ResultHeroProps {
  /** What the number is, e.g. "Maximum Operating Depth" */
  label: string;
  value: React.ReactNode;
  unit: string;
  /** Secondary line under the number, e.g. the feet conversion */
  detail?: React.ReactNode;
  className?: string;
}

/** The big-number result shown as the hero of each calculator tab. */
export function ResultHero({ label, value, unit, detail, className }: ResultHeroProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center rounded-[1.25rem] bg-secondary px-6 py-10 text-center",
        className
      )}
    >
      <p className="eyebrow">{label}</p>
      <p className="mt-3 text-[clamp(3.5rem,10vw,5.5rem)] font-semibold leading-none tracking-[-0.06em] text-primary">
        {value}
        <span className="ml-1 text-[0.45em] tracking-[-0.02em]">{unit}</span>
      </p>
      {detail && <p className="mt-3 text-sm text-muted-foreground">{detail}</p>}
    </div>
  );
}

/** Formula / notes panel under each calculator. */
export function FormulaNote({ formula, children }: { formula: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[1.25rem] border bg-card p-6 text-sm leading-relaxed text-muted-foreground">
      <p className="eyebrow">Formula</p>
      <p className="mt-3 font-mono text-[13px] text-foreground">{formula}</p>
      <div className="mt-4 space-y-2">{children}</div>
    </div>
  );
}
