const challenges = [
  { title: "Beat the Tree", desc: "Guess the decision path before the algorithm reveals it.", tag: "Decision Tree" },
  { title: "Tune the K", desc: "Find the K value that classifies all test songs correctly.", tag: "KNN" },
  { title: "Fit by Hand", desc: "Manually drag a line to beat the least-squares error score.", tag: "Linear Regression" },
];

export default function ChallengeMode() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-amber mb-2">Challenge Mode</p>
      <h1 className="font-display font-bold text-3xl mb-3">Coming soon</h1>
      <p className="text-dim max-w-xl mb-10">
        Turn each simulation into a quick game. Marked as stretch scope — ship the four
        simulations and AI tutor first, then build these if time allows.
      </p>
      <div className="grid md:grid-cols-3 gap-5">
        {challenges.map((c) => (
          <div key={c.title} className="relative border border-edge rounded-xl bg-surface p-6 opacity-60">
            <span className="absolute top-4 right-4 font-mono text-[10px] text-dim border border-edge rounded px-2 py-0.5">LOCKED</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber">{c.tag}</span>
            <h3 className="font-display font-semibold text-lg mt-2 mb-2">{c.title}</h3>
            <p className="text-sm text-dim">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
