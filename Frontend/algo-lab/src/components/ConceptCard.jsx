export default function ConceptCard({ accent = "cyan", tagline, points, note }) {
  const accentText = { cyan: "text-cyan", amber: "text-amber", violet: "text-violet", signal: "text-signal" }[accent];
  const accentBorder = { cyan: "border-cyan/30", amber: "border-amber/30", violet: "border-violet/30", signal: "border-signal/30" }[accent];

  return (
    <div className={`border ${accentBorder} rounded-xl bg-surface2/50 p-6 mb-8`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`font-mono text-[10px] uppercase tracking-widest ${accentText}`}>How this actually works</span>
      </div>
      <p className="text-sm text-ink/90 leading-relaxed mb-4">{tagline}</p>
      <ol className="space-y-2.5">
        {points.map((p, i) => (
          <li key={i} className="flex gap-3 text-sm text-dim leading-relaxed">
            <span className={`font-mono text-xs ${accentText} shrink-0 pt-0.5`}>{String(i + 1).padStart(2, "0")}</span>
            <span><span className="text-ink font-medium">{p.label}</span> — {p.text}</span>
          </li>
        ))}
      </ol>
      {note && <p className="mt-4 pt-4 border-t border-edge text-xs text-dim leading-relaxed">💡 {note}</p>}
    </div>
  );
}
