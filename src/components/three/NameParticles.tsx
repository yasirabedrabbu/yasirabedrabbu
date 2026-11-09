"use client";
import { useEffect, useRef } from "react";
import { animateOnScreen, cappedDpr } from "@/lib/perf";
import { stepParticles, type P } from "./particlePhysics";
import { paintName } from "./nameLayout";
export default function NameParticles({ text }: { text: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dpr = cappedDpr(2);
    let particles: P[] = [];
    const resting = document.createElement("canvas");
    let moving = false;
    const mouse = { x: -9999, y: -9999 };
    let radius = 90;
    const build = () => {
      const w = canvas.clientWidth;
      if (w === 0) return; // not laid out yet; ResizeObserver will retry
      dpr = cappedDpr(2);
      const fontSize = paintName(canvas, text, dpr);
      radius = Math.min(110, Math.max(24, fontSize * 0.65));
      mouse.x = mouse.y = -9999;
      resting.width = canvas.width;
      resting.height = canvas.height;
      resting.getContext("2d")?.drawImage(canvas, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      // Pixel indices must be integers, including at fractional mobile DPRs.
      const gap = Math.max(1, Math.round(Math.max(1.25, w / 650) * dpr));
      particles = [];
      for (let y = 0; y < canvas.height; y += gap)
        for (let x = 0; x < canvas.width; x += gap)
          if (data[(y * canvas.width + x) * 4 + 3] > 128) {
            const px = x / dpr, py = y / dpr;
            particles.push({ x: px, y: py, hx: px, hy: py, vx: 0, vy: 0 });
          }
      moving = false;
      draw();
    };
    const draw = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(201, 162, 75, 0.7)";
      if (!moving) {
        ctx.drawImage(resting, 0, 0, w, h);
        ctx.globalCompositeOperation = "source-in";
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
      } else for (const p of particles) ctx.fillRect(p.x, p.y, 1.5, 1.5);
    };
    const tick = () => {
      const pointerIn = mouse.x > -9000;
      const energy = stepParticles(particles, mouse, radius);
      const wasMoving = moving;
      moving = pointerIn || energy > 0.5;
      if (moving || wasMoving || dirty) draw();
      dirty = false;
    };
    const onMove = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      mouse.x = e.clientX - b.left;
      mouse.y = e.clientY - b.top;
    };
    const onLeave = () => ((mouse.x = -9999), (mouse.y = -9999));
    let alive = true;
    let dirty = true;
    const rebuild = () => alive && (build(), (dirty = true));
    document.fonts.ready.then(rebuild);
    document.fonts.addEventListener("loadingdone", rebuild);
    let lastW = 0;
    const ro = new ResizeObserver(() => {
      if (canvas.clientWidth !== lastW) {
        lastW = canvas.clientWidth;
        build();
      }
    });
    ro.observe(canvas);
    let stopLoop = () => {};
    if (!reduce) {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerdown", onMove);
      canvas.addEventListener("pointerup", onLeave);
      canvas.addEventListener("pointerleave", onLeave);
      canvas.addEventListener("pointercancel", onLeave);
      stopLoop = animateOnScreen(canvas, tick);
    }
    return () => {
      stopLoop();
      alive = false;
      ro.disconnect();
      document.fonts.removeEventListener("loadingdone", rebuild);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerup", onLeave);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointercancel", onLeave);
    };
  }, [text]);
  return <canvas ref={ref} aria-hidden className="block w-full font-display" />;
}
