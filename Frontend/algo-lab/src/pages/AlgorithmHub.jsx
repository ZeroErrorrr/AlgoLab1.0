import AlgorithmCard from "../components/AlgorithmCard.jsx";

export default function AlgorithmHub() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-cyan mb-3">Algorithm Hub</p>
      <h1 className="font-display font-bold text-3xl md:text-4xl mb-3">Select an algorithm</h1>
      <p className="text-dim max-w-xl mb-10">
        Each one runs a full simulation engine client-side — local dataset, live controls,
        animated visualization. No server round-trip required.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AlgorithmCard
          to="/sim/decision-tree"
          title="Decision Tree"
          tag="Classification"
          glyph="🌳"
          accent="cyan"
          description="Trace how a tree splits on Outlook, Humidity, and Wind to decide: play or don't play."
        />
        <AlgorithmCard
          to="/sim/knn"
          title="K-Nearest Neighbors"
          tag="Classification"
          glyph="◈"
          accent="amber"
          description="Drop a new song on the map and watch it get classified by its closest neighbors."
        />
        <AlgorithmCard
          to="/sim/linear-regression"
          title="Linear Regression"
          tag="Regression"
          glyph="📈"
          accent="violet"
          description="Watch the best-fit line converge from a bad guess to the least-squares solution."
        />
        <AlgorithmCard
          to="/sim/neural-network"
          title="Neural Network"
          tag="Deep Learning"
          glyph="◉"
          accent="signal"
          description="Send a signal through input, hidden, and output layers and see it fire, layer by layer."
        />
      </div>
    </section>
  );
}
