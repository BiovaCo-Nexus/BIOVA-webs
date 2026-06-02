import { Eyebrow } from "@/components/ui-custom/Section";

const types = [
  "Distributors",
  "Manufacturing Partners",
  "Research Institutions",
  "Investors",
  "Incubators",
];

export function Partners() {
  return (
    <section className="border-t border-border">
      <div className="container-x py-24 md:py-32">
        <div className="max-w-3xl">
          <Eyebrow>Partners &amp; Collaborations</Eyebrow>
          <h2 className="mt-5 font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
            We build with partners who share a long horizon.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-5">
          {types.map((t, i) => (
            <div
              key={t}
              className="group relative flex aspect-[5/3] flex-col justify-between bg-background p-6 transition-colors hover:bg-[color:var(--section)]"
            >
              <span className="text-xs text-muted-foreground tabular-nums">0{i + 1}</span>
              <div>
                <div className="font-display text-lg leading-tight text-foreground">{t}</div>
                <div className="mt-3 h-px w-6 bg-[color:var(--green)] transition-all group-hover:w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
