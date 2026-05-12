import { useRef, useEffect } from "react";

function createParticle(canvasWidth, canvasHeight) {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    size: Math.random() * 2.5 + 0.5,
    hue: Math.random() * 30 + 35,
    saturation: 70 + Math.random() * 20,
    lightness: 50 + Math.random() * 20,
    alpha: Math.random() * 0.5 + 0.2,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.01 + Math.random() * 0.02,
  };
}

function updateParticle(p, canvasWidth, canvasHeight, mouseX, mouseY) {
  p.x += p.vx;
  p.y += p.vy;

  const dx = mouseX - p.x;
  const dy = mouseY - p.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 180) {
    const angle = Math.atan2(dy, dx);
    const force = (180 - dist) / 180;
    p.vx -= Math.cos(angle) * 0.02 * force;
    p.vy -= Math.sin(angle) * 0.02 * force;
  }

  if (p.x < 0 || p.x > canvasWidth) p.vx *= -1;
  if (p.y < 0 || p.y > canvasHeight) p.vy *= -1;

  p.vx *= 0.98;
  p.vy *= 0.98;
  p.pulse += p.pulseSpeed;
}

function drawParticle(p, ctx) {
  const pulseAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${pulseAlpha})`;
  ctx.fill();
}

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const observerRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReduced) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let isVisible = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      const count = isMobile ? 30 : 80;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const { x: mx, y: my } = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        updateParticle(particles[i], canvas.width, canvas.height, mx, my);
        drawParticle(particles[i], ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(45, 80%, 55%, ${0.12 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 },
    );

    resize();
    init();
    animate();
    observerRef.current.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      observerRef.current?.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background:
          "linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #111111 100%)",
      }}
    />
  );
};

export default InteractiveBackground;
