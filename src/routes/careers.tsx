import { PageHero } from "@/components/ui-custom/PageHero";
import { Eyebrow } from "@/components/ui-custom/Section";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";


const departments = [
  "Food Innovation",
  "Marketing",
  "Business Development",
  "Operations",
  "Engineering",
  "Research",
];

const openings: any[] = [];

export default function Careers() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={<>Build the <span className="italic font-light text-[color:var(--green-deep)] dark:text-[color:var(--green)]">future</span> with us.</>}
        description="Join an innovation house that runs real brands, ships real products, and is engineered to launch many more. Six disciplines. One mission."
      />

      <section className="border-b border-border">
        <div className="container-x py-20">
          <Eyebrow>Departments</Eyebrow>
          <div className="mt-8 flex flex-wrap gap-2">
            {departments.map((d) => (
              <span key={d} className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground">
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--section)] border-b border-border">
        <div className="container-x py-24 md:py-32">
          <Eyebrow>Open positions</Eyebrow>
          <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-background">
            {openings.length > 0 ? (
              <div className="divide-y divide-border">
                {openings.map((o) => (
                  <Link key={o.title} to="/contact" className="group grid items-center gap-4 p-6 transition-colors hover:bg-[color:var(--section)] md:grid-cols-[1fr_1fr_1fr_auto]">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{o.dept}</div>
                      <div className="mt-1 font-display text-xl text-foreground">{o.title}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{o.loc}</div>
                    <div className="text-sm text-muted-foreground">{o.type}</div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--green-deep)]" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-16 text-center">
                <div className="font-display text-2xl text-foreground">No open positions</div>
                <p className="mt-3 max-w-md text-muted-foreground">We are currently not actively hiring, but we are always open to connecting with exceptional talent.</p>
              </div>
            )}
          </div>

          <div className="mt-16 rounded-3xl border border-border bg-background p-10">
            <div className="grid gap-8 md:grid-cols-[2fr_1fr] md:items-center">
              <div>
                <Eyebrow>Don't see your role?</Eyebrow>
                <h3 className="mt-4 font-display text-3xl text-foreground">
                  Send us your story.
                </h3>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  We're always interested in people who think deeply about food, agriculture or technology and want to spend a decade building.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--navy)] px-6 py-3.5 text-sm font-medium text-white hover:bg-[color:var(--navy-deep)]"
              >
                Apply to BiovaCo
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
