interface DiyaVisualProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function DiyaVisual({ size = "md", className = "" }: DiyaVisualProps) {
  const dimensions =
    size === "sm"
      ? { width: 100, height: 80 }
      : size === "lg"
        ? { width: 240, height: 195 }
        : { width: 160, height: 130 };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      aria-label="Festive illuminated clay Diya"
      role="img"
    >
      <style>{`
        /* Rising flame phuljhadi embers */
        @keyframes flameSpark1 {
          0% { transform: translate(0, 0); opacity: 0.9; }
          50% { transform: translate(-8px, -24px); opacity: 0.7; }
          100% { transform: translate(-14px, -48px); opacity: 0; }
        }
        @keyframes flameSpark2 {
          0% { transform: translate(0, 0); opacity: 0.9; }
          50% { transform: translate(8px, -28px); opacity: 0.6; }
          100% { transform: translate(16px, -52px); opacity: 0; }
        }
        @keyframes flameSpark3 {
          0% { transform: translate(0, 0); opacity: 0.8; }
          50% { transform: translate(-4px, -20px); opacity: 0.5; }
          100% { transform: translate(-6px, -42px); opacity: 0; }
        }
        @keyframes glintTwinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.85); }
          50% { opacity: 0.95; transform: scale(1.2); }
        }
      `}</style>

      {/* Ambient background glow */}
      <div
        className="absolute rounded-full blur-2xl opacity-45 pointer-events-none transition-all duration-700"
        style={{
          width: dimensions.width * 1.25,
          height: dimensions.height * 1.1,
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(239, 68, 68, 0.15) 45%, rgba(180, 83, 9, 0) 80%)",
        }}
      />

      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="-20 -25 240 195"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 max-w-full h-auto filter drop-shadow-[0_6px_20px_rgba(180,83,9,0.22)]"
      >
        <defs>
          {/* Flame Gradient */}
          <radialGradient id="flameCore" cx="50%" cy="80%" r="80%" fx="50%" fy="80%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FEF08A" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0.85" />
          </radialGradient>

          {/* Diya Clay Gradient */}
          <linearGradient id="clayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A16207" />
            <stop offset="40%" stopColor="#78350F" />
            <stop offset="85%" stopColor="#451A03" />
            <stop offset="100%" stopColor="#291102" />
          </linearGradient>

          {/* Diya Rim Gold Accent */}
          <linearGradient id="rimGold" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Oil Surface Gradient */}
          <linearGradient id="oilSurface" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
        </defs>

        {/* Outer Aura / Flame Halo */}
        <circle
          cx="100"
          cy="50"
          r="44"
          fill="url(#flameCore)"
          opacity="0.25"
          className="animate-pulse"
        />

        {/* Diya Base Shadow */}
        <ellipse cx="100" cy="148" rx="68" ry="10" fill="#000000" opacity="0.35" />

        {/* Diya Body (Traditional curved earthen mitti vessel) */}
        <path
          d="M 22 105 C 32 145, 168 145, 178 105 C 182 98, 172 95, 160 97 C 120 102, 80 102, 40 97 C 28 95, 18 98, 22 105 Z"
          fill="url(#clayGradient)"
          stroke="#502409"
          strokeWidth="1.5"
        />

        {/* Diya Rim (Festive engraved earthen rim) */}
        <ellipse
          cx="100"
          cy="99"
          rx="72"
          ry="11"
          fill="url(#oilSurface)"
          stroke="url(#rimGold)"
          strokeWidth="2"
        />

        {/* Diya Spout Highlight */}
        <path d="M 94 92 C 97 90, 103 90, 106 92 L 102 96 L 98 96 Z" fill="#451A03" />

        {/* Cotton Wick */}
        <path
          d="M 100 93 Q 100 78, 100 68"
          stroke="#FEF3C7"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 100 68 Q 100 72, 100 75"
          stroke="#451A03"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Flickering Flame Layer 1 (Outer Aura) */}
        <path d="M 100 24 C 114 42, 118 64, 100 75 C 82 64, 86 42, 100 24 Z" fill="url(#flameCore)">
          <animate
            attributeName="d"
            dur="1.8s"
            repeatCount="indefinite"
            values="
              M 100 24 C 114 42, 118 64, 100 75 C 82 64, 86 42, 100 24 Z;
              M 100 22 C 116 41, 115 65, 100 75 C 84 63, 85 41, 100 22 Z;
              M 99 26 C 112 43, 119 63, 100 75 C 83 65, 87 43, 99 26 Z;
              M 100 24 C 114 42, 118 64, 100 75 C 82 64, 86 42, 100 24 Z
            "
          />
        </path>

        {/* Flame Inner Golden Core */}
        <path
          d="M 100 38 C 107 48, 109 62, 100 69 C 91 62, 93 48, 100 38 Z"
          fill="#FEF08A"
          opacity="0.95"
        >
          <animate
            attributeName="d"
            dur="1.4s"
            repeatCount="indefinite"
            values="
              M 100 38 C 107 48, 109 62, 100 69 C 91 62, 93 48, 100 38 Z;
              M 100 36 C 108 47, 107 63, 100 69 C 92 61, 94 47, 100 36 Z;
              M 100 38 C 107 48, 109 62, 100 69 C 91 62, 93 48, 100 38 Z
            "
          />
        </path>

        {/* White Center Hotspot */}
        <ellipse cx="100" cy="56" rx="3.5" ry="7" fill="#FFFFFF" opacity="0.9" />

        {/* Gentle Multi-Color Rising Sparkles / Embers from Diya Flame */}
        <circle
          cx="100"
          cy="20"
          r="1.6"
          fill="#FDE047"
          style={{ animation: "flameSpark1 2.4s ease-out infinite" }}
        />
        <circle
          cx="102"
          cy="22"
          r="1.4"
          fill="#F43F5E"
          style={{ animation: "flameSpark2 2.8s ease-out infinite 0.7s" }}
        />
        <circle
          cx="98"
          cy="24"
          r="1.3"
          fill="#10B981"
          style={{ animation: "flameSpark3 3.1s ease-out infinite 1.4s" }}
        />

        {/* Diamond Glints around the flame */}
        <path
          d="M 130 30 Q 131 33 134 34 Q 131 35 130 38 Q 129 35 126 34 Q 129 33 130 30 Z"
          fill="#FDE047"
          style={{
            transformOrigin: "130px 34px",
            animation: "glintTwinkle 2.5s ease-in-out infinite",
          }}
        />
        <path
          d="M 70 34 Q 71 37 74 38 Q 71 39 70 42 Q 69 39 66 38 Q 69 37 70 34 Z"
          fill="#F43F5E"
          style={{
            transformOrigin: "70px 38px",
            animation: "glintTwinkle 2.8s ease-in-out infinite 1s",
          }}
        />
      </svg>
    </div>
  );
}
