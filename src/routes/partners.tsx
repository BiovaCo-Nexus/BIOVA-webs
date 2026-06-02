import { PageHero } from "@/components/ui-custom/PageHero";
import { Eyebrow } from "@/components/ui-custom/Section";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";


const tracks = [
  { code: "01", t: "Distributor Inquiry", d: "Multi-state and regional distributor partnerships for Cravora and future BiovaCo brands." },
  { code: "02", t: "Manufacturing Inquiry", d: "Contract manufacturing, co-packing and ingredient supply collaborations." },
  { code: "03", t: "Retail Partnership", d: "Modern trade, premium general trade, e-commerce and quick-commerce listings." },
  { code: "04", t: "Investor Inquiry", d: "Strategic and institutional investors aligned with a long-horizon innovation house." },
  { code: "05", t: "Research Collaboration", d: "Academic, institutional and industry R&D collaborations across our research areas." },
  { code: "06", t: "Incubation Partnerships", d: "Co-incubation of ventures with operators, scientists and category experts." },
];

export default function Partners() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title={<>We build with people who think in <span className="italic font-light text-[color:var(--green-deep)] dark:text-[color:var(--green)]">decades</span>.</>}
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
                  <span className="font-display text-xs tracking-[0.3em] text-muted-foreground">{t.code}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--green-deep)]" />
                </div>
                <div className="mt-12 font-display text-2xl text-foreground">{t.t}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
