export default function StepLog({ steps, accent = "cyan" }) {
  const accentText = { cyan: "text-cyan", amber: "text-amber", violet: "text-violet", signal: "text-signal" }[accent];
  if (!steps.length) return null;
  return (
    <div className="mt-4 font-mono text-xs space-y-1.5 min-h-[24px]">
      {steps.map((s, i) => (
        <div key={i} className={i === steps.length - 1 ? accentText : "text-dim"}>
          <span className="opacity-50">{String(i + 1).padStart(2, "0")} ›</span> {s}
        </div>
      ))}
    </div>
  );
}
