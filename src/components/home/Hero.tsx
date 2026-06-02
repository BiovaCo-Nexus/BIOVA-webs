import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { DnaHelix } from "@/components/ui-custom/DnaHelix";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[100dvh] flex flex-col justify-center pt-28 pb-16">
      {/* subtle animated background orbs */}
      <div
        className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[color:var(--green)]/5 blur-[120px] animate-pulse"
        style={{ animationDuration: "4s" }}
      />
      <div
        className="absolute top-1/2 -left-40 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-[color:var(--navy)]/5 blur-[120px] animate-pulse"
        style={{ animationDuration: "6s", animationDelay: "2s" }}
      />
      <div className="container-x relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--green)] shadow-[0_0_10px_var(--green)]" />
              <span className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                Innovation Holding Company
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-8 font-display text-5xl font-medium leading-[0.95] tracking-[-0.04em] text-balance text-foreground md:text-7xl lg:text-[clamp(4rem,8vw,7.5rem)]"
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
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              BiovaCo Nexus builds, launches and scales the next generation of consumer brands,
              agricultural innovation and technology ventures — designed for the long term.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-3"
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
              className="mt-14 grid max-w-md grid-cols-3 gap-6"
            >
              {[
                { k: "01", v: "Active venture" },
                { k: "05", v: "Innovation areas" },
                { k: "∞", v: "Future ventures" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-3xl text-foreground">{s.k}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {s.v}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <DnaHelix className="w-full text-[color:var(--navy)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
