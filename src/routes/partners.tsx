import { Helmet } from "react-helmet-async";
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

export default function Partners() {
  return (
    <>
      <Helmet>
        <title>Partners | BiovaCo Nexus</title>
        <meta name="description" content="BiovaCo Nexus partners across the value chain — distribution, manufacturing, retail, capital, research and incubation." />
      </Helmet>
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
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>Strategic Capital</Eyebrow>
            <h2 className="mt-5 font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
              Our Investors
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We partner with operators, agricultural networks, and institutional players who share our long-term compounding horizons.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-sm rounded-3xl border border-border bg-background p-8 transition-all duration-300 hover:border-[color:var(--green)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
              <div className="relative w-full h-24 bg-white rounded-2xl flex items-center justify-center p-4 border border-border/50">
                <img
                  src="/OMAGRO.png"
                  alt="Om Agro Logo"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="mt-6">
                <h3 className="font-display text-2xl text-foreground font-semibold">Om Agro</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
                  Dhamangaon Railway
                </p>
                
                <div className="mt-6 pt-6 border-t border-border/60">
                  <div className="flex justify-between items-center py-2.5 border-b border-border/40">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Capital Infusion</span>
                    <span className="text-sm font-semibold text-foreground">₹7.5 Lakhs INR</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Timeline</span>
                    <span className="text-sm font-semibold text-foreground">May 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
