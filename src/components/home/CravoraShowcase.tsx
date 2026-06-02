import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui-custom/Section";

export function CravoraShowcase() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--navy-deep)] text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] animate-pulse [background-image:radial-gradient(circle_at_30%_20%,var(--green),transparent_50%),radial-gradient(circle_at_80%_70%,var(--navy),transparent_60%)]"
        style={{ animationDuration: "5s" }}
      />
      <div className="container-x relative py-24 md:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow>Current Venture</Eyebrow>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-5"
          >
            <div className="mt-4 mb-2 flex justify-center">
              <img src="/Cravora_logo.png" alt="Cravora" className="h-16 md:h-28 object-contain" />
            </div>
            <p className="mt-4 font-display text-xl italic font-light text-[color:var(--green)] tracking-wide">
              Dust The Crave.
            </p>
          </motion.div>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
            Cravora is BiovaCo's flagship consumer food brand — bold flavoured dusts, makhana and
            popcorn engineered for the modern Indian palate. The first venture in a long pipeline.
          </p>

          <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row">
            <a
              href="https://dustthecrave.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--green)] px-8 py-4 text-sm font-medium text-[color:var(--navy-deep)] transition-all hover:bg-white"
            >
              Visit Cravora
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <span className="text-xs uppercase tracking-[0.2em] text-white/40">
              Est. — N° 01 Venture
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
