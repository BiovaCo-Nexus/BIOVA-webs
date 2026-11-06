import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle2, Printer, ShieldCheck } from "lucide-react";
import { Language } from "@/lib/ek-diya-aur/types";
import { translations } from "@/lib/ek-diya-aur/translations";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiptData: {
    id: string;
    amount: number;
    name: string;
    date: string;
    paymentId?: string;
  } | null;
  currentLang: Language;
}

export function ReceiptModal({ isOpen, onClose, receiptData, currentLang }: ReceiptModalProps) {
  const t = translations[currentLang];
  if (!receiptData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-md max-h-[92vh] overflow-y-auto p-6 sm:p-8 rounded-3xl border border-border bg-background shadow-2xl">
        <DialogHeader className="text-center sm:text-center pb-4 border-b border-border">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--section)] text-[color:var(--green-deep)] dark:text-[color:var(--green)] mb-3 border border-border">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <DialogTitle className="font-display text-2xl font-normal text-foreground">
            {t.receipt.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-1">
            {t.receipt.subtitle}
          </DialogDescription>
        </DialogHeader>

        {/* Printable Receipt Body */}
        <div id="printable-receipt" className="py-4 space-y-4 text-xs sm:text-sm">
          <div className="rounded-2xl border border-border bg-[color:var(--surface)] p-5 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <span className="text-muted-foreground">{t.receipt.reference}</span>
              <span className="font-mono font-medium text-foreground text-xs">
                {receiptData.id}
              </span>
            </div>

            {receiptData.paymentId && (
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-muted-foreground">Gateway Payment ID</span>
                <span className="font-mono font-semibold text-[color:var(--green-deep)] dark:text-[color:var(--green)] text-xs">
                  {receiptData.paymentId}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center pb-2 border-b border-border">
              <span className="text-muted-foreground">{t.receipt.donor}</span>
              <span className="font-medium text-foreground">{receiptData.name}</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-border">
              <span className="text-muted-foreground">{t.receipt.date}</span>
              <span className="text-foreground">{receiptData.date}</span>
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="font-medium text-foreground">{t.receipt.amount}</span>
              <span className="font-display text-2xl font-normal text-foreground">
                ₹{receiptData.amount.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
            <ShieldCheck className="h-4 w-4" />
            <span>{t.receipt.status}</span>
          </div>

          <p className="text-[11px] leading-relaxed text-muted-foreground text-center bg-[color:var(--section)] p-3 rounded-xl border border-border">
            {t.receipt.taxNote}
          </p>
        </div>

        {/* Actions matching BiovaCo buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <button
            onClick={handlePrint}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background hover:bg-[color:var(--section)] py-3 text-xs font-medium text-foreground transition-all cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>{t.receipt.print}</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--navy)] hover:bg-[color:var(--navy-deep)] dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)] py-3 text-xs font-medium text-white transition-all cursor-pointer"
          >
            <span>{t.receipt.close}</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
