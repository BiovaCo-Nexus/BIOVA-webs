interface DiwaliLightSeriesProps {
  className?: string;
}

export function DiwaliLightSeries({ className = "" }: DiwaliLightSeriesProps) {
  // Palette of emotional, nostalgic Indian Diwali fairy string lights
  const bulbColors = [
    { name: "ruby", hex: "#EF4444", glow: "rgba(239, 68, 68, 0.65)" },
    { name: "gold", hex: "#F59E0B", glow: "rgba(245, 158, 11, 0.7)" },
    { name: "emerald", hex: "#10B981", glow: "rgba(16, 185, 129, 0.65)" },
    { name: "saffron", hex: "#F97316", glow: "rgba(249, 115, 22, 0.7)" },
    { name: "cyan", hex: "#06B6D4", glow: "rgba(6, 182, 212, 0.65)" },
    { name: "violet", hex: "#A855F7", glow: "rgba(168, 85, 247, 0.65)" },
    { name: "pink", hex: "#EC4899", glow: "rgba(236, 72, 153, 0.65)" },
    { name: "champagne", hex: "#FDE047", glow: "rgba(253, 224, 71, 0.7)" },
  ];

  // Left corner bulb coordinates along cascading curved light wires (relative to left 0, top 0)
  const leftBulbs = [
    // Tier 1 (Upper primary droop)
    { x: 18, y: 14, colorIdx: 0, delay: "0s" },
    { x: 52, y: 32, colorIdx: 1, delay: "0.4s" },
    { x: 92, y: 46, colorIdx: 2, delay: "0.8s" },
    { x: 136, y: 52, colorIdx: 3, delay: "1.2s" },
    { x: 182, y: 50, colorIdx: 4, delay: "0.2s" },
    { x: 228, y: 42, colorIdx: 5, delay: "0.6s" },
    { x: 272, y: 30, colorIdx: 6, delay: "1.0s" },
    { x: 315, y: 16, colorIdx: 7, delay: "1.4s" },

    // Tier 2 (Cascading hanging vertical drops / second swag)
    { x: 34, y: 58, colorIdx: 3, delay: "0.5s" },
    { x: 74, y: 84, colorIdx: 0, delay: "0.9s" },
    { x: 118, y: 98, colorIdx: 1, delay: "1.3s" },
    { x: 164, y: 92, colorIdx: 2, delay: "0.3s" },
    { x: 206, y: 76, colorIdx: 5, delay: "0.7s" },

    // Tier 3 (Corner accent drops)
    { x: 12, y: 82, colorIdx: 4, delay: "0.1s" },
    { x: 48, y: 118, colorIdx: 6, delay: "1.1s" },
    { x: 88, y: 134, colorIdx: 7, delay: "1.5s" },
  ];

  // Right corner bulb coordinates along cascading curved light wires (relative to right 0, top 0)
  const rightBulbs = [
    // Tier 1 (Upper primary droop)
    { x: 18, y: 14, colorIdx: 2, delay: "0.3s" },
    { x: 52, y: 32, colorIdx: 3, delay: "0.7s" },
    { x: 92, y: 46, colorIdx: 0, delay: "1.1s" },
    { x: 136, y: 52, colorIdx: 5, delay: "1.5s" },
    { x: 182, y: 50, colorIdx: 1, delay: "0.2s" },
    { x: 228, y: 42, colorIdx: 4, delay: "0.6s" },
    { x: 272, y: 30, colorIdx: 7, delay: "1.0s" },
    { x: 315, y: 16, colorIdx: 6, delay: "1.4s" },

    // Tier 2 (Cascading second swag)
    { x: 34, y: 58, colorIdx: 1, delay: "0.4s" },
    { x: 74, y: 84, colorIdx: 4, delay: "0.8s" },
    { x: 118, y: 98, colorIdx: 6, delay: "1.2s" },
    { x: 164, y: 92, colorIdx: 0, delay: "0.1s" },
    { x: 206, y: 76, colorIdx: 2, delay: "0.5s" },

    // Tier 3 (Corner accent drops)
    { x: 12, y: 82, colorIdx: 5, delay: "0.9s" },
    { x: 48, y: 118, colorIdx: 3, delay: "1.3s" },
    { x: 88, y: 134, colorIdx: 1, delay: "0.2s" },
  ];

  return (
    <div
      className={`absolute inset-x-0 top-0 pointer-events-none select-none overflow-hidden z-20 ${className}`}
      style={{ height: "170px" }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes bulbBreathe {
          0%, 100% {
            opacity: 0.72;
            transform: scale(0.95);
            filter: drop-shadow(0 0 4px currentColor);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
            filter: drop-shadow(0 0 10px currentColor);
          }
        }
        @keyframes subtleGarlandSway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(0.4deg); }
        }
        .diwali-bulb {
          animation: bulbBreathe 2.4s ease-in-out infinite;
          transform-origin: center top;
        }
      `}</style>

      {/* SVG Definitions for multi-color glow filters */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {bulbColors.map((b) => (
            <filter
              key={`glow-${b.name}`}
              id={`filter-${b.name}`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>
      </svg>

      {/* ============================================================ */}
      {/* LEFT CORNER FESTIVE LIGHT SERIES (Hanging Diwali Ladi)      */}
      {/* ============================================================ */}
      <div className="absolute top-0 left-0 w-[340px] sm:w-[380px] h-[170px]">
        <svg
          viewBox="0 0 340 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Main Dark Catenary Wiring (Festive Black/Brown Wire) */}
          {/* Swag 1 */}
          <path
            d="M -10 -5 Q 60 55, 160 54 T 340 10"
            stroke="#334155"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="opacity-75 dark:opacity-85"
          />
          {/* Swag 2 */}
          <path
            d="M -10 35 Q 50 105, 140 98 T 240 65"
            stroke="#1E293B"
            strokeWidth="1.4"
            strokeLinecap="round"
            className="opacity-70 dark:opacity-80"
          />
          {/* Swag 3 (Corner accent) */}
          <path
            d="M -10 65 Q 30 138, 100 138"
            stroke="#1E293B"
            strokeWidth="1.3"
            strokeLinecap="round"
            className="opacity-60 dark:opacity-75"
          />

          {/* Hanging Multi-Color Fairy Light Bulbs */}
          {leftBulbs.map((b, idx) => {
            const color = bulbColors[b.colorIdx];
            return (
              <g
                key={`left-bulb-${idx}`}
                transform={`translate(${b.x}, ${b.y})`}
                className="diwali-bulb"
                style={{
                  color: color.hex,
                  animationDelay: b.delay,
                  transformOrigin: `${b.x}px ${b.y}px`,
                }}
              >
                {/* Tiny Socket Base */}
                <rect x="-2" y="-3" width="4" height="3" fill="#1E293B" rx="0.5" />
                {/* Colored Halo Aura */}
                <circle
                  cx="0"
                  cy="5"
                  r="7"
                  fill={color.hex}
                  opacity="0.28"
                  filter={`url(#filter-${color.name})`}
                />
                {/* Glass Bulb Body (Teardrop festive diwali shape) */}
                <path
                  d="M -3 0 C -4.5 4, -4.5 7, 0 10.5 C 4.5 7, 4.5 4, 3 0 Z"
                  fill={color.hex}
                  opacity="0.95"
                />
                {/* Glowing Filament Hotspot */}
                <circle cx="0" cy="4.5" r="1.3" fill="#FFFFFF" opacity="0.9" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* ============================================================ */}
      {/* RIGHT CORNER FESTIVE LIGHT SERIES (Hanging Diwali Ladi)     */}
      {/* ============================================================ */}
      <div className="absolute top-0 right-0 w-[340px] sm:w-[380px] h-[170px] scale-x-[-1]">
        <svg
          viewBox="0 0 340 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Swag 1 */}
          <path
            d="M -10 -5 Q 60 55, 160 54 T 340 10"
            stroke="#334155"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="opacity-75 dark:opacity-85"
          />
          {/* Swag 2 */}
          <path
            d="M -10 35 Q 50 105, 140 98 T 240 65"
            stroke="#1E293B"
            strokeWidth="1.4"
            strokeLinecap="round"
            className="opacity-70 dark:opacity-80"
          />
          {/* Swag 3 */}
          <path
            d="M -10 65 Q 30 138, 100 138"
            stroke="#1E293B"
            strokeWidth="1.3"
            strokeLinecap="round"
            className="opacity-60 dark:opacity-75"
          />

          {/* Hanging Multi-Color Fairy Light Bulbs */}
          {rightBulbs.map((b, idx) => {
            const color = bulbColors[b.colorIdx];
            return (
              <g
                key={`right-bulb-${idx}`}
                transform={`translate(${b.x}, ${b.y})`}
                className="diwali-bulb"
                style={{
                  color: color.hex,
                  animationDelay: b.delay,
                  transformOrigin: `${b.x}px ${b.y}px`,
                }}
              >
                {/* Tiny Socket Base */}
                <rect x="-2" y="-3" width="4" height="3" fill="#1E293B" rx="0.5" />
                {/* Colored Halo Aura */}
                <circle
                  cx="0"
                  cy="5"
                  r="7"
                  fill={color.hex}
                  opacity="0.28"
                  filter={`url(#filter-${color.name})`}
                />
                {/* Glass Bulb Body */}
                <path
                  d="M -3 0 C -4.5 4, -4.5 7, 0 10.5 C 4.5 7, 4.5 4, 3 0 Z"
                  fill={color.hex}
                  opacity="0.95"
                />
                {/* Glowing Filament Hotspot */}
                <circle cx="0" cy="4.5" r="1.3" fill="#FFFFFF" opacity="0.9" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Subtle top edge connecting wire for wide screens (hidden on mobile) */}
      <div className="hidden lg:block absolute top-0 inset-x-[340px] h-6 overflow-hidden">
        <svg
          viewBox="0 0 800 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M 0 5 Q 200 18, 400 12 T 800 5"
            stroke="#334155"
            strokeWidth="1.2"
            strokeDasharray="4 2"
            opacity="0.35"
          />
          {/* Micro accent fairy dots along the center spanning wire */}
          {[120, 260, 400, 540, 680].map((cx, i) => {
            const colors = ["#EF4444", "#10B981", "#F59E0B", "#06B6D4", "#A855F7"];
            return (
              <circle
                key={`center-dot-${i}`}
                cx={cx}
                cy={11}
                r="2.2"
                fill={colors[i]}
                opacity="0.8"
                className="diwali-bulb"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
