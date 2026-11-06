import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
  flicker: boolean;
}

interface Rocket {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  trail: { x: number; y: number; alpha: number }[];
  color: string;
  palette: string[];
}

export function DiwaliFireworksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Multi-color authentic Indian Diwali festive palettes
    const PALETTES = [
      // 1. Ruby Rose & Sunset Saffron (Warm Festive)
      ["#EF4444", "#F43F5E", "#F97316", "#FDE047", "#FFFFFF"],
      // 2. Emerald Green & Electric Cyan (Classic Diwali Sparklers)
      ["#10B981", "#06B6D4", "#34D399", "#22D3EE", "#FDE047"],
      // 3. Royal Purple, Magenta & Sunburst Gold (Grand Celebration)
      ["#A855F7", "#EC4899", "#FBBF24", "#F59E0B", "#FFFFFF"],
      // 4. Carnival Rainbow Multi-Color (Joyous Spectrum)
      ["#EF4444", "#10B981", "#3B82F6", "#F59E0B", "#A855F7", "#FDE047"],
      // 5. Pure Festive Golden Rain (Warm Mithai Gold)
      ["#F59E0B", "#FBBF24", "#FDE047", "#FEF08A", "#FFFFFF"],
    ];

    const rockets: Rocket[] = [];
    const particles: Particle[] = [];

    // Helper: spawn a naturally varied skyshot
    const launchRocket = (forcedDirection?: "left" | "right" | "center") => {
      // Launch origins around the central Diya area with organic variation
      const centerX = width * 0.5;
      const launchX = centerX + (Math.random() - 0.5) * Math.min(width * 0.45, 260);
      const launchY = Math.min(height * 0.58, 380) + (Math.random() - 0.5) * 40;

      // Natural target coordinates across the entire sky
      let targetX: number;
      if (forcedDirection === "left") {
        targetX = width * (0.12 + Math.random() * 0.28);
      } else if (forcedDirection === "right") {
        targetX = width * (0.6 + Math.random() * 0.28);
      } else if (forcedDirection === "center") {
        targetX = width * (0.35 + Math.random() * 0.3);
      } else {
        // Organic random distribution across all quadrants
        const choice = Math.random();
        if (choice < 0.36) {
          targetX = width * (0.12 + Math.random() * 0.26); // Left sky
        } else if (choice < 0.72) {
          targetX = width * (0.62 + Math.random() * 0.26); // Right sky
        } else {
          targetX = width * (0.38 + Math.random() * 0.24); // Center zenith
        }
      }

      // Varying altitudes: some bursts high near top, some mid-air
      const targetY = 50 + Math.random() * Math.min(height * 0.38, 220);

      const dx = targetX - launchX;
      const dy = targetY - launchY;
      const dist = Math.hypot(dx, dy);

      // Rocket speed
      const speed = 7 + Math.random() * 3.5;
      const vx = (dx / dist) * speed;
      const vy = (dy / dist) * speed;

      const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      const headColor = palette[Math.floor(Math.random() * palette.length)];

      rockets.push({
        x: launchX,
        y: launchY,
        targetX,
        targetY,
        vx,
        vy,
        trail: [],
        color: headColor,
        palette,
      });
    };

    // Helper: explode at apex into natural, gravity-affected sparks
    const explode = (x: number, y: number, palette: string[]) => {
      // Natural particle count (varied burst size)
      const count = 38 + Math.floor(Math.random() * 24);

      for (let i = 0; i < count; i++) {
        // Natural radial angle with slight dispersion
        const angle = Math.random() * Math.PI * 2;
        // Varied speeds for organic layered burst (some fast, some slow)
        const speed = 1.2 + Math.random() * 4.8;
        const color = palette[Math.floor(Math.random() * palette.length)];

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.4,
          vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 0.4,
          color,
          alpha: 1,
          decay: 0.012 + Math.random() * 0.014,
          size: 1.5 + Math.random() * 2.2,
          flicker: Math.random() > 0.3,
        });
      }
    };

    // Initial festive welcome launches (staggered left and right)
    launchRocket("left");
    setTimeout(() => launchRocket("right"), 600);
    setTimeout(() => launchRocket("center"), 1400);

    // Natural staggered timer for ongoing launches
    let lastLaunchTime = Date.now();
    let nextLaunchDelay = 1400; // ms between launches

    // Animation loop
    const animate = () => {
      // Soft semi-transparent clear for natural motion blur / spark trails
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      if (now - lastLaunchTime > nextLaunchDelay) {
        lastLaunchTime = now;
        // Randomize delay between 1.1s and 2.6s for completely natural organic feel
        nextLaunchDelay = 1100 + Math.random() * 1500;

        // Occasionally trigger a celebratory double-burst
        launchRocket();
        if (Math.random() < 0.28) {
          setTimeout(() => launchRocket(), 200 + Math.random() * 300);
        }
      }

      // 1. Update & Draw Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];

        // Store trail
        r.trail.push({ x: r.x, y: r.y, alpha: 0.9 });
        if (r.trail.length > 8) r.trail.shift();

        // Draw trail
        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          const trAlpha = (t / r.trail.length) * 0.6;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.3, 0, Math.PI * 2);
          ctx.fillStyle = r.color;
          ctx.globalAlpha = trAlpha;
          ctx.fill();
        }

        // Move rocket
        r.x += r.vx;
        r.y += r.vy;

        // Draw rocket glowing head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = 1;
        ctx.fill();

        // Check if rocket reached apex target
        const distRemaining = Math.hypot(r.targetX - r.x, r.targetY - r.y);
        // If close to target or moving away (past apex)
        if (distRemaining < 16 || r.y <= r.targetY) {
          explode(r.x, r.y, r.palette);
          rockets.splice(i, 1);
        }
      }

      // 2. Update & Draw Burst Particles with natural physics (gravity + air friction)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Physics: gentle gravity pulling down and air resistance
        p.vx *= 0.965; // Air drag
        p.vy *= 0.965; // Air drag
        p.vy += 0.055; // Natural gravity

        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw spark with gentle twinkle
        let currentAlpha = p.alpha;
        if (p.flicker && Math.random() > 0.4) {
          currentAlpha = Math.max(0.15, p.alpha * (0.6 + Math.random() * 0.5));
        }

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.6 + p.alpha * 0.4), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      aria-hidden="true"
    />
  );
}
