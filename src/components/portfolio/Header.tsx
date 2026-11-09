"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { VolumeHighIcon, VolumeMute02Icon } from "@hugeicons/core-free-icons";
import { playClick, setSoundEnabled, soundEnabled, subscribeSound } from "@/lib/clickSound";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { focus, prefersReducedMotion, tapAnim } from "@/lib/ui";
import { profile } from "@/data/cv";
import { nav } from "@/data/site";
import MobileNav from "@/components/ui/MobileNav";
import ArrowUpRight from "@/components/ui/ArrowUpRight";

export default function Header() {
  const navList = useRef<HTMLUListElement>(null);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  /* Off on the server and on a first visit — sound is opt-in only. */
  const sound = useSyncExternalStore(subscribeSound, soundEnabled, () => false);

  const navTap = (e: React.MouseEvent<HTMLAnchorElement>) => {
    playClick();
    tapAnim(e.currentTarget);
  };

  // Track the section in view and glide the pill highlight to its nav link.
  useGSAP(() => {
    nav.forEach(([, h]) => {
      const el = document.querySelector(h);
      if (el) ScrollTrigger.create({ trigger: el, start: "top 45%", end: "bottom 45%", onToggle: (s) => s.isActive && setActiveNav(h) });
    });
    // Condense and lift the bar once the page leaves the very top.
    ScrollTrigger.create({ start: 48, end: "max", onToggle: (s) => setScrolled(s.isActive) });
    ScrollTrigger.create({ trigger: ".hero", start: "top top", end: "bottom 45%", onEnter: () => setActiveNav(null), onEnterBack: () => setActiveNav(null) });
  });

  // Bar drops in once on load.
  useGSAP(() => {
    if (!prefersReducedMotion()) gsap.from("header > nav", { yPercent: -140, autoAlpha: 0, duration: 1.1, delay: 0.15, ease: "expo.out" });
  });

  useGSAP(
    () => {
      const list = navList.current;
      const pill = list?.querySelector<HTMLElement>(".nav-pill");
      const link = activeNav ? list?.querySelector<HTMLElement>(`a[href="${activeNav}"]`) : null;
      if (!pill) return;
      const d = prefersReducedMotion() ? 0 : 0.55;
      if (!link) return void gsap.to(pill, { opacity: 0, duration: d * 0.5 });
      gsap.to(pill, { x: link.parentElement!.offsetLeft, width: link.offsetWidth, opacity: 1, duration: d, ease: "expo.out" });
    },
    { dependencies: [activeNav] },
  );

  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-4 transition-[padding] duration-500 ease-out motion-reduce:transition-none md:px-8 ${scrolled ? "pt-3" : "pt-5"}`}>
      <nav aria-label="Primary" className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border py-2 pl-2 pr-2 backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-500 motion-reduce:transition-none md:pl-3 ${scrolled ? "border-line bg-bg-white/90 shadow-[0_12px_32px_-16px_rgb(31_31_36/0.28)]" : "border-hair-warm bg-bg/70"}`}>
        <a href="#top" onClick={navTap} aria-label={`${profile.name}, home`} className={`nav-tap group flex items-center gap-3 rounded-full pl-1 ${focus}`}>
          <Image src="/favicon.svg" alt="" aria-hidden width={40} height={40} className="h-10 w-10 rounded-xl transition-transform duration-500 group-hover:rotate-[-8deg]" />
          <span className="font-display text-xl font-bold leading-none tracking-[-0.03em]">Yasir<span className="text-accent">.</span></span>
        </a>
        <ul ref={navList} className="relative hidden items-center gap-0.5 rounded-full text-sm font-medium text-ink-soft md:flex">
          <li aria-hidden className="nav-pill pointer-events-none absolute left-0 top-0 h-full rounded-full bg-surface opacity-0" />
          {nav.map(([l, h]) => (
            <li key={h} className="relative">
              <a href={h} onClick={navTap} aria-current={activeNav === h ? "location" : undefined} className={`nav-tap block rounded-full px-4 py-2 transition-colors duration-300 ${activeNav === h ? "text-brand" : "hover:text-ink"} ${focus}`}>{l}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={(e) => { const next = !sound; setSoundEnabled(next); if (next) playClick(); tapAnim(e.currentTarget); }} aria-pressed={sound} aria-label={sound ? "Mute interface sounds" : "Enable interface sounds"} className={`nav-tap flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface hover:text-brand ${sound ? "bg-surface text-brand" : ""} ${focus}`}>
            <HugeiconsIcon icon={sound ? VolumeHighIcon : VolumeMute02Icon} size={18} aria-hidden />
          </button>
          <a href={`mailto:${profile.email}`} onClick={navTap} className={`nav-tap group hidden items-center gap-2 rounded-full bg-brand py-2.5 pl-5 pr-4 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-hover md:inline-flex ${focus}`}>Hire me<ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" /></a>
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
