import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, Mail, ShieldCheck } from "lucide-react";
import { Language } from "@/lib/ek-diya-aur/types";
import { translations } from "@/lib/ek-diya-aur/translations";

interface FaqLegalSectionProps {
  currentLang: Language;
}

export function FaqLegalSection({ currentLang }: FaqLegalSectionProps) {
  const t = translations[currentLang];
  const items = t.faq.items;

  const faqList = [
    { id: "item-1", q: items.q1, a: items.a1 },
    { id: "item-2", q: items.q2, a: items.a2 },
    { id: "item-3", q: items.q3, a: items.a3 },
    { id: "item-4", q: items.q4, a: items.a4 },
    { id: "item-5", q: items.q5, a: items.a5 },
    { id: "item-6", q: items.q6, a: items.a6 },
    { id: "item-7", q: items.q7, a: items.a7 },
    { id: "item-8", q: items.q8, a: items.a8 },
    { id: "item-9", q: items.q9, a: items.a9 },
    { id: "item-10", q: items.q10, a: items.a10 },
    { id: "item-11", q: items.q11, a: items.a11 },
    { id: "item-12", q: items.q12, a: items.a12 },
    { id: "item-13", q: items.q13, a: items.a13 },
  ];

  return (
    <section id="faq" className="border-t border-border bg-[color:var(--surface)]">
      <div className="container-x py-20 md:py-32">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-amber-800 dark:text-amber-400">
                {t.faq.badge}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em] text-foreground font-normal">
              {t.faq.heading}
            </h2>

            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {t.faq.subheading}
            </p>
          </div>

          {/* Statutory Tax Notice */}
          <div className="mt-10 rounded-2xl border border-border bg-background p-5 flex items-start gap-3 text-xs sm:text-sm text-muted-foreground">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-medium text-foreground block mb-0.5">
                Statutory Tax Clarification:
              </span>
              {t.faq.taxAlert}
            </div>
          </div>

          {/* Accordion List */}
          <div className="mt-10">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqList.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="rounded-2xl border border-border bg-background px-5 sm:px-6 py-0.5 transition-colors data-[state=open]:border-foreground/30"
                >
                  <AccordionTrigger className="text-left font-display text-sm sm:text-base font-normal text-foreground hover:no-underline py-4">
                    <span className="flex items-start gap-3">
                      <span className="text-xs font-mono text-muted-foreground mt-0.5">
                        {String(index + 1).padStart(2, "0")}.
                      </span>
                      <span>{faq.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm leading-relaxed text-muted-foreground pb-5 pt-1 pl-7">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Grievance & Nodal Officer */}
          <div className="mt-10 rounded-3xl border border-border bg-background p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-display text-base text-foreground font-medium flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[color:var(--green-deep)] dark:text-[color:var(--green)]" />
                Nodal Grievance Redressal
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Inquiries regarding fund escrow, itemized invoices, or receipt duplicates.
              </p>
            </div>

            <a
              href="mailto:contact@biovaco.in?subject=Ek%20Diya%20Aur%20Inquiry"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-5 py-2.5 text-xs font-medium text-white transition-all hover:bg-[color:var(--navy-deep)] dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)] whitespace-nowrap shrink-0 shadow-xs"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>contact@biovaco.in</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
