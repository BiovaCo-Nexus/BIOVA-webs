import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui-custom/Section";

const nodes = [
  {
    code: "01",
    title: "Food Science & Product Development",
    desc: "Proprietary flavour systems, ingredient R&D and modern consumer formats designed for market leadership.",
  },
  {
    code: "02",
    title: "Agricultural Infrastructure",
    desc: "End-to-end supply chain resilience — from soil health and precision farming to post-harvest processing and distribution.",
  },
  {
    code: "03",
    title: "Biomedical & Consumer Applications",
    desc: "Purpose-built hardware and software platforms for health monitoring, diagnostic automation and consumer wellness.",
  },
  {
    code: "04",
    title: "Artificial Intelligence",
    desc: "Production-grade AI deployed across food safety, agricultural yield optimisation, retail intelligence and predictive analytics.",
  },
  {
    code: "05",
    title: "Venture Incubation",
    desc: "A disciplined pipeline for identifying, validating and scaling high-conviction ventures from concept to commercialisation.",
  },
] as const;

export function Ecosystem() {
  return (
    <section className="bg-[color:var(--section)] border-y border-border">
      <div className="container-x py-24 md:py-32">
        <div className="max-w-3xl">
          <Eyebrow>Innovation Verticals</Eyebrow>
          <h2 className="mt-5 font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
            Five core verticals. One integrated operating platform.
          </h2>
        </div>

        <div className="mt-16 relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2" />
          <div className="space-y-12">
            {nodes.map((n, i) => (
              <motion.div
                key={n.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`relative grid items-start gap-6 pl-12 md:grid-cols-2 md:gap-16 md:pl-0 ${
                  i % 2 === 0 ? "" : "md:[direction:rtl]"
                }`}
              >
                <div
                  className={`md:[direction:ltr] ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}
                >
                  <span className="font-display text-xs tracking-[0.3em] text-muted-foreground">
                    {n.code}
                  </span>
                  <h3 className="mt-2 font-display text-2xl text-foreground md:text-3xl">
                    {n.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{n.desc}</p>
                </div>
                <div className="hidden md:block" />
                <div className="absolute left-4 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-[color:var(--green)] ring-4 ring-[color:var(--section)] md:left-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
