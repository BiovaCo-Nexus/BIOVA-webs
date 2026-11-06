import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowLeft, Heart, Globe } from "lucide-react";
import { Logo } from "@/components/ui-custom/Logo";
import { Language } from "@/lib/ek-diya-aur/types";
import { translations } from "@/lib/ek-diya-aur/translations";

interface CampaignHeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export function CampaignHeader({ currentLang, onLanguageChange }: CampaignHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -76;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const desktopNavLinks = [
    { id: "purpose", label: t.nav.purpose },
    { id: "goal", label: t.nav.goal },
    { id: "budget", label: t.nav.budget },
    { id: "transparency", label: t.nav.transparency },
    { id: "faq", label: t.nav.faq },
  ];

  const allNavLinks = [
    { id: "purpose", label: t.nav.purpose },
    { id: "goal", label: t.nav.goal },
    { id: "budget", label: t.nav.budget },
    { id: "contribute", label: t.nav.contribute },
    { id: "supporters", label: t.nav.supporters },
    { id: "transparency", label: t.nav.transparency },
    { id: "promise", label: t.nav.promise },
    { id: "faq", label: t.nav.faq },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:px-4 md:pt-4">
      <div
        className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-3 py-1.5 transition-all duration-500 md:px-5 md:py-2 ${
          scrolled
            ? "glass-nav border-border shadow-[0_8px_30px_-12px_rgba(2,29,66,0.15)] bg-background/85"
            : "border-border/60 bg-background/60 backdrop-blur-md"
        }`}
      >
        {/* Left: Brand Identity (strictly shrink-0, zero collision) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <Link
            to="/"
            className="group flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0 p-1"
            title="Return to BiovaCo Nexus Home"
            aria-label="Return to BiovaCo Nexus Home"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden 2xl:inline">{t.nav.backToHome}</span>
          </Link>

          <Link
            to="/ek-diya-aur"
            className="flex items-center gap-2 shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Logo showWordmark={true} className="shrink-0 scale-90 sm:scale-100 origin-left" />
            <span className="hidden min-[1380px]:inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-800 dark:text-amber-300 border border-amber-500/20 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              Diwali 2026
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav Links (Streamlined core anchors, zero collision flex) */}
        <nav className="hidden xl:flex items-center justify-center gap-0.5 lg:gap-1 px-1 flex-1 min-w-0">
          {desktopNavLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="cursor-pointer whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-[color:var(--section)] hover:text-foreground"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Language Switcher & BiovaCo CTA (strictly shrink-0) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Tri-Lingual Switcher: EN | हिंदी | मराठी (hidden on small mobile to avoid header squeeze; fully accessible in mobile drawer) */}
          <div
            className="hidden sm:flex items-center rounded-full border border-border bg-[color:var(--surface)] p-0.5 shadow-2xs shrink-0"
            role="group"
            aria-label="Language selection"
          >
            <button
              onClick={() => onLanguageChange("en")}
              className={`rounded-full px-2 py-0.5 text-[11px] font-medium transition-all ${
                currentLang === "en"
                  ? "bg-[color:var(--navy)] text-white shadow-xs font-semibold dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={currentLang === "en"}
              title="English"
            >
              EN
            </button>

            <button
              onClick={() => onLanguageChange("hi")}
              className={`rounded-full px-2 py-0.5 text-[11px] font-medium transition-all ${
                currentLang === "hi"
                  ? "bg-[color:var(--navy)] text-white shadow-xs font-semibold dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={currentLang === "hi"}
              title="हिंदी"
            >
              हिंदी
            </button>

            <button
              onClick={() => onLanguageChange("mr")}
              className={`rounded-full px-2 py-0.5 text-[11px] font-medium transition-all ${
                currentLang === "mr"
                  ? "bg-[color:var(--navy)] text-white shadow-xs font-semibold dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={currentLang === "mr"}
              title="मराठी"
            >
              मराठी
            </button>
          </div>

          {/* Quick CTA Button (BiovaCo standard primary style) */}
          <button
            onClick={() => scrollTo("contribute")}
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-[color:var(--navy)] px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-[color:var(--navy-deep)] dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)] dark:hover:bg-white cursor-pointer shadow-xs whitespace-nowrap shrink-0"
          >
            <Heart className="h-3 w-3 fill-current text-amber-300" />
            <span>{t.nav.contributeNow}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-full p-2 text-foreground hover:bg-[color:var(--section)] xl:hidden shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="fixed inset-x-4 top-20 z-50 rounded-3xl border border-border bg-background p-4 shadow-xl xl:hidden animate-fade-up max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-border">
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-amber-600" />
                Language / भाषा:
              </span>
              <div className="flex items-center gap-0.5 bg-[color:var(--section)] rounded-full p-0.5">
                <button
                  onClick={() => onLanguageChange("en")}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    currentLang === "en"
                      ? "bg-[color:var(--navy)] text-white dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)]"
                      : "text-muted-foreground"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => onLanguageChange("hi")}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    currentLang === "hi"
                      ? "bg-[color:var(--navy)] text-white dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)]"
                      : "text-muted-foreground"
                  }`}
                >
                  हिंदी
                </button>
                <button
                  onClick={() => onLanguageChange("mr")}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    currentLang === "mr"
                      ? "bg-[color:var(--navy)] text-white dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)]"
                      : "text-muted-foreground"
                  }`}
                >
                  मराठी
                </button>
              </div>
            </div>

            {allNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left rounded-xl px-4 py-2.5 text-sm font-medium text-foreground hover:bg-[color:var(--section)]"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-2 border-t border-border mt-2 space-y-2">
              <button
                onClick={() => scrollTo("contribute")}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[color:var(--navy)] px-4 py-3 text-sm font-medium text-white dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)]"
              >
                <Heart className="h-4 w-4 fill-current text-amber-300" />
                {t.nav.contributeNow}
              </button>
              <Link
                to="/"
                className="w-full flex items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-[color:var(--section)]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Return to biovaco.in
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
