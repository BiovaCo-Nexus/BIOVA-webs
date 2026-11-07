import { useState, useEffect } from "react";
import { Heart, ArrowRight } from "lucide-react";
import { Language } from "@/lib/ek-diya-aur/types";
import { translations } from "@/lib/ek-diya-aur/translations";
import { isPaymentPhaseClosed } from "./CampaignCountdown";

interface StickyMobileContributionBarProps {
  currentLang: Language;
  onContributeClick: () => void;
}

export function StickyMobileContributionBar({
  currentLang,
  onContributeClick,
}: StickyMobileContributionBarProps) {
  const [visible, setVisible] = useState(false);
  const t = translations[currentLang];
  const isClosed = isPaymentPhaseClosed();

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero (~350px)
      const scrollY = window.scrollY;
      const contributeEl = document.getElementById("contribute");
      
      let isOverForm = false;
      if (contributeEl) {
        const rect = contributeEl.getBoundingClientRect();
        // Hide while user is actively looking at the form itself
        if (rect.top <= window.innerHeight * 0.7 && rect.bottom >= window.innerHeight * 0.2) {
          isOverForm = true;
        }
      }

      setVisible(scrollY > 350 && !isOverForm);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isClosed || !visible) return null;

  return (
    <div className="fixed bottom-3 inset-x-3 z-40 sm:hidden animate-fade-up">
      <div className="flex items-center justify-between gap-3 rounded-full border border-border/80 bg-background/95 p-2 pr-2.5 shadow-[0_10px_30px_-5px_rgba(2,29,66,0.25)] backdrop-blur-md">
        <div className="flex items-center gap-2 pl-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-semibold text-foreground leading-tight">
              Ek Diya Aur
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight">
              {currentLang === "hi" ? "सहयोग मात्र ₹5 से" : currentLang === "mr" ? "सहकार्य फक्त ₹5 पासून" : "From ₹5 onwards"}
            </span>
          </div>
        </div>

        <button
          onClick={onContributeClick}
          className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--navy)] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[color:var(--navy-deep)] dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)] active:scale-95 transition-all cursor-pointer"
        >
          <Heart className="h-3.5 w-3.5 fill-current text-amber-300" />
          <span>{t.hero.primaryCta}</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
