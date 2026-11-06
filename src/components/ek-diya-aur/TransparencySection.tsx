import { useState } from "react";
import { Download, CheckCircle2, Clock, Layers, ShieldCheck } from "lucide-react";
import { CampaignStats, ExpenseRecord, Language } from "@/lib/ek-diya-aur/types";
import { translations } from "@/lib/ek-diya-aur/translations";

interface TransparencySectionProps {
  currentLang: Language;
  stats: CampaignStats;
  expenses: ExpenseRecord[];
}

export function TransparencySection({ currentLang, stats, expenses }: TransparencySectionProps) {
  const t = translations[currentLang];
  const [downloading, setDownloading] = useState(false);

  const netFunds = Math.max(0, stats.totalCollected - stats.gatewayFeeDeducted);
  const remainingBalance = Math.max(0, netFunds - stats.totalDisbursed);

  const handleDownloadReport = () => {
    setDownloading(true);

    const reportContent = `=====================================================
EK DIYA AUR 2026 – TRANSPARENT FINANCIAL REPORT
BiovaCo Nexus Pvt. Ltd. (CIN: U46300ME2026PTC475352)
Official Campaign Page: https://biovaco.in/ek-diya-aur
Report Generated: ${new Date().toLocaleString()}
=====================================================

CAMPAIGN METRICS:
-----------------------------------------------------
Fundraising Target:           ₹${stats.targetAmount.toLocaleString("en-IN")}
Verified Funds Received:      ₹${stats.totalCollected.toLocaleString("en-IN")}
Gateway / Bank Fees (est 2%): ₹${stats.gatewayFeeDeducted.toLocaleString("en-IN")}
Net Campaign Funds Available: ₹${netFunds.toLocaleString("en-IN")}
Total Disbursed / Procured:   ₹${stats.totalDisbursed.toLocaleString("en-IN")}
Remaining Operational Buffer: ₹${remainingBalance.toLocaleString("en-IN")}

BENEFICIARY PROGRESS:
-----------------------------------------------------
Target Beneficiary Families:  ${stats.targetFamilies}
Screened & Verified Families: ${stats.verifiedFamiliesIdentified}
Kits Assembled:               ${stats.kitsPacked}
Families Fully Supported:     ${stats.familiesSupported}

ITEMIZED PROCUREMENT & EXPENSE LEDGER:
-----------------------------------------------------
${
  expenses.length === 0
    ? "No expenses disbursed yet. Invoices will be published here in real time as procurement takes place."
    : expenses
        .map(
          (e, idx) =>
            `${idx + 1}. [${e.date}] ${e.item}
   Category: ${e.category.toUpperCase()} | Amount: ₹${e.amount.toLocaleString("en-IN")}
   Vendor: ${e.vendor} (${e.location})
   Invoice/PO Ref: ${e.invoiceRef} | Status: ${e.status.toUpperCase()}`,
        )
        .join("\n\n")
}

FIDUCIARY CERTIFICATION:
-----------------------------------------------------
BiovaCo Nexus Pvt. Ltd. hereby certifies that 100% of verified contributions
are deployed solely for the procurement of dry ration, festive attire, sweets,
earthen diyas, and direct local transport for 20 verified families in need.
Zero administrative profit or overhead fee is retained.

Registered Office:
H. No. 72, Bhagchand Nagar, Dhamangaon Rly, MH 444709
Business Office:
1st Floor, RBU, TBI, Katol Rd, Bupeshnagar, Nagpur, MH 440013
Email: contact@biovaco.in | Website: https://biovaco.in
=====================================================`;

    const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Ek_Diya_Aur_2026_Audit_Report_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloading(false);
    }, 600);
  };

  const metricsGrid = [
    { label: t.transparency.targetFund, value: `₹${stats.targetAmount.toLocaleString("en-IN")}` },
    {
      label: t.transparency.verifiedReceived,
      value: `₹${stats.totalCollected.toLocaleString("en-IN")}`,
      highlight: true,
    },
    {
      label: t.transparency.gatewayFees,
      value: `₹${stats.gatewayFeeDeducted.toLocaleString("en-IN")}`,
    },
    { label: t.transparency.netAvailable, value: `₹${netFunds.toLocaleString("en-IN")}` },
    { label: t.transparency.disbursed, value: `₹${stats.totalDisbursed.toLocaleString("en-IN")}` },
    { label: t.transparency.balance, value: `₹${remainingBalance.toLocaleString("en-IN")}` },
    { label: t.transparency.familiesVerified, value: `${stats.verifiedFamiliesIdentified}` },
    { label: t.transparency.kitsPacked, value: `${stats.kitsPacked}` },
    { label: t.transparency.familiesDelivered, value: `${stats.familiesSupported}`, success: true },
  ];

  return (
    <section id="transparency" className="border-t border-border bg-[color:var(--surface)]">
      <div className="container-x py-20 md:py-32">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-amber-800 dark:text-amber-400">
                {t.transparency.badge}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em] text-foreground font-normal">
              {t.transparency.heading}
            </h2>
          </div>

          <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {t.transparency.subheading}
          </p>
        </div>

        {/* BiovaCo Signature gap-px 9-Metric Matrix */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border grid-cols-2 sm:grid-cols-3">
          {metricsGrid.map((m, idx) => (
            <div
              key={idx}
              className={`bg-background p-6 transition-colors hover:bg-[color:var(--section)] ${
                m.highlight ? "bg-amber-500/5 dark:bg-amber-950/10" : ""
              }`}
            >
              <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground leading-tight">
                {m.label}
              </div>
              <div
                className={`mt-4 font-display text-2xl sm:text-3xl font-normal ${
                  m.success
                    ? "text-[color:var(--green-deep)] dark:text-[color:var(--green)]"
                    : m.highlight
                      ? "text-amber-700 dark:text-amber-400"
                      : "text-foreground"
                }`}
              >
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Itemized Expense Ledger Table Card */}
        <div className="mt-8 rounded-3xl border border-border bg-background overflow-hidden shadow-2xs">
          <div className="p-6 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-amber-600" />
              <h3 className="font-display text-lg text-foreground font-medium">
                {t.transparency.ledgerTitle}
              </h3>
            </div>

            <button
              onClick={handleDownloadReport}
              disabled={downloading}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground transition-all hover:bg-[color:var(--section)] hover:border-foreground/30 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-y-0.5" />
              <span>{downloading ? "Generating..." : t.transparency.downloadReportBtn}</span>
            </button>
          </div>

          {expenses.length === 0 ? (
            <div className="p-10 sm:p-14 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--section)] text-amber-600 mb-3 border border-border">
                <Clock className="h-5 w-5" />
              </div>
              <h4 className="font-display text-base font-medium text-foreground">
                {currentLang === "hi"
                  ? "सामग्री क्रय एवं बिल सत्यापन विवरण"
                  : currentLang === "mr"
                    ? "खरेदी आणि देयके पडताळणी तपशील"
                    : "Verified Procurement & Invoices Ledger"}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                {t.transparency.emptyLedgerNotice}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border bg-[color:var(--surface)] text-muted-foreground uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4 font-medium">{t.transparency.ledgerDate}</th>
                    <th className="py-3 px-4 font-medium">{t.transparency.ledgerItem}</th>
                    <th className="py-3 px-4 font-medium">{t.transparency.ledgerCategory}</th>
                    <th className="py-3 px-4 font-medium">{t.transparency.ledgerAmount}</th>
                    <th className="py-3 px-4 font-medium">{t.transparency.ledgerVendor}</th>
                    <th className="py-3 px-4 font-medium">{t.transparency.ledgerInvoice}</th>
                    <th className="py-3 px-4 font-medium">{t.transparency.ledgerStatus}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {expenses.map((e) => (
                    <tr key={e.id} className="hover:bg-[color:var(--section)] transition-colors">
                      <td className="py-3.5 px-4 font-mono text-xs whitespace-nowrap text-muted-foreground">
                        {e.date}
                      </td>
                      <td className="py-3.5 px-4 font-normal text-foreground min-w-[200px]">
                        {e.item}
                      </td>
                      <td className="py-3.5 px-4 capitalize text-muted-foreground">
                        <span className="rounded-full bg-[color:var(--section)] px-2.5 py-0.5 text-[11px] font-medium border border-border">
                          {e.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-display font-medium text-foreground whitespace-nowrap">
                        ₹{e.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground text-xs min-w-[160px]">
                        {e.vendor}
                        <span className="block text-[11px] text-muted-foreground/70">
                          {e.location}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-amber-700 dark:text-amber-400 whitespace-nowrap">
                        {e.invoiceRef}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {e.status === "verified" ? (
                          <span className="inline-flex items-center gap-1 text-[color:var(--green-deep)] dark:text-[color:var(--green)] font-medium text-xs">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {t.transparency.statusVerified}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-600 font-medium text-xs">
                            <Clock className="h-3.5 w-3.5" />
                            {t.transparency.statusPlanned}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="p-4 bg-[color:var(--surface)] border-t border-border text-xs text-muted-foreground flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span>{t.transparency.reportDisclaimer}</span>
            <span className="font-mono text-[11px] text-muted-foreground/80">
              Audit Standard: BiovaCo Nexus Accounts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
