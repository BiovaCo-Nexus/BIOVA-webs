import { motion } from "framer-motion";

/**
 * Animated DNA-inspired visual. Pure SVG, no stock imagery.
 * Two intertwining strands with rungs, slow rotation + subtle pulse.
 */
export function DnaHelix({ className = "" }: { className?: string }) {
  const rungs = Array.from({ length: 14 });
  return (
    <div className={`relative aspect-square ${className}`}>
      {/* Halo */}
      <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--green)_25%,transparent),transparent_60%)] blur-2xl" />
      <div className="absolute inset-[20%] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--navy)_30%,transparent),transparent_70%)] blur-3xl" />

      <motion.svg
        viewBox="0 0 400 400"
        className="relative z-10 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="strandA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--green)" />
            <stop offset="100%" stopColor="var(--green-deep)" />
          </linearGradient>
          <linearGradient id="strandB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--navy)" />
            <stop offset="100%" stopColor="var(--navy-deep)" />
          </linearGradient>
        </defs>

        {/* Strand A — sine wave */}
        <path
          d="M 200 20 C 280 80, 120 140, 200 200 S 280 320, 200 380"
          stroke="url(#strandA)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        {/* Strand B — mirrored */}
        <path
          d="M 200 20 C 120 80, 280 140, 200 200 S 120 320, 200 380"
          stroke="url(#strandB)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Rungs */}
        {rungs.map((_, i) => {
          const t = i / (rungs.length - 1);
          const y = 20 + t * 360;
          const phase = Math.sin(t * Math.PI * 3) * 70;
          const x1 = 200 + phase;
          const x2 = 200 - phase;
          return (
            <g key={i}>
              <line
                x1={x1} y1={y} x2={x2} y2={y}
                stroke="currentColor"
                strokeOpacity="0.18"
                strokeWidth="1.5"
                className="text-foreground"
              />
              <circle cx={x1} cy={y} r="3" fill="var(--green)" />
              <circle cx={x2} cy={y} r="3" fill="var(--navy)" />
            </g>
          );
        })}
      </motion.svg>

      {/* Orbiting dots */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[color:var(--green)] shadow-[0_0_20px_var(--green)]" />
        <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[color:var(--navy)] shadow-[0_0_20px_var(--navy)]" />
      </motion.div>
    </div>
  );
}
