import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  tone = "default",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "muted" | "navy";
  id?: string;
}) {
  const toneClass =
    tone === "muted"
      ? "bg-[color:var(--section)]"
      : tone === "navy"
        ? "bg-[color:var(--navy-deep)] text-white"
        : "";
  return (
    <section id={id} className={`${toneClass} ${className}`}>
      <div className="container-x py-24 md:py-32">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--green)]" />
      <span className="text-xs font-medium uppercase tracking-[0.22em] text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
        {children}
      </span>
    </div>
  );
}
