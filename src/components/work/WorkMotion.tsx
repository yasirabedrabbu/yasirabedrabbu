"use client";

import { useRef } from "react";
import { useRevealFx } from "@/hooks/useRevealFx";
import { useWorkFx } from "@/hooks/useWorkFx";
import ScrollProgress from "@/components/ui/ScrollProgress";

/** Client boundary that gives the server-rendered case-study pages the shared reveal motion. */
export default function WorkMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useRevealFx(root);
  useWorkFx(root);

  return (
    <div ref={root} className="min-h-dvh bg-bg text-ink">
      <ScrollProgress />
      {children}
    </div>
  );
}
