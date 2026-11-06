interface DiwaliLightSeriesProps {
  className?: string;
}

export function DiwaliLightSeries({ className = "" }: DiwaliLightSeriesProps) {
  // Vibrant, authentic Indian Diwali incandescent fairy light colors
  const bulbPalettes = [
    { name: "ruby", fill: "#FF1744", glow: "rgba(255, 23, 68, 0.75)" },
    { name: "gold", fill: "#FFB300", glow: "rgba(255, 179, 0, 0.8)" },
    { name: "emerald", fill: "#00E676", glow: "rgba(0, 230, 118, 0.75)" },
    { name: "saffron", fill: "#FF6D00", glow: "rgba(255, 109, 0, 0.8)" },
    { name: "cyan", fill: "#00E5FF", glow: "rgba(0, 229, 255, 0.75)" },
    { name: "magenta", fill: "#FF1776", glow: "rgba(255, 23, 118, 0.75)" },
    { name: "violet", fill: "#D500F9", glow: "rgba(213, 0, 249, 0.75)" },
    { name: "yellow", fill: "#FFEE58", glow: "rgba(255, 238, 88, 0.85)" },
  ];

  // Coordinates placed directly along the catenary wire curves
  // Left corner garland (340px canvas)
  const leftBulbs = [
    // Swag 1 (Upper primary swoop)
    { x: 22, y: 16, colorIdx: 0, delay: "0s" },
    { x: 58, y: 34, colorIdx: 1, delay: "0.3s" },
    { x: 100, y: 48, colorIdx: 2, delay: "0.6s" },
    { x: 144, y: 54, colorIdx: 3, delay: "0.9s" },
    { x: 190, y: 52, colorIdx: 4, delay: "1.2s" },
    { x: 236, y: 44, colorIdx: 5, delay: "0.4s" },
    { x: 282, y: 32, colorIdx: 6, delay: "0.7s" },
    { x: 324, y: 18, colorIdx: 7, delay: "1.0s" },

    // Swag 2 (Lower second droop)
    { x: 38, y: 62, colorIdx: 3, delay: "0.2s" },
    { x: 80, y: 88, colorIdx: 0, delay: "0.5s" },
    { x: 124, y: 100, colorIdx: 1, delay: "0.8s" },
    { x: 170, y: 94, colorIdx: 2, delay: "1.1s" },
    { x: 212, y: 78, colorIdx: 5, delay: "1.4s" },

    // Swag 3 (Corner accent drops)
    { x: 16, y: 86, colorIdx: 4, delay: "0.1s" },
    { x: 52, y: 122, colorIdx: 6, delay: "0.6s" },
    { x: 92, y: 138, colorIdx: 7, delay: "1.3s" },
  ];

  // Right corner garland (340px canvas)
  const rightBulbs = [
    // Swag 1 (Upper primary swoop)
    { x: 22, y: 16, colorIdx: 2, delay: "0.2s" },
    { x: 58, y: 34, colorIdx: 3, delay: "0.5s" },
    { x: 100, y: 48, colorIdx: 0, delay: "0.8s" },
    { x: 144, y: 54, colorIdx: 5, delay: "1.1s" },
    { x: 190, y: 52, colorIdx: 1, delay: "0.3s" },
    { x: 236, y: 44, colorIdx: 4, delay: "0.7s" },
    { x: 282, y: 32, colorIdx: 7, delay: "1.0s" },
    { x: 324, y: 18, colorIdx: 6, delay: "1.3s" },

    // Swag 2 (Lower second droop)
    { x: 38, y: 62, colorIdx: 1, delay: "0.4s" },
    { x: 80, y: 88, colorIdx: 4, delay: "0.7s" },
    { x: 124, y: 100, colorIdx: 6, delay: "1.0s" },
    { x: 170, y: 94, colorIdx: 0, delay: "0.2s" },
    { x: 212, y: 78, colorIdx: 2, delay: "0.6s" },

    // Swag 3 (Corner accent drops)
    { x: 16, y: 86, colorIdx: 5, delay: "0.9s" },
    { x: 52, y: 122, colorIdx: 3, delay: "1.2s" },
    { x: 92, y: 138, colorIdx: 1, delay: "0.1s" },
  ];

  return (
    <div
      className={`absolute inset-x-0 top-0 pointer-events-none select-none overflow-hidden z-20 ${className}`}
      style={{ height: "185px" }}
      aria-hidden="true"
    >
      <style>{`
        /* Authentic Indian Diwali Fairy Light Breathing Animation */
        @keyframes diwaliBulbBreathe {
          0%, 100% {
            opacity: 0.78;
            filter: brightness(0.95);
          }
          50% {
            opacity: 1;
            filter: brightness(1.35) drop-shadow(0 0 8px currentColor);
          }
        }
        .diwali-bulb-node {
          animation: diwaliBulbBreathe 2.2s ease-in-out infinite;
        }
      `}</style>

      {/* ============================================================ */}
      {/* LEFT CORNER FESTIVE LIGHT SERIES (Hanging Diwali Ladi)      */}
      {/* ============================================================ */}
      <div className="absolute top-0 left-0 w-[320px] sm:w-[380px] h-[180px]">
        <svg
          viewBox="0 0 340 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          {/* Main Dark Catenary Wiring (Festive Black/Brown Wire) */}
          {/* Swag 1 */}
          <path
            d="M -10 -5 Q 60 55, 160 54 T 340 10"
            stroke="#1E293B"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="opacity-80 dark:opacity-90"
          />
          {/* Swag 2 */}
          <path
            d="M -10 35 Q 50 105, 140 98 T 240 65"
            stroke="#1E293B"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-75 dark:opacity-85"
          />
          {/* Swag 3 (Corner accent) */}
          <path
            d="M -10 65 Q 30 138, 100 138"
            stroke="#1E293B"
            strokeWidth="1.4"
            strokeLinecap="round"
            className="opacity-70 dark:opacity-80"
          />

          {/* Hanging Multi-Color Fairy Light Bulbs */}
          {leftBulbs.map((b, idx) => {
            const color = bulbPalettes[b.colorIdx];
            return (
              <g
                key={`left-bulb-${idx}`}
                transform={`translate(${b.x}, ${b.y})`}
                className="diwali-bulb-node"
                style={{
                  color: color.fill,
                  animationDelay: b.delay,
                }}
              >
                {/* 1. Wire Hook/Drop Stem */}
                <line x1="0" y1="-6" x2="0" y2="0" stroke="#1E293B" strokeWidth="1.5" />

                {/* 2. Dark Socket Base */}
                <rect x="-3" y="-1" width="6" height="4" rx="1" fill="#0F172A" />

                {/* 3. Outer Luminous Halo Glow (Large visible glow) */}
                <circle cx="0" cy="8" r="14" fill={color.fill} opacity="0.32" />
                <circle cx="0" cy="8" r="9" fill={color.fill} opacity="0.45" />

                {/* 4. Glass Bulb Body (Teardrop shape) */}
                <path
                  d="M -4.5 2 C -6.5 6.5, -6.5 10.5, 0 15 C 6.5 10.5, 6.5 6.5, 4.5 2 Z"
                  fill={color.fill}
                  opacity="0.95"
                />

                {/* 5. Incandescent White Hotspot / Filament */}
                <circle cx="0" cy="7" r="2" fill="#FFFFFF" opacity="0.95" />

                {/* 6. Gloss Specular Reflection Highlight */}
                <ellipse cx="-1.5" cy="5" rx="1" ry="2" fill="#FFFFFF" opacity="0.6" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* ============================================================ */}
      {/* RIGHT CORNER FESTIVE LIGHT SERIES (Hanging Diwali Ladi)     */}
      {/* ============================================================ */}
      <div className="absolute top-0 right-0 w-[320px] sm:w-[380px] h-[180px] scale-x-[-1]">
        <svg
          viewBox="0 0 340 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          {/* Swag 1 */}
          <path
            d="M -10 -5 Q 60 55, 160 54 T 340 10"
            stroke="#1E293B"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="opacity-80 dark:opacity-90"
          />
          {/* Swag 2 */}
          <path
            d="M -10 35 Q 50 105, 140 98 T 240 65"
            stroke="#1E293B"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-75 dark:opacity-85"
          />
          {/* Swag 3 */}
          <path
            d="M -10 65 Q 30 138, 100 138"
            stroke="#1E293B"
            strokeWidth="1.4"
            strokeLinecap="round"
            className="opacity-70 dark:opacity-80"
          />

          {/* Hanging Multi-Color Fairy Light Bulbs */}
          {rightBulbs.map((b, idx) => {
            const color = bulbPalettes[b.colorIdx];
            return (
              <g
                key={`right-bulb-${idx}`}
                transform={`translate(${b.x}, ${b.y})`}
                className="diwali-bulb-node"
                style={{
                  color: color.fill,
                  animationDelay: b.delay,
                }}
              >
                {/* 1. Wire Hook/Drop Stem */}
                <line x1="0" y1="-6" x2="0" y2="0" stroke="#1E293B" strokeWidth="1.5" />

                {/* 2. Dark Socket Base */}
                <rect x="-3" y="-1" width="6" height="4" rx="1" fill="#0F172A" />

                {/* 3. Outer Luminous Halo Glow */}
                <circle cx="0" cy="8" r="14" fill={color.fill} opacity="0.32" />
                <circle cx="0" cy="8" r="9" fill={color.fill} opacity="0.45" />

                {/* 4. Glass Bulb Body (Teardrop shape) */}
                <path
                  d="M -4.5 2 C -6.5 6.5, -6.5 10.5, 0 15 C 6.5 10.5, 6.5 6.5, 4.5 2 Z"
                  fill={color.fill}
                  opacity="0.95"
                />

                {/* 5. Incandescent White Hotspot / Filament */}
                <circle cx="0" cy="7" r="2" fill="#FFFFFF" opacity="0.95" />

                {/* 6. Gloss Specular Reflection Highlight */}
                <ellipse cx="-1.5" cy="5" rx="1" ry="2" fill="#FFFFFF" opacity="0.6" />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
