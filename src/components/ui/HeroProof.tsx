/** Above-the-fold proof, so credibility lands before the first scroll. */
const proof = [
  { value: "50+", label: "Interfaces designed end to end" },
  { value: "3", label: "Industries: SaaS, healthcare, fintech" },
  { value: "1", label: "Product live on Google Play" },
  { value: "WCAG", label: "Accessibility from the first wireframe" },
];

/** Proof strip at the foot of the hero. */
export default function HeroProof() {
  return (
    <dl className="hero-fade mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
      {proof.map((p) => (
        <div key={p.label} className="flex flex-col gap-1 bg-bg-white/90 px-5 py-4 backdrop-blur md:px-6 md:py-5">
          <dt className="order-2 text-xs leading-snug text-ink-soft md:text-sm">{p.label}</dt>
          <dd className="order-1 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">{p.value}</dd>
        </div>
      ))}
    </dl>
  );
}
