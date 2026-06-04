import { Link } from "react-router-dom";
import { Logo } from "@/components/ui-custom/Logo";

const groups = [
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/innovation", label: "Innovation" },
      { to: "/careers", label: "Careers" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Ventures",
    links: [
      { to: "/cravora", label: "Cravora" },
      { to: "/innovation", label: "Innovation Pipeline" },
      { to: "/partners", label: "Future Ventures" },
    ],
  },
  {
    title: "Engage",
    links: [
      { to: "/partners", label: "Partnerships" },
      { to: "/partners", label: "Distribution" },
      { to: "/partners", label: "Investors" },
      { to: "/careers", label: "Work with us" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-[color:var(--surface)] dark:bg-[color:var(--surface)]">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              BiovaCo Nexus Pvt. Ltd. is an innovation holding company building the next generation
              of consumer brands, agricultural technology and intelligent systems.
            </p>
            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Offices
              </p>
              <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground/80">Registered:</span> H. No. 72, Bhagchand Nagar, Dhamangaon Rly, MH 444701
                </p>
                <p>
                  <span className="font-medium text-foreground/80">Business:</span> 1st Floor, RBU, TBI, Katol Rd, Bupeshnagar, Nagpur, MH 440013
                </p>
              </div>
            </div>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
                {g.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-[color:var(--green-deep)] dark:hover:text-[color:var(--green)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} BiovaCo Nexus Private Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <a href="https://biovaco.in" className="hover:text-foreground">
              biovaco.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
