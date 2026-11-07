interface DiyaVisualProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function DiyaVisual({ size = "md", className = "" }: DiyaVisualProps) {
  // Responsive dimensions: compact on mobile, majestic on desktop
  const dimensions =
    size === "sm"
      ? { width: 90, height: 70 }
      : size === "lg"
        ? { width: 180, height: 140 }
        : { width: 130, height: 102 };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      aria-label="Traditional illuminated terracotta Diya"
      role="img"
    >
      <style>{`
        /* Natural sacred flame breathing motion */
        @keyframes sacredFlameBreath {
          0%, 100% {
            transform: scale(1) translateY(0);
            filter: drop-shadow(0 0 14px rgba(245, 158, 11, 0.65)) drop-shadow(0 0 28px rgba(234, 88, 12, 0.35));
          }
          50% {
            transform: scale(1.04, 0.97) translateY(-1.5px);
            filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.85)) drop-shadow(0 0 38px rgba(234, 88, 12, 0.45));
          }
        }
        .sacred-flame-group {
          transform-origin: 100px 75px;
          animation: sacredFlameBreath 2.6s ease-in-out infinite;
        }
      `}</style>

      {/* Soft warm ambient background illumination - seamless, natural golden halo */}
      <div
        className="absolute rounded-full pointer-events-none transition-all duration-700 blur-2xl opacity-40 dark:opacity-50"
        style={{
          width: dimensions.width * 1.3,
          height: dimensions.height * 1.1,
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.45) 0%, rgba(217, 119, 6, 0.18) 50%, transparent 75%)",
        }}
      />

      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 200 155"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 max-w-full h-auto"
      >
        <defs>
          {/* Authentic Mitti (Clay) Shading */}
          <linearGradient id="mittiBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9A3412" />
            <stop offset="35%" stopColor="#7C2D12" />
            <stop offset="75%" stopColor="#5B2109" />
            <stop offset="100%" stopColor="#3D1404" />
          </linearGradient>

          {/* Mitti Highlight for 3D curved bowl depth */}
          <radialGradient id="mittiHighlight" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#C2410C" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#7C2D12" stopOpacity="0" />
          </radialGradient>

          {/* Earthen Rim & Gold Filigree */}
          <linearGradient id="rimEngraving" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C2D12" />
            <stop offset="25%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="75%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#7C2D12" />
          </linearGradient>

          {/* Ghee / Mustard Oil Reservoir */}
          <linearGradient id="oilWell" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="50%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#713F12" />
          </linearGradient>

          {/* Flame Radiant Gradient */}
          <radialGradient id="flameOuterGrad" cx="50%" cy="85%" r="85%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#FEF08A" />
            <stop offset="55%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#BE123C" stopOpacity="0" />
          </radialGradient>

          {/* Flame Core Glow */}
          <linearGradient id="flameCoreGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="40%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Soft Diffuse Base Contact Shadow */}
          <radialGradient id="softGroundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#451A03" stopOpacity="0.32" />
            <stop offset="65%" stopColor="#451A03" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#451A03" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Soft Natural Contact Ground Shadow (Subtle and realistic, no harsh black) */}
        <ellipse cx="100" cy="144" rx="64" ry="8" fill="url(#softGroundShadow)" />

        {/* 2. Diya Terracotta Clay Body (Authentic Indian Handcrafted Shape) */}
        <path
          d="M 28 106 C 36 138, 164 138, 172 106 C 176 100, 165 96, 150 98 C 118 102, 82 102, 50 98 C 35 96, 24 100, 28 106 Z"
          fill="url(#mittiBody)"
          stroke="#451A03"
          strokeWidth="1.2"
        />
        <path
          d="M 28 106 C 36 138, 164 138, 172 106 C 176 100, 165 96, 150 98 C 118 102, 82 102, 50 98 C 35 96, 24 100, 28 106 Z"
          fill="url(#mittiHighlight)"
        />

        {/* 3. Traditional Clay Rim with Brass/Gold Accent Line */}
        <ellipse
          cx="100"
          cy="100"
          rx="68"
          ry="10.5"
          fill="url(#oilWell)"
          stroke="url(#rimEngraving)"
          strokeWidth="1.8"
        />

        {/* 4. Fine traditional decorative notches on rim */}
        <path
          d="M 40 101 L 43 103 M 60 104 L 62 106 M 80 105 L 81 107 M 120 105 L 119 107 M 140 104 L 138 106 M 160 101 L 157 103"
          stroke="#FDE68A"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* 5. Natural Cotton Wick (Ruhi Batti) */}
        <path
          d="M 100 95 Q 100 82, 100 74"
          stroke="#FEF3C7"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M 100 74 Q 100 77, 100 80"
          stroke="#5B2109"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* 6. Sacred Living Flame (Animated breathing with warm incandescent gradients) */}
        <g className="sacred-flame-group">
          {/* Flame Outer Soft Luminous Aura */}
          <path
            d="M 100 24 C 116 44, 118 66, 100 76 C 82 66, 84 44, 100 24 Z"
            fill="url(#flameOuterGrad)"
            opacity="0.95"
          />

          {/* Flame Golden Core */}
          <path
            d="M 100 36 C 110 49, 111 63, 100 72 C 89 63, 90 49, 100 36 Z"
            fill="url(#flameCoreGrad)"
            opacity="0.98"
          />

          {/* Incandescent Pure White Center Hotspot */}
          <ellipse cx="100" cy="56" rx="3.2" ry="7.5" fill="#FFFFFF" opacity="0.95" />
        </g>
      </svg>
    </div>
  );
}
