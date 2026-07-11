import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[100dvh] flex flex-col justify-center pt-28 pb-16">
      <div className="container-x relative">
        <div className="max-w-3xl">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-5xl md:text-7xl lg:text-[clamp(3.5rem,5.5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-balance text-foreground"
            >
              Building the next era of{" "}
              <span className="text-[color:var(--green-deep)] dark:text-[color:var(--green)] italic font-light">
                Food, Agriculture
              </span>{" "}
              <br />
              & Deep Technology.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-8 lg:mt-6 max-w-xl text-lg md:text-xl lg:text-base xl:text-lg leading-relaxed text-muted-foreground"
            >
              BiovaCo Nexus is a vertically integrated holding company that
              creates, operates and scales category-defining ventures across
              consumer food, agricultural systems and applied technology —
              engineered for enduring value.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 lg:mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-[color:var(--navy-deep)]"
              >
                Discover Our Vision
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/innovation"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-medium text-foreground transition-all hover:border-[color:var(--green)] hover:text-[color:var(--green-deep)] dark:hover:text-[color:var(--green)]"
              >
                Innovation Portfolio
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-14 lg:mt-10 grid max-w-lg grid-cols-3 gap-6 lg:gap-4 xl:gap-6"
            >
              {[
                { k: "01", v: "Operating venture" },
                { k: "05", v: "Verticals of innovation" },
                { k: "∞", v: "Long-term horizon" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-3xl lg:text-2xl xl:text-3xl text-foreground">{s.k}</div>
                  <div className="mt-1 text-xs lg:text-[10px] xl:text-xs uppercase tracking-[0.15em] text-muted-foreground leading-tight">
                    {s.v}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
