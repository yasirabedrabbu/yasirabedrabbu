export type P = { x: number; y: number; hx: number; hy: number; vx: number; vy: number };

/** One spring step: repel from the pointer, ease back home. Returns total motion left (0 = settled). */
export function stepParticles(particles: P[], mouse: { x: number; y: number }, r: number) {
  let energy = 0;
  for (const p of particles) {
    const dx = p.x - mouse.x, dy = p.y - mouse.y;
    const d2 = dx * dx + dy * dy;
    if (d2 < r * r) {
      const d = Math.sqrt(d2) || 1;
      const f = (r - d) / r;
      p.vx += (dx / d) * f * 6;
      p.vy += (dy / d) * f * 6;
    }
    p.vx += (p.hx - p.x) * 0.06;
    p.vy += (p.hy - p.y) * 0.06;
    p.vx *= 0.82;
    p.vy *= 0.82;
    p.x += p.vx;
    p.y += p.vy;
    energy += Math.abs(p.vx) + Math.abs(p.vy) + Math.abs(p.hx - p.x) + Math.abs(p.hy - p.y);
  }
  return energy;
}
