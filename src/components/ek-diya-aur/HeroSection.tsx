import { ArrowRight, ArrowUpRight, Heart, ShieldCheck } from "lucide-react";
import { DiyaVisual } from "./DiyaVisual";
import { DiwaliLightSeries } from "./DiwaliLightSeries";
import { DiwaliFireworksCanvas } from "./DiwaliFireworksCanvas";
import { CampaignCountdown } from "./CampaignCountdown";
import { Language } from "@/lib/ek-diya-aur/types";
import { translations } from "@/lib/ek-diya-aur/translations";

interface HeroSectionProps {
  currentLang: Language;
  onContributeClick: () => void;
  onExploreClick: () => void;
}

export function HeroSection({ currentLang, onContributeClick, onExploreClick }: HeroSectionProps) {
  const t = translations[currentLang];

  return (
    <section className="relative overflow-hidden pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24 border-b border-border bg-background">
      {/* Festive Warm Diwali Light Garland (Mobile single drape, desktop corner festoons) */}
      <DiwaliLightSeries />

      {/* Subtle Atmospheric Diwali Sky Fireworks (Ambient, non-intrusive) */}
      <DiwaliFireworksCanvas />

      {/* Clean, refined warm golden ambient glow (No multi-color clashing blobs) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-x relative z-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          
          {/* 1. Initiative Eyebrow Badge (Compact & elegant) */}
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.16em] text-amber-900 dark:text-amber-300">
              {t.hero.initiativeBadge}
            </span>
          </div>

          {/* 2. Responsive Traditional Terracotta Diya */}
          <div className="my-2 sm:my-3">
            {/* Mobile: compact size; Tablet/Desktop: full majesty */}
            <div className="block sm:hidden">
              <DiyaVisual size="sm" />
            </div>
            <div className="hidden sm:block">
              <DiyaVisual size="md" />
            </div>
          </div>

          {/* 3. Campaign Title & Primary Tagline */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground leading-[1.1]">
            {t.hero.campaignName}
          </h1>

          <p className="mt-2 text-base sm:text-xl md:text-2xl text-amber-700 dark:text-amber-400 max-w-2xl font-normal tracking-tight">
            "{t.hero.tagline}"
          </p>

          {/* 4. Punchy Core Invitation (Ensures CTAs are immediately above the fold on all mobile screens) */}
          <p className="mt-3 max-w-xl text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
            {t.hero.bodyP5}
          </p>

          {/* 5. PRIMARY & SECONDARY ACTION BUTTONS (100% visible on every phone dimension above fold) */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-sm sm:max-w-none sm:w-auto">
            {/* Primary Action Button */}
            <button
              onClick={onContributeClick}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-[color:var(--navy)] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[color:var(--navy-deep)] hover:shadow-lg dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)] dark:hover:bg-white cursor-pointer active:scale-[0.98]"
              aria-label="Be a Part of the Celebration"
            >
              <Heart className="h-4 w-4 fill-current text-amber-300 shrink-0" />
              <span>{t.hero.primaryCta}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 shrink-0" />
            </button>

            {/* Secondary Action Button */}
            <button
              onClick={onExploreClick}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/90 px-6 py-3.5 text-sm font-medium text-foreground transition-all hover:border-[color:var(--navy)] hover:bg-[color:var(--section)] cursor-pointer active:scale-[0.98]"
              aria-label="See Where Your Contribution Goes"
            >
              <span>{t.hero.secondaryCta}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-muted-foreground shrink-0" />
            </button>
          </div>

          {/* 6. Heartfelt Emotional Narrative Card (Placed right below buttons for deep emotional connection) */}
          <div className="mt-10 sm:mt-12 max-w-2xl w-full rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 sm:p-7 text-left shadow-2xs">
            <div className="space-y-3 text-sm sm:text-base leading-relaxed text-foreground/80 font-sans">
              <p className="font-medium text-foreground">{t.hero.bodyP1}</p>
              <p>{t.hero.bodyP2}</p>
              <p>{t.hero.bodyP3}</p>
              <p className="font-medium text-foreground">{t.hero.bodyP4}</p>
            </div>
          </div>

          {/* 7. Official Campaign Live Window & Real-time Countdown Timer */}
          <div className="mt-8 sm:mt-10 w-full">
            <CampaignCountdown currentLang={currentLang} variant="hero" />
          </div>

          {/* 8. Signature BiovaCo Verified Metrics Row */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border max-w-2xl mx-auto w-full text-center">
            <div>
              <div className="font-display text-2xl sm:text-3xl text-foreground font-normal">
                {currentLang === "hi" ? "प्रत्यक्ष पहल" : currentLang === "mr" ? "थेट उपक्रम" : "Direct Field"}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {t.hero.metaLocation}
              </div>
            </div>

            <div>
              <div className="font-display text-2xl sm:text-3xl text-foreground font-normal">
                {currentLang === "hi" ? "20 परिवार" : currentLang === "mr" ? "20 कुटुंबे" : "20 Families"}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {t.hero.metaTarget}
              </div>
            </div>

            <div>
              <div className="font-display text-2xl sm:text-3xl text-foreground font-normal text-amber-700 dark:text-amber-400">
                ₹45,000
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {t.hero.metaGoal}
              </div>
            </div>
          </div>

          {/* 9. Direct Pass-Through Verification Guarantee */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground text-center px-4">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[color:var(--green-deep)] dark:text-[color:var(--green)]" />
            <span>
              {currentLang === "hi"
                ? "100% प्रत्यक्ष सहयोग · शून्य प्रशासनिक कटौती · प्रमाणित रसीदें व सार्वजनिक ऑडिट"
                : currentLang === "mr"
                  ? "100% थेट सहकार्य · शून्य प्रशासकीय कपात · प्रमाणित पावत्या व पारदर्शक हिशोब"
                  : "100% Direct Pass-Through · Zero Administrative Cuts · Audited Invoices"}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
