import { Link } from "react-router-dom";

// Fixed node-graph coordinates for the hero background — deliberately
// echoes the neural network / graph visuals used inside the simulations.
const nodes = [
  [80, 90], [220, 40], [360, 120], [500, 60], [640, 140],
  [140, 220], [300, 260], [460, 220], [600, 280], [740, 200],
  [60, 340], [260, 380], [420, 340], [580, 380], [720, 340],
];
const edges = [
  [0,1],[1,2],[2,3],[3,4],[0,5],[1,6],[2,7],[3,8],[4,9],
  [5,6],[6,7],[7,8],[8,9],[5,10],[6,11],[7,12],[8,13],[9,14],
  [10,11],[11,12],[12,13],[13,14],
];

export default function Landing() {
  return (
    <section className="relative overflow-hidden border-b border-edge">
      <div className="absolute inset-0 bg-grid bg-grid opacity-40" />
      <svg
        viewBox="0 0 800 420"
        className="absolute inset-0 w-full h-full opacity-30 animate-drift"
        preserveAspectRatio="xMidYMid slice"
      >
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]} y1={nodes[a][1]}
            x2={nodes[b][0]} y2={nodes[b][1]}
            stroke="#5EEAD4" strokeWidth="1"
          />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill={i % 3 === 0 ? "#F5B85C" : "#5EEAD4"} />
        ))}
      </svg>

      <div className="relative max-w-6xl mx-auto px-6 py-28">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan mb-4">
          // Interactive ML Visualization Platform
        </p>
        <h1 className="font-display font-bold text-5xl md:text-6xl leading-tight max-w-3xl mb-6">
          Watch algorithms <span className="text-cyan">think</span>,
          not just <span className="text-amber">predict</span>.
        </h1>
        <p className="text-dim text-lg max-w-xl mb-10 leading-relaxed">
          A hands-on playground where you feed real inputs into Decision Trees, KNN,
          Linear Regression, and Neural Networks — and watch every step animate in
          real time. Then ask the AI tutor why.
        </p>
        <div className="flex gap-4">
          <Link
            to="/hub"
            className="px-6 py-3 rounded-lg bg-cyan text-bg font-mono text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Launch Algorithm Hub →
          </Link>
          <Link
            to="/tutor"
            className="px-6 py-3 rounded-lg border border-edge text-ink font-mono text-sm hover:border-cyan/50 transition-colors"
          >
            Meet the AI Tutor
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
          {[
            ["01", "Pick an algorithm"],
            ["02", "Feed it live input"],
            ["03", "Watch it animate"],
            ["04", "Ask the AI why"],
          ].map(([n, label]) => (
            <div key={n} className="border-l border-edge pl-3">
              <div className="font-mono text-xs text-amber mb-1">{n}</div>
              <div className="text-xs text-dim">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
