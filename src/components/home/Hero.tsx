import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[100dvh] flex flex-col justify-center pt-28 pb-16">
      {/* Clean, solid background */}
      <div className="container-x relative">
        <div className="max-w-3xl">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--green)]" />
              <span className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                Innovation Holding Company
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-8 lg:mt-6 font-display text-5xl md:text-7xl lg:text-[clamp(3.5rem,5.5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-balance text-foreground"
            >
              Innovating <br />
              <span className="text-[color:var(--navy)] dark:text-foreground">Food</span>,{" "}
              <span className="text-[color:var(--green-deep)] dark:text-[color:var(--green)] italic font-light">
                Agriculture
              </span>{" "}
              <br />
              &amp; Technology.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-8 lg:mt-6 max-w-xl text-lg md:text-xl lg:text-base xl:text-lg leading-relaxed text-muted-foreground"
            >
              BiovaCo Nexus builds, launches and scales the next generation of consumer brands,
              agricultural innovation and technology ventures — designed for the long term.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 lg:mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="https://dustthecrave.shop"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-[color:var(--navy-deep)]"
              >
                Explore Cravora
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <Link
                to="/innovation"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-medium text-foreground transition-all hover:border-[color:var(--green)] hover:text-[color:var(--green-deep)] dark:hover:text-[color:var(--green)]"
              >
                Our Innovation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-14 lg:mt-10 grid max-w-md grid-cols-3 gap-6 lg:gap-4 xl:gap-6"
            >
              {[
                { k: "01", v: "Active venture" },
                { k: "05", v: "Innovation areas" },
                { k: "∞", v: "Future ventures" },
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
