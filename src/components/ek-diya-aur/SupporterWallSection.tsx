import { Heart, MapPin, ShieldCheck, MessageSquare } from "lucide-react";
import { Language, SupporterRecord } from "@/lib/ek-diya-aur/types";
import { translations } from "@/lib/ek-diya-aur/translations";

interface SupporterWallSectionProps {
  currentLang: Language;
  supporters: SupporterRecord[];
}

export function SupporterWallSection({ currentLang, supporters }: SupporterWallSectionProps) {
  const t = translations[currentLang];

  return (
    <section id="supporters" className="border-t border-border bg-background">
      <div className="container-x py-20 md:py-32">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-amber-800 dark:text-amber-400">
                {t.wall.badge}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em] text-foreground font-normal">
              {t.wall.heading}
            </h2>
          </div>

          <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {t.wall.subheading}
          </p>
        </div>

        {/* Supporters Wall Grid / Empty State */}
        {supporters.length === 0 ? (
          <div className="mt-14 rounded-3xl border border-dashed border-border bg-[color:var(--surface)] p-12 text-center max-w-xl mx-auto">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-background border border-border text-amber-600 mb-4">
              <Heart className="h-6 w-6 fill-current text-amber-600/70" />
            </div>
            <h3 className="font-display text-lg text-foreground font-medium">
              {t.wall.emptyState}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">{t.wall.moderationNote}</p>
          </div>
        ) : (
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {supporters.map((s) => (
              <div
                key={s.id}
                className="group relative flex flex-col justify-between bg-background p-6 sm:p-7 transition-colors hover:bg-[color:var(--section)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--section)] text-foreground font-mono font-medium text-xs border border-border">
                        {s.isAnonymous ? "✦" : s.displayName.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-sm text-foreground truncate max-w-[150px]">
                        {s.isAnonymous ? t.wall.anonymousDonor : s.displayName}
                      </span>
                    </div>

                    {s.amount && (
                      <span className="font-display text-sm font-medium text-amber-700 dark:text-amber-400">
                        ₹{s.amount.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  {s.message && (
                    <div className="mt-3 text-xs leading-relaxed text-muted-foreground italic">
                      "{s.message}"
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  {s.city ? (
                    <span className="flex items-center gap-1 text-[11px]">
                      <MapPin className="h-3 w-3 text-amber-600" />
                      {s.city}
                    </span>
                  ) : (
                    <span className="text-[11px]">Diwali 2026</span>
                  )}
                  <span className="flex items-center gap-1 text-[11px]">
                    <ShieldCheck className="h-3 w-3 text-[color:var(--green-deep)] dark:text-[color:var(--green)]" />
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ethical Moderation Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground text-center">
          <MessageSquare className="h-3.5 w-3.5 text-amber-600" />
          <span>{t.wall.moderationNote}</span>
        </div>
      </div>
    </section>
  );
}
