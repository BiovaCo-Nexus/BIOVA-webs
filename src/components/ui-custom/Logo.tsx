export function Logo({ showWordmark = true, className = "", lightText = false }: { showWordmark?: boolean; className?: string; lightText?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/Logo.png"
        alt="BiovaCo Nexus"
        className="h-9 object-contain"
      />
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className={`font-display text-[15px] font-semibold tracking-[0.18em] ${lightText ? "text-white" : "text-[color:var(--navy)] dark:text-foreground"}`}>
            BIOVACO
          </span>
          <span className="font-display text-[9px] font-medium tracking-[0.32em] text-[color:var(--green-deep)] dark:text-[color:var(--green)] mt-0.5">
            NEXUS
          </span>
        </div>
      )}
    </div>
  );
}
