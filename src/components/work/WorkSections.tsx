import Image from "next/image";
import type { Work } from "@/data/work";
import WorkChapter from "./WorkChapter";

const num = (i: number) => String(i + 1).padStart(2, "0");

export function WorkProblem({ item }: { item: Work }) {
  return (
    <WorkChapter id="problem" eyebrow="Challenge" title="The" accent="problem" icon="problem" lede="What stood between people and the outcome they came for.">
      <figure data-fade className="relative overflow-hidden rounded-[2rem] border border-line bg-bg-white p-8 md:p-12">
        <span aria-hidden className="absolute -right-2 -top-10 font-display text-[12rem] font-bold leading-none text-surface">&rdquo;</span>
        <blockquote className="relative font-display text-2xl font-semibold leading-snug tracking-tight md:text-[2.125rem]">{item.problem}</blockquote>
        <figcaption className="relative mt-8 flex items-center gap-3 border-t border-line pt-6 text-sm text-ink-muted">
          <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
          {item.industry} · {item.duration} engagement
        </figcaption>
      </figure>
    </WorkChapter>
  );
}

export function WorkProcess({ item }: { item: Work }) {
  return (
    <WorkChapter id="process" eyebrow="Approach" title="How I" accent="approached it" icon="approach" tone="dark" lede="The sequence of moves, from understanding the decision to shaping the flow.">
      <ol className="approach-list relative">
        <span aria-hidden className="absolute bottom-7 left-[1.4rem] top-7 w-px bg-hair-light" />
        <span aria-hidden className="approach-fill absolute bottom-7 left-[1.4rem] top-7 w-0.5 origin-top -translate-x-[0.5px] bg-accent" />
        {item.approach.map((step, i) => (
          <li key={step} className="approach-step relative flex gap-6 pb-6 last:pb-0">
            <span aria-hidden className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/60 bg-bg-deep font-display text-sm font-bold text-accent">{num(i)}</span>
            <p className="flex-1 rounded-3xl border border-hair-light bg-surface-dark px-6 py-5 text-lg leading-relaxed text-on-brand/90">{step}</p>
          </li>
        ))}
      </ol>
    </WorkChapter>
  );
}

export function WorkDecisions({ item }: { item: Work }) {
  return (
    <WorkChapter id="decisions" eyebrow="Key decisions" title="Key" accent="decisions" icon="decisions" tone="surface" lede="The calls that shaped the product, and the reasoning behind each one.">
      <div className="decision-grid grid gap-4">
        {item.decisions.map((d, i) => (
          <article key={d.title} className="decision-card group grid gap-5 rounded-3xl border border-line bg-bg-white p-7 transition-colors duration-300 hover:border-brand sm:grid-cols-[auto_1fr] md:p-8">
            <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand font-display text-sm font-bold text-on-brand transition-transform duration-500 group-hover:-rotate-6 motion-reduce:transition-none">{num(i)}</span>
            <div>
              <h3 className="font-display text-2xl font-bold tracking-tight">{d.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{d.why}</p>
            </div>
          </article>
        ))}
      </div>
    </WorkChapter>
  );
}

export function WorkSolution({ item }: { item: Work }) {
  return (
    <WorkChapter id="solution" eyebrow="Solution" title="The" accent="solution" icon="solution" lede={item.solution}>
      <div className="grid gap-10">
        {item.images.map((img, i) => (
          <figure key={img.src}>
            <div className="gallery-frame overflow-hidden rounded-[1.75rem] border border-line bg-bg-white">
              <Image src={img.src} alt={img.alt} width={1448} height={1086} sizes="(min-width: 1280px) 760px, 100vw" className="h-auto w-full" />
            </div>
            <figcaption className="mt-4 flex items-baseline gap-3 text-sm text-ink-muted">
              <span className="shrink-0 font-display font-bold tabular-nums text-brand">Fig. {num(i)}</span>
              {img.alt}
            </figcaption>
          </figure>
        ))}
      </div>
    </WorkChapter>
  );
}

export function WorkOutcome({ item }: { item: Work }) {
  return (
    <WorkChapter id="impact" eyebrow="Impact" title="Impact &" accent="reflection" icon="impact" tone="surface" lede="Where the work landed, and what I'd carry into the next project.">
      <div className="impact-grid grid gap-4">
        <div className="impact-card rounded-[2rem] bg-brand p-8 text-on-brand md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-on-brand/75">Impact</p>
          <p className="mt-6 font-display text-2xl font-semibold leading-snug tracking-tight md:text-3xl">{item.outcome}</p>
        </div>
        <figure className="impact-card rounded-[2rem] border border-line bg-bg-white p-8 md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Reflection</p>
          <blockquote className="mt-6 font-display text-xl font-medium leading-snug md:text-2xl">&ldquo;{item.reflection}&rdquo;</blockquote>
        </figure>
      </div>
    </WorkChapter>
  );
}
