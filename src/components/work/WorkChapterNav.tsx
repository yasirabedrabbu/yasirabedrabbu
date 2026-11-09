"use client";

import { useEffect, useRef, useState } from "react";

export type Chapter = { id: string; label: string };

/** Sticky horizontal chapter bar with a gliding highlight that follows the reader. */
export default function WorkChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(0);
  const [pill, setPill] = useState({ x: 0, w: 0 });
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(chapters.findIndex((c) => c.id === e.target.id));
        }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [chapters]);

  // Measure the active link so the highlight glides to it, and keep it in view on narrow bars.
  useEffect(() => {
    const ol = list.current;
    const link = ol?.querySelectorAll<HTMLElement>("a")[active];
    if (!ol || !link) return;
    // Measure the <li>: each one is `relative`, so the link's own offsetLeft is always 0.
    const item = link.parentElement!;
    const measure = () => setPill({ x: item.offsetLeft, w: item.offsetWidth });
    measure();
    // Webfonts change label widths after first paint; re-measure when they settle or the bar resizes.
    void document.fonts.ready.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(ol);
    return () => ro.disconnect();
  }, [active]);

  return (
    <nav aria-label="Case study chapters" className="sticky top-[5.25rem] z-40 flex justify-center px-4 md:top-[5.75rem]">
      <ol
        ref={list}
        className="relative flex max-w-full gap-1 overflow-x-auto rounded-full border border-line-strong/60 bg-bg-white/95 p-1.5 shadow-[0_12px_32px_-18px_rgb(31_31_36/0.3)] backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <li
          aria-hidden
          className="pointer-events-none absolute bottom-1.5 left-0 top-1.5 rounded-full bg-ink transition-[transform,width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(${pill.x}px)`, width: pill.w }}
        />
        {chapters.map((c, i) => (
          <li key={c.id} className="relative shrink-0">
            <a
              href={`#${c.id}`}
              aria-current={active === i ? "location" : undefined}
              className={`flex min-h-10 min-w-10 items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 text-sm sm:px-4 font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:-outline-offset-2 ${active === i ? "text-on-brand focus-visible:outline-accent" : "text-ink-soft hover:bg-surface hover:text-ink focus-visible:outline-brand"}`}
            >
              <span className={`font-display text-xs font-bold tabular-nums ${active === i ? "text-accent" : "text-ink-soft"}`}>{String(i + 1).padStart(2, "0")}</span>
              {/* Phones show numbers only for inactive chapters so all five fit without a
                  sideways-scrolling bar; the label stays in the accessible name. */}
              <span className={active === i ? "" : "sr-only sm:not-sr-only"}>{c.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
