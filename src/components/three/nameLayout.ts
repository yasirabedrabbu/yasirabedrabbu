/** Fit a name to the available width, stacking words on small canvases. */
export function paintName(canvas: HTMLCanvasElement, text: string, dpr: number) {
  const ctx = canvas.getContext("2d")!;
  const w = canvas.clientWidth;
  const family = getComputedStyle(canvas).fontFamily;
  ctx.font = `700 100px ${family}`;
  const words = text.trim().split(/\s+/);
  let lines = [text];
  if (w < 560 && words.length > 1) {
    // Choose the word break that balances both lines; never split a word.
    let best = Infinity;
    for (let i = 1; i < words.length; i++) {
      const pair = [words.slice(0, i).join(" "), words.slice(i).join(" ")];
      const width = Math.max(...pair.map(line => ctx.measureText(line).width));
      if (width < best) { best = width; lines = pair; }
    }
  }
  const widest = Math.max(1, ...lines.map(line => ctx.measureText(line).width));
  const fontSize = Math.min(100 * w * 0.92 / widest, 220);
  ctx.font = `700 ${fontSize}px ${family}`;
  const metrics = lines.map(line => ctx.measureText(line));
  const ascent = Math.max(...metrics.map(m => m.actualBoundingBoxAscent));
  const descent = Math.max(...metrics.map(m => m.actualBoundingBoxDescent));
  const lineHeight = fontSize * 1.05;
  const padding = fontSize * 0.4;
  const h = Math.ceil(ascent + descent + (lines.length - 1) * lineHeight + padding);
  canvas.style.height = `${h}px`;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = "#fff";
  ctx.font = `700 ${fontSize}px ${family}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  lines.forEach((line, i) => ctx.fillText(line, w / 2, padding / 2 + ascent + i * lineHeight));
  return fontSize;
}
