import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/data/work";
import { focus, focusOnDark } from "@/lib/ui";
import { profile } from "@/data/cv";
import ArrowUpRight from "@/components/ui/ArrowUpRight";
import Eyebrow from "@/components/ui/Eyebrow";

/** Closing NDA call-to-action with a prefilled walkthrough request. */
export function WorkCta({ item }: { item: Work }) {
  const subject = encodeURIComponent(`Case study walkthrough request — ${item.title}`);
  return (
    <section id="walkthrough" aria-labelledby="walkthrough-title" className="scroll-mt-36 px-4 md:px-8">
      <div data-fade className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-ink p-10 text-on-brand md:p-16">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand/40 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <Eyebrow light>Private walkthrough</Eyebrow>
            <h2 id="walkthrough-title" className="text-balance font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              See the <span className="italic text-accent">real screens</span> behind this project
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-on-brand/75">
              Everything here is anonymized under a client NDA. In a short call I can walk you through the actual flows, trade-offs and results.
            </p>
          </div>
          <a
            href={`mailto:${profile.email}?subject=${subject}`}
            className={`group inline-flex w-fit items-center gap-3 rounded-full bg-on-brand px-7 py-4 font-semibold text-ink transition-colors hover:bg-accent lg:justify-self-end ${focusOnDark}`}
          >
            Request the walkthrough
            <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:rotate-45" />
          </a>
        </div>
      </div>
    </section>
  );
}

function PagerCard({ work, label, align }: { work: Work; label: string; align: "left" | "right" }) {
  const cover = work.images[0];
  return (
    <Link href={`/work/${work.slug}`} className={`group flex flex-col overflow-hidden rounded-3xl border border-line bg-bg-white transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-brand motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focus}`}>
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
        <Image src={cover.src} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none" />
      </div>
      <div className={`flex items-end justify-between gap-4 p-6 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
        <span>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">{label}</span>
          <span className="mt-2 block font-display text-xl font-bold tracking-tight transition-colors group-hover:text-brand">{work.title}</span>
        </span>
        <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-on-brand">
          <ArrowUpRight size={18} className={align === "left" ? "rotate-[225deg]" : "rotate-45"} />
        </span>
      </div>
    </Link>
  );
}

/** Previous / next case study, led by each project's cover. */
export function WorkPager({ prev, next }: { prev?: Work; next?: Work }) {
  return (
    <nav aria-label="More case studies" className="px-4 pb-24 pt-24 md:px-8 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <div data-fade className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Keep exploring</Eyebrow>
            <h2 className="text-balance font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-6xl">
              More <span className="italic text-brand">case studies</span>
            </h2>
          </div>
        </div>
        <div data-stagger className="mt-12 grid gap-6 sm:grid-cols-2">
          {prev && <PagerCard work={prev} label="Previous project" align="left" />}
          {next && <PagerCard work={next} label="Next project" align="right" />}
        </div>
      </div>
    </nav>
  );
}
