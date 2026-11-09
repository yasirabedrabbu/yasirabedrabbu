"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Location01Icon } from "@hugeicons/core-free-icons";
import { gsap } from "@/lib/gsap";
import { focus, prefersReducedMotion } from "@/lib/ui";
import { profile, experience } from "@/data/cv";
import ArrowUpRight from "@/components/ui/ArrowUpRight";
import HeroPortrait from "@/components/ui/HeroPortrait";
import HeroProof from "@/components/ui/HeroProof";

export default function Hero() {
  const current = experience[0];

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="hero relative flex min-h-[100svh] flex-col overflow-hidden px-4 pb-8 pt-28 md:px-8 md:pt-32"
      onPointerMove={(e) => {
        if (prefersReducedMotion()) return;
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        gsap.to(".hero-photo-wrap", { x: x * 18, y: y * 18, rotate: x * 1.5, duration: 1.2, ease: "power3.out" });
      }}
    >

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col">
        {/* Meta row: status on the left, location on the right. */}
        <div className="hero-fade flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5 text-sm">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-bg-white/80 px-4 py-2 font-medium text-ink backdrop-blur">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            Open to remote roles worldwide
          </p>
          <p className="inline-flex items-center gap-2 font-medium text-ink-soft">
            <HugeiconsIcon icon={Location01Icon} size={16} aria-hidden className="text-brand" />
            {profile.location}
          </p>
        </div>

        <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16 lg:py-12">
          <div>
            {/* Lines are `nowrap` so the mask reveal stays a single row. "simple, trusted"
                measures 5.85em in Cabinet Grotesk Bold, so each clamp keeps it inside
                its column from 320px phones up to the widest desktop grid. */}
            <h1
              id="hero-title"
              aria-label={`${profile.name}, ${profile.role}: designing simple, trusted experiences.`}
              className="font-display text-[clamp(2.75rem,12.5vw,3.5rem)] font-bold leading-[0.92] tracking-[-0.045em] md:text-[clamp(3.5rem,7vw,7.25rem)]"
            >
              {["Designing", "simple, trusted", "experiences."].map((line, i) => (
                <span key={line} aria-hidden className="hero-line block overflow-hidden whitespace-nowrap pb-[0.08em]">
                  <span className={`block ${i === 1 ? "italic text-brand" : ""}`}>{line}</span>
                </span>
              ))}
            </h1>
            <p className="hero-fade mt-8 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
              I turn complex SaaS, healthcare and fintech workflows into products people understand and trust — from research to developer-ready handoff.
            </p>
            <div className="hero-fade mt-10 flex flex-wrap items-center gap-3">
              <a href="#work" className={`group inline-flex items-center gap-3 rounded-full bg-brand px-7 py-4 font-semibold text-on-brand transition-colors hover:bg-brand-hover ${focus}`}>
                View case studies
                <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45" />
              </a>
              <a href="#contact" className={`inline-flex items-center gap-3 rounded-full border border-line-strong bg-bg-white/70 px-7 py-4 font-semibold text-ink backdrop-blur transition-colors hover:border-ink hover:bg-ink hover:text-on-brand ${focus}`}>
                Let&apos;s talk
              </a>
            </div>
          </div>

          <div className="hero-photo-wrap relative mx-auto w-full max-w-sm lg:max-w-md">
            <HeroPortrait />
            {/* Current-role caption, overlapping the card edge on wider screens. */}
            <div className="hero-fade absolute -bottom-5 left-4 right-4 flex items-center gap-3 rounded-2xl border border-line bg-bg-white/95 p-3 shadow-[0_18px_40px_-20px_rgb(31_31_36/0.35)] backdrop-blur lg:-left-8 lg:right-auto">
              <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand font-display text-sm font-bold text-on-brand">{current.company.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>
              <span className="min-w-0 pr-2">
                <span className="block truncate text-sm font-semibold text-ink">{current.role}</span>
                <span className="block truncate text-xs text-ink-soft">{current.company} · {current.period}</span>
              </span>
            </div>
          </div>
        </div>

        <HeroProof />
      </div>
    </section>
  );
}
