import Image from "next/image";
import Link from "next/link";
import { focus } from "@/lib/ui";
import { profile } from "@/data/cv";
import ArrowUpRight from "@/components/ui/ArrowUpRight";

/** Floating pill header for the case-study pages, matching the homepage bar. */
export default function WorkNav() {
  return (
    <header id="top" className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:px-8 md:pt-4">
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-line bg-bg-white/85 py-2 pl-2 pr-2 shadow-[0_12px_32px_-16px_rgb(31_31_36/0.28)] backdrop-blur-xl md:pl-3">
        <Link href="/" aria-label={`${profile.name}, home`} className={`group flex items-center gap-3 rounded-full ${focus}`}>
          <Image src="/favicon.svg" alt="" aria-hidden width={40} height={40} className="h-10 w-10 rounded-xl transition-transform duration-500 group-hover:rotate-[-8deg]" />
          <span className="font-display text-xl font-bold leading-none tracking-[-0.03em]">
            Yasir<span className="text-accent">.</span>
          </span>
        </Link>
        <div className="flex items-center gap-1.5 text-sm font-semibold">
          <Link href="/#work" className={`rounded-full px-4 py-2.5 text-ink-soft transition-colors hover:bg-surface hover:text-ink ${focus}`}>
            All work
          </Link>
          <Link href="/#contact" className={`group inline-flex items-center gap-2 rounded-full bg-brand py-2.5 pl-5 pr-4 text-on-brand transition-colors hover:bg-brand-hover ${focus}`}>
            Hire me <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
