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
}

interface Rocket {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
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

    // Warm, sophisticated Indian Diwali festive palettes (No harsh neon colors)
    const PALETTES = [
      ["#F59E0B", "#FBBF24", "#FDE047", "#FEF08A", "#FFFFFF"], // Sacred Gold & Warm Mithai
      ["#EA580C", "#F97316", "#FBBF24", "#FDE047", "#FFFFFF"], // Marigold Saffron
      ["#BE123C", "#E11D48", "#FB7185", "#FBBF24", "#FFFFFF"], // Festive Crimson & Rose
    ];

    const rockets: Rocket[] = [];
    const particles: Particle[] = [];

    // Helper: spawn a gentle atmospheric skyshot high in the upper sky
    const launchRocket = () => {
      // Launch from outer flanks rather than straight through text
      const isLeft = Math.random() < 0.5;
      const launchX = isLeft
        ? width * (0.05 + Math.random() * 0.18)
        : width * (0.77 + Math.random() * 0.18);
      const launchY = Math.min(height * 0.7, 340);

      // Target in high upper sky
      const targetX = launchX + (Math.random() - 0.5) * 60;
      const targetY = 30 + Math.random() * 90;

      const dx = targetX - launchX;
      const dy = targetY - launchY;
      const dist = Math.hypot(dx, dy);

      const speed = 4.5 + Math.random() * 2;
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
        color: headColor,
        palette,
      });
    };

    // Soft, delicate bursts with gentle gravity
    const explode = (x: number, y: number, palette: string[]) => {
      const count = 22 + Math.floor(Math.random() * 14);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.8 + Math.random() * 2.6;
        const color = palette[Math.floor(Math.random() * palette.length)];

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 0.75,
          decay: 0.014 + Math.random() * 0.012,
          size: 1.2 + Math.random() * 1.5,
        });
      }
    };

    // Initial gentle celebration
    setTimeout(() => launchRocket(), 800);
    setTimeout(() => launchRocket(), 2200);

    let lastLaunchTime = Date.now();
    let nextLaunchDelay = 3200; // Dignified pacing (every 3-5 seconds)

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      if (now - lastLaunchTime > nextLaunchDelay) {
        lastLaunchTime = now;
        nextLaunchDelay = 3000 + Math.random() * 3000;
        launchRocket();
      }

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;

        // Draw subtle glowing head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();

        if (r.y <= r.targetY) {
          explode(r.x, r.y, r.palette);
          rockets.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.vy += 0.035; // gentle natural gravity

        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
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
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
