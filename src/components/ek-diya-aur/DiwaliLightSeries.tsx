interface DiwaliLightSeriesProps {
  className?: string;
}

export function DiwaliLightSeries({ className = "" }: DiwaliLightSeriesProps) {
  // Authentic, dignified Indian Diwali warm incandescent tones (No jarring neon disco colors)
  const warmPalettes = [
    { name: "gold", fill: "#FBBF24", glow: "rgba(251, 191, 36, 0.75)" },
    { name: "amber", fill: "#F59E0B", glow: "rgba(245, 158, 11, 0.8)" },
    { name: "saffron", fill: "#EA580C", glow: "rgba(234, 88, 12, 0.8)" },
    { name: "ruby", fill: "#E11D48", glow: "rgba(225, 29, 72, 0.75)" },
    { name: "incandescent", fill: "#FEF08A", glow: "rgba(254, 240, 138, 0.85)" },
  ];

  // Mobile Single-Row Bulbs (Spread gracefully across a 360-unit viewBox, subtle 55px drape)
  const mobileBulbs = [
    { x: 30, y: 16, colorIdx: 0, delay: "0s" },
    { x: 75, y: 26, colorIdx: 1, delay: "0.4s" },
    { x: 125, y: 32, colorIdx: 2, delay: "0.8s" },
    { x: 180, y: 34, colorIdx: 3, delay: "1.2s" },
    { x: 235, y: 32, colorIdx: 0, delay: "0.3s" },
    { x: 285, y: 26, colorIdx: 4, delay: "0.7s" },
    { x: 330, y: 16, colorIdx: 1, delay: "1.1s" },
  ];

  // Desktop Left corner garland (340px canvas)
  const leftBulbs = [
    { x: 25, y: 16, colorIdx: 0, delay: "0s" },
    { x: 65, y: 34, colorIdx: 1, delay: "0.3s" },
    { x: 110, y: 46, colorIdx: 2, delay: "0.6s" },
    { x: 160, y: 52, colorIdx: 3, delay: "0.9s" },
    { x: 210, y: 48, colorIdx: 4, delay: "1.2s" },
    { x: 260, y: 38, colorIdx: 0, delay: "0.4s" },
    { x: 305, y: 22, colorIdx: 1, delay: "0.7s" },
    // Swag 2
    { x: 45, y: 64, colorIdx: 2, delay: "0.2s" },
    { x: 95, y: 88, colorIdx: 0, delay: "0.5s" },
    { x: 145, y: 96, colorIdx: 3, delay: "0.8s" },
    { x: 195, y: 88, colorIdx: 1, delay: "1.1s" },
    // Swag 3
    { x: 30, y: 92, colorIdx: 4, delay: "0.1s" },
    { x: 70, y: 124, colorIdx: 1, delay: "0.6s" },
  ];

  // Desktop Right corner garland (340px canvas)
  const rightBulbs = [
    { x: 25, y: 16, colorIdx: 2, delay: "0.2s" },
    { x: 65, y: 34, colorIdx: 0, delay: "0.5s" },
    { x: 110, y: 46, colorIdx: 3, delay: "0.8s" },
    { x: 160, y: 52, colorIdx: 1, delay: "1.1s" },
    { x: 210, y: 48, colorIdx: 4, delay: "0.3s" },
    { x: 260, y: 38, colorIdx: 2, delay: "0.7s" },
    { x: 305, y: 22, colorIdx: 0, delay: "1.0s" },
    // Swag 2
    { x: 45, y: 64, colorIdx: 1, delay: "0.4s" },
    { x: 95, y: 88, colorIdx: 4, delay: "0.7s" },
    { x: 145, y: 96, colorIdx: 0, delay: "1.0s" },
    { x: 195, y: 88, colorIdx: 3, delay: "0.2s" },
    // Swag 3
    { x: 30, y: 92, colorIdx: 0, delay: "0.9s" },
    { x: 70, y: 124, colorIdx: 2, delay: "1.2s" },
  ];

  return (
    <div
      className={`absolute inset-x-0 top-0 pointer-events-none select-none overflow-hidden z-10 ${className}`}
      aria-hidden="true"
    >
      <style>{`
        @keyframes diwaliWarmGlow {
          0%, 100% {
            opacity: 0.85;
            filter: brightness(0.96);
          }
          50% {
            opacity: 1;
            filter: brightness(1.25) drop-shadow(0 0 8px currentColor);
          }
        }
        .diwali-bulb-warm {
          animation: diwaliWarmGlow 2.4s ease-in-out infinite;
        }
      `}</style>

      {/* ============================================================ */}
      {/* 1. MOBILE FESTIVE DRAPE (< 640px)                             */}
      {/* A single, graceful top wire swag that never tangles or clutters*/}
      {/* ============================================================ */}
      <div className="block sm:hidden w-full h-[65px]">
        <svg
          viewBox="0 0 360 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Elegant single wire drape */}
          <path
            d="M 0 5 Q 180 48, 360 5"
            stroke="#1E293B"
            strokeWidth="1.2"
            strokeLinecap="round"
            className="opacity-70 dark:opacity-85"
          />

          {mobileBulbs.map((b, idx) => {
            const color = warmPalettes[b.colorIdx];
            return (
              <g
                key={`mob-bulb-${idx}`}
                transform={`translate(${b.x}, ${b.y})`}
                className="diwali-bulb-warm"
                style={{
                  color: color.fill,
                  animationDelay: b.delay,
                }}
              >
                <line x1="0" y1="-5" x2="0" y2="0" stroke="#1E293B" strokeWidth="1.2" />
                <rect x="-2" y="-1" width="4" height="3" rx="0.8" fill="#0F172A" />
                <circle cx="0" cy="6" r="8" fill={color.fill} opacity="0.35" />
                <path
                  d="M -3 1 C -4.5 4.5, -4.5 7.5, 0 11 C 4.5 7.5, 4.5 4.5, 3 1 Z"
                  fill={color.fill}
                  opacity="0.95"
                />
                <circle cx="0" cy="5" r="1.4" fill="#FFFFFF" opacity="0.95" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* ============================================================ */}
      {/* 2. TABLET/DESKTOP CORNER FESTOONS (>= 640px)                 */}
      {/* Left and Right corner framing without crowding center text    */}
      {/* ============================================================ */}
      <div className="hidden sm:block h-[160px] relative">
        {/* Left Corner */}
        <div className="absolute top-0 left-0 w-[300px] md:w-[340px] h-[150px]">
          <svg
            viewBox="0 0 340 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible"
          >
            <path
              d="M -10 -5 Q 60 55, 160 52 T 340 8"
              stroke="#1E293B"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="opacity-75 dark:opacity-85"
            />
            <path
              d="M -10 35 Q 50 100, 140 94 T 240 60"
              stroke="#1E293B"
              strokeWidth="1.3"
              strokeLinecap="round"
              className="opacity-70 dark:opacity-80"
            />
            <path
              d="M -10 65 Q 25 125, 90 125"
              stroke="#1E293B"
              strokeWidth="1.2"
              strokeLinecap="round"
              className="opacity-65 dark:opacity-75"
            />

            {leftBulbs.map((b, idx) => {
              const color = warmPalettes[b.colorIdx];
              return (
                <g
                  key={`left-bulb-${idx}`}
                  transform={`translate(${b.x}, ${b.y})`}
                  className="diwali-bulb-warm"
                  style={{
                    color: color.fill,
                    animationDelay: b.delay,
                  }}
                >
                  <line x1="0" y1="-6" x2="0" y2="0" stroke="#1E293B" strokeWidth="1.4" />
                  <rect x="-2.5" y="-1" width="5" height="3.5" rx="1" fill="#0F172A" />
                  <circle cx="0" cy="7" r="11" fill={color.fill} opacity="0.32" />
                  <path
                    d="M -4 2 C -5.5 5.5, -5.5 9, 0 13 C 5.5 9, 5.5 5.5, 4 2 Z"
                    fill={color.fill}
                    opacity="0.95"
                  />
                  <circle cx="0" cy="6" r="1.8" fill="#FFFFFF" opacity="0.95" />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right Corner */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[340px] h-[150px] scale-x-[-1]">
          <svg
            viewBox="0 0 340 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible"
          >
            <path
              d="M -10 -5 Q 60 55, 160 52 T 340 8"
              stroke="#1E293B"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="opacity-75 dark:opacity-85"
            />
            <path
              d="M -10 35 Q 50 100, 140 94 T 240 60"
              stroke="#1E293B"
              strokeWidth="1.3"
              strokeLinecap="round"
              className="opacity-70 dark:opacity-80"
            />
            <path
              d="M -10 65 Q 25 125, 90 125"
              stroke="#1E293B"
              strokeWidth="1.2"
              strokeLinecap="round"
              className="opacity-65 dark:opacity-75"
            />

            {rightBulbs.map((b, idx) => {
              const color = warmPalettes[b.colorIdx];
              return (
                <g
                  key={`right-bulb-${idx}`}
                  transform={`translate(${b.x}, ${b.y})`}
                  className="diwali-bulb-warm"
                  style={{
                    color: color.fill,
                    animationDelay: b.delay,
                  }}
                >
                  <line x1="0" y1="-6" x2="0" y2="0" stroke="#1E293B" strokeWidth="1.4" />
                  <rect x="-2.5" y="-1" width="5" height="3.5" rx="1" fill="#0F172A" />
                  <circle cx="0" cy="7" r="11" fill={color.fill} opacity="0.32" />
                  <path
                    d="M -4 2 C -5.5 5.5, -5.5 9, 0 13 C 5.5 9, 5.5 5.5, 4 2 Z"
                    fill={color.fill}
                    opacity="0.95"
                  />
                  <circle cx="0" cy="6" r="1.8" fill="#FFFFFF" opacity="0.95" />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
