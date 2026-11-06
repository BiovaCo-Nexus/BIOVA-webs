export function Logo({
  showWordmark = true,
  className = "",
  lightText = false,
}: {
  showWordmark?: boolean;
  className?: string;
  lightText?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 shrink-0 select-none ${className}`}>
      <img src="/Logo.png" alt="BiovaCo Nexus" className="h-10 sm:h-11 object-contain shrink-0" />
      {showWordmark && (
        <div className="flex flex-col leading-none whitespace-nowrap shrink-0">
          <span
            className={`font-display text-[16px] sm:text-[18px] font-semibold tracking-[0.18em] ${lightText ? "text-white" : "text-[color:var(--navy)] dark:text-foreground"}`}
          >
            BIOVACO
          </span>
          <span className="font-display text-[9px] sm:text-[10px] font-medium tracking-[0.32em] text-[color:var(--green-deep)] dark:text-[color:var(--green)] mt-1">
            NEXUS
          </span>
        </div>
      )}
    </div>
  );
}
