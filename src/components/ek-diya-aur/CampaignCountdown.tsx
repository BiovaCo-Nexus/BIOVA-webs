import { useState, useEffect } from "react";
import { Clock, Calendar, Heart } from "lucide-react";
import { Language } from "@/lib/ek-diya-aur/types";

// Official Campaign Timing
// Start: 7 November 2026, 12:00 AM IST
// Payment Cutoff: 13 November 2026, 12:00 PM (Noon) IST (Payment closes strictly)
// Page Auto-Hide/Expiry: 13 December 2026, 12:00 PM IST (Page disappears automatically)
export const CAMPAIGN_START_DATE = new Date("2026-11-07T00:00:00+05:30");
export const CAMPAIGN_PAYMENT_DEADLINE = new Date("2026-11-13T12:00:00+05:30");
export const CAMPAIGN_PAGE_EXPIRY = new Date("2026-12-13T12:00:00+05:30");

export const isPaymentPhaseClosed = () =>
  new Date().getTime() >= CAMPAIGN_PAYMENT_DEADLINE.getTime();

export const isCampaignPageExpired = () =>
  new Date().getTime() >= CAMPAIGN_PAGE_EXPIRY.getTime();

interface CampaignCountdownProps {
  currentLang: Language;
  variant?: "hero" | "compact" | "card";
  className?: string;
}

export function CampaignCountdown({
  currentLang,
  variant = "hero",
  className = "",
}: CampaignCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isLive: boolean;
    isEnded: boolean;
    percentElapsed: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: true,
    isEnded: false,
    percentElapsed: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const startMs = CAMPAIGN_START_DATE.getTime();
      const endMs = CAMPAIGN_PAYMENT_DEADLINE.getTime();

      const totalDuration = endMs - startMs;
      const elapsed = Math.max(0, now - startMs);
      const percent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

      if (now < startMs) {
        // Before campaign starts
        const diff = startMs - now;
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
          isLive: false,
          isEnded: false,
          percentElapsed: 0,
        });
      } else if (now >= endMs) {
        // After payment cutoff (13 Nov 12:00 PM)
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isLive: false,
          isEnded: true,
          percentElapsed: 100,
        });
      } else {
        // Campaign payment phase actively running until 13 Nov 12:00 PM
        const diff = endMs - now;
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
          isLive: true,
          isEnded: false,
          percentElapsed: percent,
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const labels = {
    en: {
      liveStatus: "Contribution Phase Live",
      upcomingStatus: "Campaign Starts Soon",
      endedStatus: "Contribution Phase Concluded (13 Nov 12:00 PM)",
      days: "Days",
      hours: "Hours",
      minutes: "Mins",
      seconds: "Secs",
      startsOn: "Started: 7 Nov 2026, 12:00 AM",
      endsOn: "Payment Closes: 13 Nov 2026, 12:00 PM",
      timeRemaining: "Time Remaining to Contribute",
      everyContributionCounts: "Even ₹5 lights a diya in a home. Join our collective celebration.",
      concludedNotice: "Contribution window concluded on 13 Nov 12:00 PM. Verified distribution in progress.",
    },
    hi: {
      liveStatus: "सहयोग प्रक्रिया सक्रिय है",
      upcomingStatus: "अभियान जल्द शुरू होगा",
      endedStatus: "सहयोग प्रक्रिया पूर्ण (13 नवंबर दोपहर 12:00 बजे)",
      days: "दिन",
      hours: "घंटे",
      minutes: "मिनट",
      seconds: "सेकंड",
      startsOn: "आरंभ: 7 नवंबर 2026, 12:00 AM",
      endsOn: "अंतिम समय: 13 नवंबर 2026, 12:00 PM",
      timeRemaining: "सहयोग के लिए शेष समय",
      everyContributionCounts: "सिर्फ ₹5 भी किसी के घर में एक दिया जला सकता है। सहयोग अवश्य करें।",
      concludedNotice: "सहयोग प्रक्रिया 13 नवंबर दोपहर 12:00 बजे समाप्त हो चुकी है। वितरण प्रक्रिया जारी है।",
    },
    mr: {
      liveStatus: "सहकार्य प्रक्रिया थेट सुरू आहे",
      upcomingStatus: "मोहीम लवकरच सुरू होईल",
      endedStatus: "सहकार्य मुदत समाप्त (13 नोव्हेंबर दुपारी 12:00 वा)",
      days: "दिवस",
      hours: "तास",
      minutes: "मिनिटे",
      seconds: "सेकंद",
      startsOn: "सुरुवात: 7 नोव्हेंबर 2026, 12:00 AM",
      endsOn: "मुदत: 13 नोव्हेंबर 2026, 12:00 PM",
      timeRemaining: "सहकार्यासाठी शिल्लक वेळ",
      everyContributionCounts: "अगदी ₹5 देखील कुणाच्या घरात दिवा लावू शकतो. नक्की सहभागी व्हा.",
      concludedNotice: "सहकार्य प्रक्रिया 13 नोव्हेंबर दुपारी 12:00 वाजता संपली आहे. वितरण प्रक्रियेचे काम सुरू आहे.",
    },
  }[currentLang];

  if (variant === "compact") {
    if (timeLeft.isEnded) {
      return (
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3.5 py-1 text-xs text-muted-foreground ${className}`}
        >
          <span className="h-2 w-2 rounded-full bg-amber-600/70" />
          <span className="font-medium">{labels.endedStatus}</span>
        </div>
      );
    }

    return (
      <div
        className={`inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs text-foreground ${className}`}
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="font-medium text-amber-900 dark:text-amber-200">
          {labels.endsOn}:
        </span>
        <span className="font-mono font-semibold text-[color:var(--navy)] dark:text-amber-300">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s left
        </span>
      </div>
    );
  }

  if (timeLeft.isEnded) {
    return (
      <div
        className={`w-full max-w-2xl mx-auto rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-background/90 p-6 sm:p-8 text-center shadow-sm backdrop-blur-sm ${className}`}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-3">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span>{labels.endedStatus}</span>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground">
          {labels.concludedNotice}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {currentLang === "hi"
            ? "13 नवंबर दोपहर 12:00 बजे से आगे कोई नया भुगतान स्वीकार नहीं किया जा रहा है। सभी 20 परिवारों के लिए राशन, कपड़े व मिठाइयों का वितरण पारदर्शी रूप से संपन्न हो रहा है।"
            : currentLang === "mr"
              ? "13 नोव्हेंबर दुपारी 12:00 नंतर कोणतेही नवीन सहकार्य स्वीकारले जात नाही. 20 कुटुंबांसाठी किट वितरण पारदर्शक पद्धतीने सुरू आहे."
              : "No further contributions can be accepted past 13 November 12:00 PM IST. Kits distribution and verified audit reporting are actively taking place."}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-2xl mx-auto rounded-3xl border border-border/70 bg-gradient-to-b from-card/90 to-background/80 p-5 sm:p-6 shadow-[0_10px_35px_-15px_rgba(245,158,11,0.15)] backdrop-blur-sm ${className}`}
    >
      {/* Top Banner: Status + Dates */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pb-4 border-b border-border/60">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-700 dark:text-emerald-400">
            {labels.liveStatus}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
          <span className="font-medium text-foreground">
            {labels.startsOn} — {labels.endsOn}
          </span>
        </div>
      </div>

      {/* Countdown Digits Matrix */}
      <div className="pt-5 pb-4">
        <div className="text-center mb-3 flex items-center justify-center gap-1.5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          <Clock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
          <span>{labels.timeRemaining}</span>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto">
          {/* Days */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-[color:var(--surface)] p-2.5 sm:p-3 shadow-2xs">
            <span className="font-display text-2xl sm:text-3xl font-bold text-[color:var(--navy)] dark:text-amber-300">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground mt-0.5">
              {labels.days}
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-[color:var(--surface)] p-2.5 sm:p-3 shadow-2xs">
            <span className="font-display text-2xl sm:text-3xl font-bold text-[color:var(--navy)] dark:text-amber-300">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground mt-0.5">
              {labels.hours}
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-[color:var(--surface)] p-2.5 sm:p-3 shadow-2xs">
            <span className="font-display text-2xl sm:text-3xl font-bold text-[color:var(--navy)] dark:text-amber-300">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground mt-0.5">
              {labels.minutes}
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-[color:var(--surface)] p-2.5 sm:p-3 shadow-2xs">
            <span className="font-display text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400 animate-pulse">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground mt-0.5">
              {labels.seconds}
            </span>
          </div>
        </div>
      </div>

      {/* Encouraging Micro-Giving Callout */}
      <div className="mt-3 pt-3 border-t border-border/50 text-center">
        <p className="text-xs text-amber-800 dark:text-amber-300/90 font-medium flex items-center justify-center gap-1.5">
          <Heart className="h-3.5 w-3.5 text-amber-600 fill-amber-500/20 shrink-0" />
          <span>{labels.everyContributionCounts}</span>
        </p>
      </div>
    </div>
  );
}

