import { useId } from "react";

interface DiyaVisualProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "responsive";
}

export function DiyaVisual({ className = "", size = "responsive" }: DiyaVisualProps) {
  const uid = useId().replace(/:/g, "_");

  // Dynamic scoped IDs to prevent any duplicate gradient collisions in SVG
  const mittiBodyId = `mittiBody_${uid}`;
  const mittiHighlightId = `mittiHighlight_${uid}`;
  const rimEngravingId = `rimEngraving_${uid}`;
  const oilWellId = `oilWell_${uid}`;
  const flameOuterId = `flameOuter_${uid}`;
  const flameCoreId = `flameCore_${uid}`;
  const groundShadowId = `groundShadow_${uid}`;

  // Responsive size container classes
  const sizeClasses =
    size === "sm"
      ? "w-24 h-20"
      : size === "md"
        ? "w-36 h-28"
        : size === "lg"
          ? "w-48 h-38"
          : "w-24 h-20 sm:w-36 sm:h-28 md:w-44 md:h-36";

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${sizeClasses} ${className}`}
      aria-label="Traditional illuminated terracotta Diya"
      role="img"
    >
      <style>{`
        @keyframes sacredFlameBreath {
          0%, 100% {
            transform: scale(1) translateY(0);
            filter: drop-shadow(0 0 16px rgba(245, 158, 11, 0.75)) drop-shadow(0 0 32px rgba(234, 88, 12, 0.4));
          }
          50% {
            transform: scale(1.05, 0.96) translateY(-2px);
            filter: drop-shadow(0 0 24px rgba(245, 158, 11, 0.9)) drop-shadow(0 0 44px rgba(234, 88, 12, 0.5));
          }
        }
        .sacred-flame-motion {
          transform-origin: 100px 75px;
          animation: sacredFlameBreath 2.6s ease-in-out infinite;
        }
      `}</style>

      {/* Soft warm ambient background illumination - seamless, natural golden halo */}
      <div
        className="absolute inset-0 -m-3 rounded-full pointer-events-none blur-2xl opacity-45 dark:opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.5) 0%, rgba(217, 119, 6, 0.2) 50%, transparent 75%)",
        }}
      />

      <svg
        viewBox="0 0 200 155"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full max-w-full drop-shadow-sm"
      >
        <defs>
          {/* Authentic Mitti (Clay) Shading */}
          <linearGradient id={mittiBodyId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A0522D" />
            <stop offset="35%" stopColor="#8B3A0F" />
            <stop offset="75%" stopColor="#632607" />
            <stop offset="100%" stopColor="#3E1504" />
          </linearGradient>

          {/* Mitti Highlight for 3D curved bowl depth */}
          <radialGradient id={mittiHighlightId} cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#C2410C" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#7C2D12" stopOpacity="0" />
          </radialGradient>

          {/* Earthen Rim & Gold Filigree */}
          <linearGradient id={rimEngravingId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C2D12" />
            <stop offset="25%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="75%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#7C2D12" />
          </linearGradient>

          {/* Ghee / Mustard Oil Reservoir */}
          <linearGradient id={oilWellId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="50%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#713F12" />
          </linearGradient>

          {/* Flame Radiant Gradient */}
          <radialGradient id={flameOuterId} cx="50%" cy="85%" r="85%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#FEF08A" />
            <stop offset="55%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#BE123C" stopOpacity="0" />
          </radialGradient>

          {/* Flame Core Glow */}
          <linearGradient id={flameCoreId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="40%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Soft Diffuse Base Contact Shadow */}
          <radialGradient id={groundShadowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#451A03" stopOpacity="0.35" />
            <stop offset="65%" stopColor="#451A03" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#451A03" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Soft Natural Contact Ground Shadow */}
        <ellipse cx="100" cy="144" rx="64" ry="8" fill={`url(#${groundShadowId})`} />

        {/* 2. Diya Terracotta Clay Body (Authentic Indian Handcrafted Shape) */}
        <path
          d="M 28 106 C 36 138, 164 138, 172 106 C 176 100, 165 96, 150 98 C 118 102, 82 102, 50 98 C 35 96, 24 100, 28 106 Z"
          fill={`url(#${mittiBodyId})`}
          stroke="#451A03"
          strokeWidth="1.2"
        />
        <path
          d="M 28 106 C 36 138, 164 138, 172 106 C 176 100, 165 96, 150 98 C 118 102, 82 102, 50 98 C 35 96, 24 100, 28 106 Z"
          fill={`url(#${mittiHighlightId})`}
        />

        {/* 3. Traditional Clay Rim with Brass/Gold Accent Line */}
        <ellipse
          cx="100"
          cy="100"
          rx="68"
          ry="10.5"
          fill={`url(#${oilWellId})`}
          stroke={`url(#${rimEngravingId})`}
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
        <g className="sacred-flame-motion">
          {/* Flame Outer Soft Luminous Aura */}
          <path
            d="M 100 24 C 116 44, 118 66, 100 76 C 82 66, 84 44, 100 24 Z"
            fill={`url(#${flameOuterId})`}
            opacity="0.95"
          />

          {/* Flame Golden Core */}
          <path
            d="M 100 36 C 110 49, 111 63, 100 72 C 89 63, 90 49, 100 36 Z"
            fill={`url(#${flameCoreId})`}
            opacity="0.98"
          />

          {/* Incandescent Pure White Center Hotspot */}
          <ellipse cx="100" cy="56" rx="3.2" ry="7.5" fill="#FFFFFF" opacity="0.95" />
        </g>
      </svg>
    </div>
  );
}
