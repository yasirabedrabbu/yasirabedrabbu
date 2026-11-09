import Eyebrow from "@/components/ui/Eyebrow";
import WorkIcon, { type WorkIconName } from "./WorkIcons";

export type Tone = "light" | "surface" | "dark";

const tones: Record<Tone, { band: string; tile: string; lede: string; accent: string }> = {
  light: { band: "bg-bg text-ink", tile: "border-line bg-bg-white text-brand", lede: "text-ink-soft", accent: "text-brand" },
  surface: { band: "bg-surface text-ink", tile: "border-line-strong/50 bg-bg-white text-brand", lede: "text-ink-soft", accent: "text-brand" },
  dark: { band: "bg-bg-deep text-on-brand", tile: "border-hair-light bg-surface-dark text-accent", lede: "text-on-brand/80", accent: "text-accent" },
};

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  accent: string;
  lede: string;
  icon: WorkIconName;
  tone?: Tone;
  children: React.ReactNode;
};

/** Full-bleed chapter band: sticky header (eyebrow, heading, animated icon) beside its content.
    Mirrors the homepage section header so both pages share one visual language. */
export default function WorkChapter({ id, eyebrow, title, accent, lede, icon, tone = "light", children }: Props) {
  const t = tones[tone];
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-36 overflow-x-clip px-4 py-24 md:px-8 md:py-32 ${t.band}`}>
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] lg:gap-20">
        <header className="lg:sticky lg:top-40 lg:self-start">
          <div data-fade>
            <Eyebrow light={tone === "dark"}>{eyebrow}</Eyebrow>
          </div>
          <h2 id={`${id}-title`} className="text-balance font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-6xl">
            {title} <span className={`italic ${t.accent}`}>{accent}</span>
          </h2>
          <p data-fade className={`mt-6 max-w-sm leading-relaxed ${t.lede}`}>{lede}</p>
          <div data-icon className={`mt-10 flex h-20 w-20 items-center justify-center rounded-3xl border lg:h-24 lg:w-24 ${t.tile}`}>
            <WorkIcon name={icon} className="h-10 w-10 lg:h-12 lg:w-12" />
          </div>
        </header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
