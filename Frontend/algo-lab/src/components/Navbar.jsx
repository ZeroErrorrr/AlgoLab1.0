import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Explorer", end: true },
  { to: "/hub", label: "Algorithm Hub" },
  { to: "/algorithm-explorer", label: "3D Matrix" },
  { to: "/story-mode", label: "Story Mode" }, // 👈 Added
  { to: "/daily-challenges", label: "Daily Challenges" }, // 👈 Added
  { to: "/tutor", label: "AI Tutor" },
  { to: "/challenge", label: "Challenge Mode" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-bg/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-display font-semibold text-lg">
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse-glow" />
          <span>Algo<span className="text-cyan">Lab</span></span>
        </NavLink>
        <nav className="flex items-center gap-1 font-mono text-xs uppercase tracking-wide">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "text-cyan bg-surface2 border border-edge"
                    : "text-dim hover:text-ink"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
