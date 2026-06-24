"use client";

import { useEffect, useRef } from "react";

const SPACING = 28;
const DOT_RADIUS = 2;
const GLOW_RADIUS = 220;
const MAX_OPACITY = 0.7;
const SPRING = 0.015;
const FRICTION = 0.92;
const ALPHA_LERP = 0.07;

interface Dot {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  alpha: number;
}

export function CursorDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mouse = { x: -9999, y: -9999 };
    let lastMove = 0;
    let dots: Dot[] = [];
    let raf = 0;
    let dpr = 1;

    function getThemeColor() {
      const t = getComputedStyle(document.documentElement)
        .getPropertyValue("--on-surface")
        .trim();
      return t === "#ffffff" || t === "#fff"
        ? { r: 255, g: 255, b: 255 }
        : { r: 28, g: 25, b: 23 };
    }

    function resize() {
      dpr = window.devicePixelRatio || 1;
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      canvas!.width = ww * dpr;
      canvas!.height = wh * dpr;
      canvas!.style.width = ww + "px";
      canvas!.style.height = wh + "px";
      dots = [];
      for (let y = SPACING; y < wh; y += SPACING) {
        for (let x = SPACING + (Math.round(y / SPACING) % 2) * (SPACING / 2); x < ww; x += SPACING) {
          dots.push({
            ox: x,
            oy: y,
            x,
            y,
            vx: 0,
            vy: 0,
            phase: Math.random() * Math.PI * 2,
            alpha: 0,
          });
        }
      }
    }

    resize();

    function animate(now: number) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.save();
      ctx!.scale(dpr, dpr);

      const c = getThemeColor();
      const stopped = now - lastMove > 150;

      for (const d of dots) {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / GLOW_RADIUS);

        if (proximity > 0) {
          if (!stopped) {
            // gentle local drift only while cursor moves
            d.vx += Math.sin(now / 1500 + d.phase) * 0.015 * proximity;
            d.vy += Math.cos(now / 1300 + d.phase * 1.3) * 0.015 * proximity;
            d.vx *= FRICTION;
            d.vy *= FRICTION;
            d.x += d.vx;
            d.y += d.vy;
          }

          // fade in
          d.alpha += (proximity * MAX_OPACITY - d.alpha) * ALPHA_LERP;
        } else {
          // spring back to origin
          d.vx += (d.ox - d.x) * SPRING;
          d.vy += (d.oy - d.y) * SPRING;
          d.vx *= FRICTION;
          d.vy *= FRICTION;
          d.x += d.vx;
          d.y += d.vy;

          // fade out
          d.alpha += (0 - d.alpha) * ALPHA_LERP;
        }

        if (d.alpha > 0.01) {
          ctx!.beginPath();
          ctx!.arc(d.x, d.y, DOT_RADIUS, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${c.r},${c.g},${c.b},${d.alpha})`;
          ctx!.fill();
        }
      }

      ctx!.restore();
      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => { mouse = { x: e.clientX, y: e.clientY }; lastMove = performance.now(); };
    const onLeave = () => { mouse = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
    />
  );
}
