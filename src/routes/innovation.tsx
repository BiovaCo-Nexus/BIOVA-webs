import { PageHero } from "@/components/ui-custom/PageHero";
import { Eyebrow } from "@/components/ui-custom/Section";



const areas = [
  { code: "01", t: "Food Innovation", d: "Flavour systems, ingredient R&D, novel formats and modern consumer food brands." },
  { code: "02", t: "Agricultural Technology", d: "Post-harvest tech, traceability, agronomic data and resilient supply systems." },
  { code: "03", t: "Biomed Consumers Application", d: "Custom hardware, sensors and edge devices for monitoring and automation." },
  { code: "04", t: "Artificial Intelligence", d: "Applied AI across consumer products, agricultural decision-making and retail." },
  { code: "05", t: "Consumer Products", d: "Designing branded products that win shelves and earn repeat purchase." },
  { code: "06", t: "Research & Development", d: "Shared R&D infrastructure that compounds across every BiovaCo venture." },
];

const pipeline = [
  { stage: "Live", t: "Cravora", d: "Flagship food brand. In market." },
  { stage: "Incubation", t: "Agritech Pilot", d: "Soil-to-shelf traceability platform — early development." },
  { stage: "Concept", t: "Biomed AI", d: "Edge devices for food and agricultural workflows." },
  { stage: "Concept", t: "Next Consumer Brand", d: "A second consumer venture is in early formulation." },
];

export default function Innovation() {
  return (
    <>
      <PageHero
        eyebrow="Innovation lab"
        title={<>Where <span className="italic font-light text-[color:var(--green-deep)] dark:text-[color:var(--green)]">disciplines</span> meet.</>}
        description="The BiovaCo innovation lab is the shared engine behind every venture — a portfolio of disciplines, infrastructure and research that compounds across brands."
      />

      <section className="border-b border-border">
        <div className="container-x py-24 md:py-32">
          <Eyebrow>Research areas</Eyebrow>
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <div key={a.t} className="group bg-background p-8 transition-colors hover:bg-[color:var(--section)]">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-xs tracking-[0.3em] text-muted-foreground">{a.code}</span>
                  <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--green)]" />
                </div>
                <div className="mt-12 font-display text-2xl text-foreground">{a.t}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--section)]">
        <div className="container-x py-24 md:py-32">
          <Eyebrow>Innovation pipeline</Eyebrow>
          <h2 className="mt-5 max-w-3xl font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
            A continuous ladder of ventures.
          </h2>
          <div className="mt-16 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-background">
            {pipeline.map((p) => (
              <div key={p.t} className="grid items-center gap-4 p-6 md:grid-cols-[140px_1fr_2fr]">
                <span className="inline-flex w-fit items-center rounded-full border border-border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
                  {p.stage}
                </span>
                <div className="font-display text-2xl text-foreground">{p.t}</div>
                <div className="text-sm text-muted-foreground">{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
