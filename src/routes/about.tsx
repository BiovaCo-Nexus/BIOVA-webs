import { useState, useEffect } from "react";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Eyebrow } from "@/components/ui-custom/Section";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui-custom/FadeIn";
import { supabase } from "@/lib/supabase";

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
  { name: "Nakul Mundhada", role: "Co-Founder", img: "/Nakul_Photo.jpeg", url: "https://nakulmundhada.live" },
  { name: "Richa Rajan", role: "Founder", img: "/Richa_photo.jpg", url: "https://richarajan.info" },
];

export default function About() {
  const [interns, setInterns] = useState<any[]>([]);

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
            <Eyebrow>Leadership</Eyebrow>
          </FadeIn>
          <FadeInStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((l) => {
              const CardContent = (
                <div className="group overflow-hidden rounded-3xl border border-border bg-background p-8 transition-colors hover:border-[color:var(--green)]">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border border-border bg-muted">
                    <img
                      src={l.img}
                      alt={l.name}
                      className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
                    />
                  </div>
                  <h3 className="mt-8 font-display text-2xl text-foreground">{l.name}</h3>
                  <div className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
                    {l.role}
                  </div>
                </div>
              );

              return (
                <FadeInItem key={l.name}>
                  {l.url ? (
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block outline-none"
                    >
                      {CardContent}
                    </a>
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
                  <div className="group overflow-hidden rounded-3xl border border-border bg-background p-8 transition-colors hover:border-[color:var(--green)]">
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
    </>
  );
}
