"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

const once = (trigger: Element, start = "top 82%") => ({ trigger, start, once: true });

/** Case-study choreography layered on top of the shared reveal system. */
export function useWorkFx(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero title rises word by word on load.
        const title = document.querySelector<HTMLElement>(".work-title");
        if (title)
          SplitText.create(title, {
            type: "words",
            mask: "words",
            autoSplit: true,
            onSplit: (s) => gsap.from(s.words, { yPercent: 120, duration: 1.2, stagger: 0.06, ease: "expo.out", delay: 0.2 }),
          });

        // Cover frame settles from slightly inset as it scrolls into place; the image drifts inside it.
        gsap.fromTo(".work-cover", { scale: 0.92, borderRadius: "3rem" }, { scale: 1, borderRadius: "2.25rem", ease: "none", scrollTrigger: { trigger: ".work-cover", start: "top bottom", end: "top 25%", scrub: true } });
        gsap.fromTo(".work-cover img", { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: ".work-cover", start: "top bottom", end: "bottom top", scrub: true } });

        // Chapter icons: strokes draw on, accents spring in.
        gsap.utils.toArray<HTMLElement>("[data-icon]").forEach((tile) => {
          gsap.timeline({ scrollTrigger: once(tile, "top 88%") })
            .from(tile, { scale: 0.6, rotate: -12, autoAlpha: 0, duration: 0.7, ease: "back.out(1.8)" })
            .from(tile.querySelectorAll(".icon-draw"), { drawSVG: 0, duration: 1.1, stagger: 0.14, ease: "power2.inOut" }, "-=0.35")
            .from(tile.querySelectorAll(".icon-pop"), { scale: 0, transformOrigin: "50% 50%", duration: 0.5, stagger: 0.08, ease: "back.out(3)" }, "-=0.45");
        });

        // Approach timeline fills as the steps pass the middle of the screen.
        gsap.fromTo(".approach-fill", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".approach-list", start: "top 60%", end: "bottom 60%", scrub: true } });
        gsap.utils.toArray<HTMLElement>(".approach-step").forEach((step) => {
          gsap.from(step, { autoAlpha: 0, x: 40, duration: 0.8, ease: "power3.out", scrollTrigger: once(step, "top 85%") });
        });

        // Decision cards tip forward into place.
        gsap.from(".decision-card", { autoAlpha: 0, y: 70, rotateX: -22, transformPerspective: 900, transformOrigin: "50% 0%", duration: 1, stagger: 0.12, ease: "power3.out", scrollTrigger: once(document.querySelector(".decision-grid") ?? document.body) });

        // Gallery: each frame wipes open, then the screen inside parallaxes.
        gsap.utils.toArray<HTMLElement>(".gallery-frame").forEach((frame) => {
          gsap.fromTo(frame, { clipPath: "inset(8% 8% 8% 8% round 2rem)" }, { clipPath: "inset(0% 0% 0% 0% round 1.75rem)", ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "top 40%", scrub: true } });
          gsap.fromTo(frame.querySelector("img"), { yPercent: -5, scale: 1.1 }, { yPercent: 5, scale: 1.1, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } });
        });

        // Impact pair: the cards meet from either side.
        gsap.from(".impact-card", { autoAlpha: 0, x: (i) => (i ? 60 : -60), duration: 1, stagger: 0.1, ease: "expo.out", scrollTrigger: once(document.querySelector(".impact-grid") ?? document.body) });
      });
    },
    { scope: root },
  );
}
