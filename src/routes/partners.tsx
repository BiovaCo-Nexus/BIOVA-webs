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
        <title>Partners & Investors | BiovaCo Nexus | Distribution, Manufacturing & Retail India</title>
        <meta name="description" content="Partner with BiovaCo Nexus across distribution, manufacturing, retail, investment, research and incubation. Current investor: Om Agro. We build with people who think in decades." />
        <meta name="keywords" content="BiovaCo Partners, BiovaCo Investors, Om Agro Investment, BiovaCo Distribution, FMCG Distributor India, Cravora Distributor, Manufacturing Partner India, Contract Manufacturing FMCG, Co-packing India, Retail Partnership India, Modern Trade Partner, E-commerce Partnership, Quick Commerce Partner, Investor Inquiry BiovaCo, Strategic Investment India, Research Collaboration India, Incubation Partnership, Co-incubation India, BiovaCo Super Stockist, Distributor Nagpur, FMCG Distribution Maharashtra, Institutional Investor India, Angel Investment FMCG, Venture Capital Food India, Supply Chain Partner, Ingredient Supplier India, BiovaCo Nexus Partnership, Innovation Partnership India, Brand Partnership India, Academic Collaboration, Industry R&D India" />
        <link rel="canonical" href="https://biovaco.in/partners" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://biovaco.in/partners" />
        <meta property="og:title" content="Partners & Investors | BiovaCo Nexus" />
        <meta property="og:description" content="Distribution, manufacturing, retail, investment, and research partnerships. We build with people who think in decades." />
        <meta property="og:image" content="https://biovaco.in/Logo.png" />
        <meta property="og:site_name" content="BiovaCo Nexus" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="BiovaCo Nexus Partners & Investors" />
        <meta name="twitter:description" content="Explore partnership tracks: distribution, manufacturing, retail, capital, research and incubation." />
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

      <section className="border-b border-border">
        <div className="container-x py-24 md:py-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>Incubation Partner</Eyebrow>
            <h2 className="mt-5 font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
              Currently Incubated At
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              BiovaCo Nexus is incubated at one of Central India's premier technology business incubators, 
              providing access to world-class infrastructure, mentorship and institutional support.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-lg rounded-3xl border border-border bg-[color:var(--section)] p-10 transition-all duration-300 hover:border-[color:var(--green)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
              <div className="relative w-full bg-white rounded-2xl flex items-center justify-center p-6 border border-border/50">
                <img
                  src="/Currnetincubation.png"
                  alt="RCOEM Technology Business Incubators Foundation"
                  className="max-h-28 max-w-full object-contain"
                />
              </div>
              <div className="mt-8">
                <h3 className="font-display text-2xl text-foreground font-semibold">
                  RCOEM Technology Business Incubators Foundation
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
                  Ramdeobaba University · Nagpur, Maharashtra
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  A Section 8 company established by Ramdeobaba University to foster innovation, 
                  entrepreneurship and technology-driven startup growth. Operating through 
                  RCOEM-TATA CIIIT — the Center for Invention, Innovation, Incubation & Training.
                </p>

                <div className="mt-6 pt-6 border-t border-border/60 grid grid-cols-2 gap-4">
                  <div className="py-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block">Mentors</span>
                    <span className="text-sm font-semibold text-foreground mt-1 block">100+ Experts</span>
                  </div>
                  <div className="py-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block">Infrastructure</span>
                    <span className="text-sm font-semibold text-foreground mt-1 block">RCOEM-TATA CIIIT</span>
                  </div>
                </div>

                <a
                  href="https://rcoemtbi.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--green-deep)] hover:text-[color:var(--navy)] dark:text-[color:var(--green)] transition-colors"
                >
                  Visit RCOEM TBI Foundation <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
