import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/data/work";
import { focus } from "@/lib/ui";
import ArrowUpRight from "@/components/ui/ArrowUpRight";
import Eyebrow from "@/components/ui/Eyebrow";

/** Case-study opener: eyebrow + headline, summary and actions, a facts strip and the framed cover. */
export default function WorkHero({ item }: { item: Work }) {
  const cover = item.images[0];
  const facts: [string, string][] = [
    ["Industry", item.industry],
    ["Role", item.role],
    ["Duration", item.duration],
    ["Tools", item.tools.join(", ")],
  ];

  return (
    <section aria-labelledby="work-hero-title" className="px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <div data-fade className="flex flex-wrap items-center justify-between gap-4">
          <Eyebrow className="!mb-0">Case studies</Eyebrow>
          <Link href="/#work" className={`inline-flex items-center gap-2 rounded-full text-sm font-medium text-ink-soft transition-colors hover:text-brand ${focus}`}>
            <ArrowUpRight size={16} className="rotate-[225deg]" /> All case studies
          </Link>
        </div>

        <h1 id="work-hero-title" className="work-title mt-10 max-w-5xl text-balance font-display text-[clamp(2.75rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
          {item.title}
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-end">
          <p data-fade className="max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">{item.result}</p>
          <div data-fade className="flex flex-wrap items-center gap-3 md:justify-end">
            <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" /> Under NDA
            </span>
            <a href="#walkthrough" className={`group inline-flex items-center gap-2 rounded-full bg-brand py-2.5 pl-5 pr-4 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-hover ${focus}`}>
              Request walkthrough <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </div>
        </div>

        <dl data-stagger className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
          {facts.map(([label, value]) => (
            <div key={label} className="bg-bg-white px-5 py-5 md:px-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">{label}</dt>
              <dd className="mt-2 font-display text-lg font-bold tracking-tight text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="work-cover mt-12 overflow-hidden rounded-[2.25rem] bg-surface p-2.5 md:p-4">
          <div className="overflow-hidden rounded-[1.75rem] border border-line bg-bg-white">
            <Image src={cover.src} alt={cover.alt} width={1448} height={1086} sizes="(min-width: 1280px) 1216px, 100vw" className="h-auto w-full" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
