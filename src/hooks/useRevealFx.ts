"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

const onEnter = (trigger: Element) => ({ trigger, start: "top 86%", once: true });

/**
 * Shared scroll-reveal vocabulary for every page:
 * - `main h2`              masked line-by-line rise
 * - `[data-reveal-media]`  image wipes open from the bottom edge
 * - `[data-stagger]`       direct children cascade in
 * - `[data-fade]`          single element eases up
 */
export function useRevealFx(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("main h2:not(.sr-only)").forEach((h) => {
          // autoSplit re-splits on resize / font load; returning the tween lets it be rebuilt.
          SplitText.create(h, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, { yPercent: 115, duration: 1.1, stagger: 0.09, ease: "expo.out", scrollTrigger: onEnter(h) }),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-media]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut", clearProps: "clipPath", scrollTrigger: onEnter(el) },
          );
          const img = el.querySelector("img");
          if (img) gsap.from(img, { scale: 1.18, duration: 1.6, ease: "expo.out", clearProps: "scale", scrollTrigger: onEnter(el) });
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((list) => {
          gsap.from(list.children, { autoAlpha: 0, y: 26, duration: 0.8, stagger: 0.08, ease: "power3.out", scrollTrigger: onEnter(list) });
        });

        gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
          gsap.from(el, { autoAlpha: 0, y: 24, duration: 0.9, ease: "power3.out", scrollTrigger: onEnter(el) });
        });
      });
    },
    { scope: root },
  );
}
