import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Eyebrow } from "@/components/ui-custom/Section";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui-custom/FadeIn";
import { supabase } from "@/lib/supabase";
import { X, Loader2, ArrowUpRight } from "lucide-react";

const values = [
  {
    t: "Long Horizon",
    d: "We build companies, not campaigns. Every venture is designed to compound for decades.",
  },
  {
    t: "Scientific Rigor",
    d: "Decisions begin with evidence — in flavour, in soil, in code, in the market.",
  },
  {
    t: "Quiet Confidence",
    d: "We let the work speak. Restrained design, deliberate communication, deep craft.",
  },
  {
    t: "Operator Mindset",
    d: "We do the unglamorous work of distribution, manufacturing and operations ourselves.",
  },
];

const roadmap = [
  {
    y: "2026",
    t: "Foundation",
    d: "BiovaCo Nexus is incorporated as a multi-brand innovation holding company.",
  },
  {
    y: "2026",
    t: "Cravora",
    d: "Launch of Cravora — the first consumer venture in the food innovation track.",
  },
  {
    y: "2027-2028",
    t: "Agri & Biomed",
    d: "Pilots in agricultural systems and biomed consumer applications.",
  },
  {
    y: "2028+",
    t: "Portfolio",
    d: "Continuous incubation of new ventures across the BiovaCo innovation areas.",
  },
];

const leadership = [
  { name: "Nakul Mundhada", role: "Founder, Chief Executive Officer (CEO) & Managing Director (MD)", img: "/Nakul_Photo.jpeg", url: "https://nakulmundhada.site" },
  { name: "Richa Rajan", role: "Co-Founder & Executive Director – Brand, Growth & Product Strategy", img: "/Richa_photo.jpg", url: "" },
];

export default function About() {
  const [interns, setInterns] = useState<any[]>([]);
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (activeUrl) {
      document.body.style.overflow = "hidden";
      setIframeLoaded(false);
    } else {
      document.body.style.overflow = "unset";
      setTimeout(() => setIframeLoaded(false), 300);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeUrl]);

  useEffect(() => {
    const fetchInterns = async () => {
      const { data, error } = await supabase.from("interns").select("*").eq("status", "Active"); // only fetch active interns
      // if is_featured exists, you can order by it, but let's just fetch all active for now

      if (error) {
        console.error("Error fetching interns:", error);
      } else {
        setInterns(data || []);
      }
    };

    fetchInterns();
  }, []);

  return (
    <>
      <Helmet>
        <title>About BiovaCo Nexus | Mission, Vision, Leadership & Story | Innovation Company India</title>
        <meta name="description" content="Discover the mission, vision, and leadership of BiovaCo Nexus. Founded by Nakul Mundhada & Richa Rajan, we are India's premier innovation holding company building durable ventures in food, agriculture, and technology for the long horizon." />
        <meta name="keywords" content="About BiovaCo Nexus, BiovaCo Mission, BiovaCo Vision, BiovaCo Leadership, Nakul Mundhada CEO, Richa Rajan Co-Founder, BiovaCo Founders, BiovaCo Story, Innovation Company India, Holding Company India, BiovaCo Values, Long Horizon Innovation, Scientific Rigor, Operator Mindset, BiovaCo Roadmap, BiovaCo Team, BiovaCo Interns, Young Entrepreneurs India, Startup Story India, Indian Business Leaders, BiovaCo History, Company Background, BiovaCo Culture, Innovation Philosophy, Brand Building India, Venture Building, Multi Brand Company, Dhamangaon Railway, Nagpur Company, Maharashtra Startup, Indian Pvt Ltd Company, CIN U46300ME2026PTC475352, BiovaCo Core Values, Company Vision 2028, Future Roadmap India, Food Agriculture Technology Company" />
        <link rel="canonical" href="https://biovaco.in/about" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://biovaco.in/about" />
        <meta property="og:title" content="About BiovaCo Nexus | Our Mission & Leadership" />
        <meta property="og:description" content="Meet the founders and team behind India's innovation holding company. Building durable companies at the intersection of food, agriculture and technology." />
        <meta property="og:image" content="https://biovaco.in/Logo.png" />
        <meta property="og:site_name" content="BiovaCo Nexus" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About BiovaCo Nexus | Innovation Company India" />
        <meta name="twitter:description" content="Our mission, leadership, and the story behind India's innovation holding company." />
        <meta name="twitter:image" content="https://biovaco.in/Logo.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is BiovaCo Nexus?",
                "acceptedAnswer": { "@type": "Answer", "text": "BiovaCo Nexus Pvt. Ltd. is an innovation holding company from India that builds, launches, and scales next-generation consumer brands across food, agricultural technology, and AI. Its flagship brand is Cravora." }
              },
              {
                "@type": "Question",
                "name": "Who founded BiovaCo Nexus?",
                "acceptedAnswer": { "@type": "Answer", "text": "BiovaCo Nexus was founded by Nakul Mundhada (CEO & Managing Director) and Richa Rajan (Co-Founder & Executive Director)." }
              },
              {
                "@type": "Question",
                "name": "What is Cravora?",
                "acceptedAnswer": { "@type": "Answer", "text": "Cravora is a modern Indian food brand owned by BiovaCo Nexus that engineers bold, dust-based flavour systems for snacks like makhana and popcorn. Its tagline is 'Dust The Crave.'" }
              },
              {
                "@type": "Question",
                "name": "Who owns Cravora?",
                "acceptedAnswer": { "@type": "Answer", "text": "Cravora is fully owned and operated by BiovaCo Nexus Private Limited." }
              },
              {
                "@type": "Question",
                "name": "What is the CIN of BiovaCo Nexus?",
                "acceptedAnswer": { "@type": "Answer", "text": "The Corporate Identification Number (CIN) for BiovaCo Nexus is U46300ME2026PTC475352." }
              },
              {
                "@type": "Question",
                "name": "Where is BiovaCo Nexus located?",
                "acceptedAnswer": { "@type": "Answer", "text": "BiovaCo Nexus is headquartered in Nagpur, Maharashtra, India. Its registered office is at H. No. 72, Bhagchand Nagar, Dhamangaon Railway, Maharashtra – 444709." }
              },
              {
                "@type": "Question",
                "name": "What industries does BiovaCo Nexus operate in?",
                "acceptedAnswer": { "@type": "Answer", "text": "BiovaCo Nexus operates across Food & Beverage (Cravora brand), Agricultural Technology, Artificial Intelligence, Biomedical Consumer Applications, and Consumer Products." }
              },
              {
                "@type": "Question",
                "name": "Is BiovaCo Nexus hiring?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. BiovaCo Nexus regularly posts internship and full-time positions across Food Technology, Marketing, AI, Design, Finance, and Business Development. Visit https://biovaco.in/careers for current openings." }
              },
              {
                "@type": "Question",
                "name": "What products does Cravora sell?",
                "acceptedAnswer": { "@type": "Answer", "text": "Cravora's product line includes Mango-Chili Dust, Pepper-Lime Blast, Flavoured Makhana (fox nuts), and Flavoured Popcorn — all engineered with food science-backed flavour curves." }
              },
              {
                "@type": "Question",
                "name": "Who invested in BiovaCo Nexus?",
                "acceptedAnswer": { "@type": "Answer", "text": "Om Agro from Dhamangaon Railway invested ₹7.5 Lakhs INR in BiovaCo Nexus in May 2026." }
              },
              {
                "@type": "Question",
                "name": "How to contact BiovaCo Nexus?",
                "acceptedAnswer": { "@type": "Answer", "text": "Email ceo@biovaco.in (CEO) or hello@biovaco.in (General), call +91 9226595332, or visit the contact page at https://biovaco.in/contact." }
              },
              {
                "@type": "Question",
                "name": "What is BiovaCo Nexus's mission?",
                "acceptedAnswer": { "@type": "Answer", "text": "To build a portfolio of category-defining brands across food, agriculture and technology — engineered with scientific rigor and operated for the long term." }
              },
              {
                "@type": "Question",
                "name": "Who is Nakul Mundhada?",
                "acceptedAnswer": { "@type": "Answer", "text": "Nakul Mundhada is the Founder, CEO & Managing Director of BiovaCo Nexus Pvt. Ltd. He leads overall strategy, technology, product development, and corporate operations. Email: ceo@biovaco.in | Portfolio: https://nakulmundhada.site" }
              },
              {
                "@type": "Question",
                "name": "Who is Richa Rajan?",
                "acceptedAnswer": { "@type": "Answer", "text": "Richa Rajan is the Co-Founder & Executive Director of BiovaCo Nexus Pvt. Ltd. She leads brand architecture, growth strategy, marketing, and product innovation. Email: richarajan@biovaco.in" }
              },
              {
                "@type": "Question",
                "name": "How can I partner with BiovaCo Nexus?",
                "acceptedAnswer": { "@type": "Answer", "text": "BiovaCo Nexus accepts partnership inquiries across distribution, manufacturing, retail, investment, research, and incubation. Visit https://biovaco.in/partners or email hello@biovaco.in." }
              },
              {
                "@type": "Question",
                "name": "BiovaCo Nexus Private Limited explained (Company Type & Registrations)?",
                "acceptedAnswer": { "@type": "Answer", "text": "BiovaCo Nexus Private Limited is a registered private limited company in India (CIN: U46300ME2026PTC475352). It operates as a multi-sector startup spanning food processing, FMCG, agri-tech, and AI. The company is registered with MCA/ROC Nagpur, MSME (Udyam), and FSSAI." }
              },
              {
                "@type": "Question",
                "name": "Who are the directors of BiovaCo Nexus Pvt Ltd?",
                "acceptedAnswer": { "@type": "Answer", "text": "As per official ROC and MCA master data, the directors of BiovaCo Nexus Pvt Ltd are Nakul Mundhada and Richa Pradeep Rajan." }
              },
              {
                "@type": "Question",
                "name": "Where is the registered office of BiovaCo Nexus Pvt Ltd?",
                "acceptedAnswer": { "@type": "Answer", "text": "The registered office of BiovaCo Nexus Pvt Ltd is located in Dhamangaon Railway, Amravati District, Maharashtra, India. The company also operates from its business office in Nagpur, Vidarbha region." }
              }
            ]
          })}
        </script>
      </Helmet>
      <PageHero
        eyebrow="About"
        title={
          <>
            An innovation company{" "}
            <span className="italic font-light text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
              built for the long horizon.
            </span>
          </>
        }
        description="BiovaCo Nexus exists to build durable companies at the intersection of food, agriculture and technology — one venture at a time, with discipline."
      />

      <section className="border-b border-border">
        <FadeIn className="container-x py-24 md:py-32">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <Eyebrow>Mission</Eyebrow>
              <p className="mt-5 font-display text-2xl leading-tight text-foreground md:text-3xl">
                To build a portfolio of category-defining brands across food, agriculture and
                technology — engineered with scientific rigor and operated for the long term.
              </p>
            </div>
            <div>
              <Eyebrow>Vision</Eyebrow>
              <p className="mt-5 font-display text-2xl leading-tight text-foreground md:text-3xl">
                A globally respected innovation house from India, whose ventures shape how the next
                generation eats, farms and computes.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="border-b border-border bg-[color:var(--section)]">
        <div className="container-x py-24 md:py-32">
          <FadeIn>
            <Eyebrow>Core values</Eyebrow>
            <h2 className="mt-5 max-w-3xl font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
              Principles that govern every venture we build.
            </h2>
          </FadeIn>
          <FadeInStagger className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
            {values.map((v) => (
              <FadeInItem key={v.t}>
                <div className="bg-background h-full p-8">
                  <div className="font-display text-2xl text-foreground">{v.t}</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <section className="border-b border-border">
        <FadeIn className="container-x py-24 md:py-32">
          <Eyebrow>Founder journey</Eyebrow>
          <h2 className="mt-5 max-w-3xl font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
            From a single product to a multi-venture house.
          </h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-[2fr_1fr]">
            <p className="text-lg leading-relaxed text-muted-foreground">
              BiovaCo began with a simple conviction: India deserves a generation of homegrown
              brands built with the same rigor and patience as the most respected global companies.
              We started with food — because flavour is universal and unforgiving — and structured
              the parent company so each new venture can be incubated with shared infrastructure,
              capital discipline and scientific depth.
            </p>
            <div className="rounded-3xl border border-border bg-[color:var(--section)] p-8">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Innovation philosophy
              </div>
              <p className="mt-4 font-display text-xl text-foreground">
                Build slowly. Ship deliberately. Compound forever.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="border-b border-border bg-[color:var(--section)]">
        <div className="container-x py-24 md:py-32">
          <FadeIn>
            <Eyebrow>Current Incubation</Eyebrow>
            <h2 className="mt-5 max-w-3xl font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
              Incubated at{" "}
              <span className="italic font-light text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
                RCOEM TBI Foundation
              </span>
              , Nagpur.
            </h2>
          </FadeIn>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
            <FadeIn>
              <div className="flex flex-col items-center rounded-3xl border border-border bg-background p-10 shadow-sm">
                <div className="relative w-full max-w-xs bg-white rounded-2xl flex items-center justify-center p-6 border border-border/50">
                  <img
                    src="/Currnetincubation.png"
                    alt="RCOEM Technology Business Incubators Foundation"
                    className="max-h-32 max-w-full object-contain"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="font-display text-xl text-foreground font-semibold">
                    RCOEM Technology Business Incubators Foundation
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
                    Ramdeobaba University, Nagpur
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="flex flex-col gap-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  BiovaCo Nexus is currently incubated at the{" "}
                  <span className="font-medium text-foreground">RCOEM TBI Foundation</span> — 
                  a Section 8 company established by Ramdeobaba University (formerly Shri Ramdeobaba 
                  College of Engineering and Management), Nagpur, to foster innovation, entrepreneurship 
                  and technology-driven startup growth.
                </p>
                <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                  {[
                    { label: "Infrastructure", value: "RCOEM-TATA CIIIT — state-of-the-art Center for Invention, Innovation, Incubation & Training" },
                    { label: "Mentorship Network", value: "Access to 100+ expert mentors across technology, business and domain verticals" },
                    { label: "Facility Access", value: "Advanced labs, prototyping, 3D printing, CNC machines and co-working infrastructure" },
                    { label: "Support Services", value: "Legal, financial, IPR advisory, market analysis and business development guidance" },
                  ].map((item) => (
                    <div key={item.label} className="bg-background p-5">
                      <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--green-deep)] dark:text-[color:var(--green)] font-medium">
                        {item.label}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
                <a
                  href="https://rcoemtbi.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--green-deep)] hover:text-[color:var(--navy)] dark:text-[color:var(--green)] transition-colors"
                >
                  Visit RCOEM TBI Foundation <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-[color:var(--section)]">
        <div className="container-x py-24 md:py-32">
          <FadeIn>
            <Eyebrow>Leadership</Eyebrow>
          </FadeIn>
          <FadeInStagger className="mt-12 grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto">
            {leadership.map((l) => {
              const CardContent = (
                <div className="group flex h-full flex-col items-center text-center overflow-hidden rounded-3xl border border-border bg-background p-8 md:p-10 transition-colors hover:border-[color:var(--green)] shadow-sm hover:shadow-md">
                  <div className="relative h-28 w-28 overflow-hidden rounded-full border border-border bg-muted">
                    <img
                      src={l.img}
                      alt={l.name}
                      className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
                    />
                  </div>
                  <h3 className="mt-8 font-display text-2xl md:text-3xl text-foreground">{l.name}</h3>
                  <div className="mt-4 text-[0.7rem] sm:text-xs font-semibold uppercase tracking-widest text-[color:var(--green-deep)] dark:text-[color:var(--green)] leading-relaxed max-w-[280px]">
                    {l.role}
                  </div>
                </div>
              );

              return (
                <FadeInItem key={l.name} className="h-full">
                  {l.url ? (
                    <div
                      onClick={() => setActiveUrl(l.url)}
                      className="block cursor-pointer outline-none h-full"
                    >
                      {CardContent}
                    </div>
                  ) : (
                    CardContent
                  )}
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {interns.length > 0 && (
        <section className="border-b border-border bg-[color:var(--section)]/50">
          <div className="container-x py-24 md:py-32">
            <FadeIn>
              <Eyebrow>Our Team & Interns</Eyebrow>
              <h2 className="mt-5 max-w-3xl font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
                The bright minds building the future with us.
              </h2>
            </FadeIn>
            <FadeInStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {interns.map((intern) => (
                <FadeInItem key={intern.id}>
                  <div className="group flex flex-col items-center text-center overflow-hidden rounded-3xl border border-border bg-background p-8 transition-colors hover:border-[color:var(--green)]">
                    {intern.photo_url ? (
                      <div className="relative h-20 w-20 overflow-hidden rounded-full border border-border bg-muted">
                        <img
                          src={intern.photo_url}
                          alt={intern.name}
                          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
                        />
                      </div>
                    ) : (
                      <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-border bg-[color:var(--navy)] text-2xl font-bold text-white">
                        {intern.name.charAt(0)}
                      </div>
                    )}
                    <h3 className="mt-8 font-display text-2xl text-foreground">{intern.name}</h3>
                    <div className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
                      {intern.position || "Intern"} • {intern.project_department}
                    </div>
                    {intern.college && (
                      <div className="mt-2 text-sm text-muted-foreground">{intern.college}</div>
                    )}
                    {intern.bio && (
                      <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
                        {intern.bio}
                      </p>
                    )}
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </section>
      )}

      <section>
        <div className="container-x py-24 md:py-32">
          <FadeIn>
            <Eyebrow>Future roadmap</Eyebrow>
          </FadeIn>
          <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-4">
            {roadmap.map((r) => (
              <FadeInItem key={r.y}>
                <div className="border-t border-border pt-6">
                  <div className="font-display text-3xl text-[color:var(--navy)] dark:text-foreground">
                    {r.y}
                  </div>
                  <div className="mt-3 text-sm font-medium uppercase tracking-[0.15em] text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
                    {r.t}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.d}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Modal Iframe Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-background/40 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          activeUrl ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setActiveUrl(null)}
      >
        <div
          className={`relative w-full max-w-6xl h-[85vh] sm:h-[90vh] overflow-hidden rounded-3xl border border-border/50 bg-background/30 backdrop-blur-2xl shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            activeUrl ? "translate-y-0 scale-100 opacity-100" : "translate-y-12 scale-95 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Browser Window Header */}
          <div className="absolute top-0 left-0 w-full h-14 bg-background/50 backdrop-blur-md border-b border-border/50 flex items-center justify-between px-6 z-20 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
              </div>
              <div className="ml-4 flex items-center gap-2 rounded-md bg-muted/30 px-3 py-1.5 text-xs font-mono text-foreground/80 truncate max-w-[200px] sm:max-w-md">
                {activeUrl?.replace("https://", "")}
              </div>
            </div>
            <button
              onClick={() => setActiveUrl(null)}
              className="group flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 text-foreground hover:bg-destructive hover:text-white transition-colors"
            >
              <X className="h-4 w-4 transition-transform group-hover:rotate-90 duration-300" />
            </button>
          </div>

          <div className="w-full h-full pt-14 relative bg-transparent">
            {/* Loading State */}
            <div
              className={`absolute inset-0 pt-14 flex flex-col items-center justify-center bg-transparent transition-opacity duration-500 z-10 ${
                iframeLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <Loader2 className="h-8 w-8 animate-spin text-[color:var(--green)] mb-4" />
              <div className="text-sm font-medium text-foreground animate-pulse">
                Establishing secure connection...
              </div>
            </div>

            {/* Actual Iframe */}
            {activeUrl && (
              <iframe
                src={activeUrl}
                className={`w-full h-full border-0 bg-transparent transition-opacity duration-700 ${
                  iframeLoaded ? "opacity-100" : "opacity-0"
                }`}
                title="Founder Profile"
                onLoad={() => setIframeLoaded(true)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
