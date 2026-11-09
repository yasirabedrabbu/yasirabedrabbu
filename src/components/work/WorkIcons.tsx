/* Hand-drawn line icons for the case-study chapters. Strokes marked `icon-draw`
   are drawn on by GSAP DrawSVG; `icon-pop` accents spring in afterwards; and
   `icon-idle` / `icon-spin` keep a gentle CSS loop (disabled for reduced motion). */

export type WorkIconName = "problem" | "approach" | "decisions" | "solution" | "impact";

const paths: Record<WorkIconName, React.ReactNode> = {
  problem: (
    <>
      <circle className="icon-draw" cx="24" cy="24" r="17" />
      <circle className="icon-draw" cx="24" cy="24" r="10" />
      <path className="icon-draw" d="M24 3v8M24 37v8M3 24h8M37 24h8" />
      <circle className="icon-pop icon-idle" cx="24" cy="24" r="3.5" fill="currentColor" stroke="none" />
    </>
  ),
  approach: (
    <>
      <path className="icon-draw" d="M8 39c0-11 16-8 16-18S40 13 40 8" />
      <circle className="icon-pop" cx="8" cy="39" r="3.5" fill="currentColor" stroke="none" />
      <circle className="icon-pop" cx="24" cy="22" r="3.5" fill="currentColor" stroke="none" />
      <circle className="icon-pop icon-idle" cx="40" cy="8" r="3.5" fill="currentColor" stroke="none" />
    </>
  ),
  decisions: (
    <>
      <path className="icon-draw" d="M14 42V8" />
      <path className="icon-draw" d="M14 30c0-9 20-6 20-16v-4" />
      <circle className="icon-pop" cx="14" cy="8" r="4" />
      <circle className="icon-pop icon-idle" cx="34" cy="8" r="4" fill="currentColor" />
      <circle className="icon-pop" cx="14" cy="42" r="2.5" fill="currentColor" stroke="none" />
    </>
  ),
  solution: (
    <>
      <rect className="icon-draw" x="5" y="9" width="38" height="26" rx="4" />
      <path className="icon-draw" d="M18 42h12M24 35v7" />
      <rect className="icon-pop icon-idle" x="11" y="15" width="12" height="9" rx="2" fill="currentColor" stroke="none" />
      <path className="icon-draw" d="M28 17h9M28 22h6M11 29h26" />
    </>
  ),
  impact: (
    <>
      <path className="icon-draw" d="M7 7v34h34" />
      <path className="icon-draw" d="M13 33l8-9 6 5 12-14" />
      <path className="icon-draw" d="M32 15h7v7" />
      <circle className="icon-pop icon-idle" cx="39" cy="15" r="3" fill="currentColor" stroke="none" />
    </>
  ),
};

export default function WorkIcon({ name, className = "" }: { name: WorkIconName; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      {paths[name]}
    </svg>
  );
}
