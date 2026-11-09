import type { Work } from "@/data/work";
import WorkNav from "./WorkNav";
import WorkFooter from "./WorkFooter";
import WorkHero from "./WorkHero";
import WorkChapterNav, { type Chapter } from "./WorkChapterNav";
import { WorkProblem, WorkProcess, WorkDecisions, WorkSolution, WorkOutcome } from "./WorkSections";
import { WorkCta, WorkPager } from "./WorkOutro";
import WorkMotion from "./WorkMotion";

const chapters: Chapter[] = [
  { id: "problem", label: "Problem" },
  { id: "process", label: "Approach" },
  { id: "decisions", label: "Decisions" },
  { id: "solution", label: "Solution" },
  { id: "impact", label: "Impact" },
];

/** Full case-study layout for one anonymized project. */
export default function WorkDetail({ item, prev, next }: { item: Work; prev?: Work; next?: Work }) {
  return (
    <WorkMotion>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-on-brand">Skip to content</a>
      <WorkNav />
      <main id="main">
        <WorkHero item={item} />
        {/* The chapter bar is sticky only while the chapters are on screen. */}
        <div className="relative">
          <WorkChapterNav chapters={chapters} />
          <div className="-mt-[3.25rem]">
            <WorkProblem item={item} />
            <WorkProcess item={item} />
            <WorkDecisions item={item} />
            <WorkSolution item={item} />
            <WorkOutcome item={item} />
          </div>
        </div>
        <div className="bg-surface pb-4">
          <WorkCta item={item} />
        </div>
        <WorkPager prev={prev} next={next} />
      </main>
      <WorkFooter />
    </WorkMotion>
  );
}
