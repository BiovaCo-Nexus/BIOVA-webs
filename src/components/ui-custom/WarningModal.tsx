import { FileText } from "lucide-react";

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WarningModal({ isOpen, onClose }: WarningModalProps) {
  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-2xl transition-all duration-300 ${
          isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--navy)] text-white">
            <FileText className="h-5 w-5" />
          </div>
          <h3 className="font-display text-xl text-foreground">Action Required</h3>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Please read the Terms & Conditions and Compensation Policy first by clicking the link before proceeding.
        </p>
        <button
          onClick={onClose}
          className="w-full inline-flex items-center justify-center rounded-full bg-[color:var(--navy)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[color:var(--navy-deep)] dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)] dark:hover:bg-white"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
