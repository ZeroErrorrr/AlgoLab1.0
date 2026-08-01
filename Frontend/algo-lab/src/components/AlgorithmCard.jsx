import { Link } from "react-router-dom";

export default function AlgorithmCard({ to, title, tag, description, glyph, accent = "cyan" }) {
  const accentClasses = {
    cyan: "group-hover:border-cyan/60 group-hover:shadow-cyan/10",
    amber: "group-hover:border-amber/60 group-hover:shadow-amber/10",
    violet: "group-hover:border-violet/60 group-hover:shadow-violet/10",
    signal: "group-hover:border-signal/60 group-hover:shadow-signal/10",
  };
  const textAccent = {
    cyan: "text-cyan", amber: "text-amber", violet: "text-violet", signal: "text-signal",
  };

  return (
    <Link
      to={to}
      className={`group relative block rounded-xl border border-edge bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl ${accentClasses[accent]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`text-3xl ${textAccent[accent]}`}>{glyph}</div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-dim border border-edge rounded px-2 py-1">
          {tag}
        </span>
      </div>
      <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-dim leading-relaxed">{description}</p>
      <div className={`mt-4 font-mono text-xs ${textAccent[accent]} opacity-0 group-hover:opacity-100 transition-opacity`}>
        Run simulation →
      </div>
    </Link>
  );
}
