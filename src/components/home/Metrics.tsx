import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Eyebrow } from "@/components/ui-custom/Section";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 2, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    }
  }, [inView, mv, to]);

  return (
    <>
      <motion.span ref={ref}>{rounded}</motion.span>
      {suffix}
    </>
  );
}

const metrics = [
  { value: 1, suffix: "", label: "Active venture", sub: "Cravora" },
  { value: 4, suffix: "+", label: "Products in market", sub: "Flavoured formats" },
  { value: 5, suffix: "", label: "Innovation areas", sub: "Food · Agri · AI · Biomed · Consumer" },
  { value: 100, suffix: "%", label: "Future growth potential", sub: "Pipeline of ventures" },
] as const;

export function Metrics() {
  return (
    <section className="border-t border-border">
      <div className="container-x py-24 md:py-32">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Eyebrow>Impact</Eyebrow>
            <h2 className="mt-5 font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
              A measured beginning. An unbounded horizon.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Numbers we choose to share today — built to grow as the BiovaCo portfolio expands.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-background p-8">
              <div className="font-display text-5xl tracking-[-0.04em] text-[color:var(--navy)] dark:text-foreground md:text-6xl">
                <Counter to={m.value} suffix={m.suffix} />
              </div>
              <div className="mt-6 text-sm font-medium text-foreground">{m.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
