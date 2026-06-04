import { PageHero } from "@/components/ui-custom/PageHero";
import { Eyebrow } from "@/components/ui-custom/Section";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const tracks = [
  {
    code: "01",
    t: "Distributor Inquiry",
    d: "Multi-state and regional distributor partnerships for Cravora and future BiovaCo brands.",
  },
  {
    code: "02",
    t: "Manufacturing Inquiry",
    d: "Contract manufacturing, co-packing and ingredient supply collaborations.",
  },
  {
    code: "03",
    t: "Retail Partnership",
    d: "Modern trade, premium general trade, e-commerce and quick-commerce listings.",
  },
  {
    code: "04",
    t: "Investor Inquiry",
    d: "Strategic and institutional investors aligned with a long-horizon innovation house.",
  },
  {
    code: "05",
    t: "Research Collaboration",
    d: "Academic, institutional and industry R&D collaborations across our research areas.",
  },
  {
    code: "06",
    t: "Incubation Partnerships",
    d: "Co-incubation of ventures with operators, scientists and category experts.",
  },
];

const investors = [
  {
    name: "Om Agro",
    location: "Dhamangaon Railway",
    details: "Invested 7.5 Lakhs INR in May 2026",
    logo: "/OMAGRO.png",
  },
];

export default function Partners() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title={
          <>
            We build with people who think in{" "}
            <span className="italic font-light text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
              decades
            </span>
            .
          </>
        }
        description="BiovaCo Nexus partners across the value chain — distribution, manufacturing, retail, capital, research and incubation."
      />

      <section className="border-b border-border">
        <div className="container-x py-24 md:py-32">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {tracks.map((t) => (
              <Link
                key={t.code}
                to="/contact"
                className="group flex flex-col bg-background p-8 transition-colors hover:bg-[color:var(--section)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs tracking-[0.3em] text-muted-foreground">
                    {t.code}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--green-deep)]" />
                </div>
                <div className="mt-12 font-display text-2xl text-foreground">{t.t}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-[color:var(--section)]">
        <div className="container-x py-24 md:py-32">
          <Eyebrow>Current Investors</Eyebrow>
          <h2 className="mt-5 max-w-3xl font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
            Backed by partners aligned with our long-term roadmap.
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {investors.map((inv) => (
              <div
                key={inv.name}
                className="group flex flex-col items-center text-center overflow-hidden rounded-3xl border border-border bg-background p-8 transition-colors hover:border-[color:var(--green)]"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-full border border-border bg-white p-2 flex items-center justify-center">
                  <img
                    src={inv.logo}
                    alt={inv.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="mt-8 font-display text-2xl text-foreground">{inv.name}</h3>
                <div className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {inv.location}
                </div>
                <div className="mt-6 text-sm font-medium text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
                  {inv.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
