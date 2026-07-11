import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui-custom/Section";
import { Sprout, Cpu, FlaskConical } from "lucide-react";

const pillars = [
  {
    icon: FlaskConical,
    title: "Consumer Food",
    desc: "Developing proprietary flavour systems, modern food formats and direct-to-consumer brands that redefine category expectations.",
  },
  {
    icon: Sprout,
    title: "Agricultural Systems",
    desc: "Applying precision agronomy, post-harvest technology and supply-chain intelligence to build resilient, data-driven agricultural infrastructure.",
  },
  {
    icon: Cpu,
    title: "Deep Technology",
    desc: "Converging applied AI, biomedical engineering and consumer-grade hardware to deliver solutions at the intersection of science and scale.",
  },
] as const;

export function WhoWeAre() {
  return (
    <section className="border-t border-border bg-background">
      <div className="container-x py-24 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <Eyebrow>Our Thesis</Eyebrow>
            <h2 className="mt-5 font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
              A holding company built for{" "}
              <span className="italic font-light text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
                enduring
              </span>{" "}
              impact.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative flex flex-col bg-background p-8 transition-colors hover:bg-[color:var(--section)]"
              >
                <p.icon
                  className="h-7 w-7 text-[color:var(--green-deep)] dark:text-[color:var(--green)]"
                  strokeWidth={1.4}
                />
                <h3 className="mt-12 font-display text-2xl text-foreground">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-8 h-px w-8 bg-[color:var(--green)] transition-all group-hover:w-16" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
