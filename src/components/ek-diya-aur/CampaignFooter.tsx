import { Link } from "react-router-dom";
import { Logo } from "@/components/ui-custom/Logo";
import { Language } from "@/lib/ek-diya-aur/types";
import { translations } from "@/lib/ek-diya-aur/translations";

interface CampaignFooterProps {
  currentLang: Language;
}

export function CampaignFooter({ currentLang }: CampaignFooterProps) {
  const t = translations[currentLang];

  const groups = [
    {
      title: "Initiative",
      links: [
        { href: "#purpose", label: t.nav.purpose },
        { href: "#goal", label: t.nav.goal },
        { href: "#budget", label: t.nav.budget },
        { href: "#contribute", label: t.nav.contribute },
        { href: "#transparency", label: t.nav.transparency },
      ],
    },
    {
      title: "Governance",
      links: [
        { href: "#promise", label: t.nav.promise },
        { href: "#faq", label: t.nav.faq },
        { to: "/privacy", label: "Privacy Policy" },
        { to: "/terms", label: "Terms of Use" },
        { to: "/contact", label: "Corporate Office" },
      ],
    },
    {
      title: "BiovaCo Nexus",
      links: [
        { to: "/", label: "Corporate Home" },
        { to: "/about", label: "About BiovaCo" },
        { to: "/cravora", label: "Cravora Brand" },
        { to: "/innovation", label: "Innovation Portfolio" },
        { to: "/news", label: "News & Disclosures" },
      ],
    },
  ];

  const handleScroll = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -76;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border bg-[color:var(--surface)] dark:bg-[color:var(--surface)]">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-800 dark:text-amber-300 border border-amber-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              EK DIYA AUR – Diwali 2026
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t.footer.legalNote}
            </p>
            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Offices</p>
              <div className="mt-2 space-y-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground/80">Registered:</span> H. No. 72,
                  Bhagchand Nagar, Dhamangaon Rly, MH 444709
                </p>
                <p>
                  <span className="font-medium text-foreground/80">Business:</span> 1st Floor, RBU,
                  TBI, Katol Rd, Bupeshnagar, Nagpur, MH 440013
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
                    {l.to ? (
                      <Link
                        to={l.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-[color:var(--navy)] dark:hover:text-[color:var(--green)]"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => l.href && handleScroll(l.href)}
                        className="text-sm text-muted-foreground transition-colors hover:text-[color:var(--navy)] dark:hover:text-[color:var(--green)] cursor-pointer text-left"
                      >
                        {l.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <div className="flex flex-col gap-1">
            <p>© {new Date().getFullYear()} BiovaCo Nexus Private Limited. All rights reserved.</p>
            <p className="opacity-80">CIN: U46300ME2026PTC475352 · {t.footer.rights}</p>
          </div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link to="/contact" className="hover:text-foreground">
              Contact
            </Link>
            <Link to="/" className="hover:text-foreground">
              biovaco.in
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
