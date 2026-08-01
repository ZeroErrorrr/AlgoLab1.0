import { useState } from "react";
import { songDataset } from "../../data/datasets.js";
import ExplanationPanel from "../../components/ExplanationPanel.jsx";
import ConceptCard from "../../components/ConceptCard.jsx";
import StepLog from "../../components/StepLog.jsx";

const W = 480, H = 380, PAD = 30;
const scaleX = (v) => PAD + (v / 100) * (W - PAD * 2);
const scaleY = (v) => H - PAD - (v / 100) * (H - PAD * 2);
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

export default function KNNSim() {
  const [k, setK] = useState(3);
  const [query, setQuery] = useState(null);
  const [allDists, setAllDists] = useState([]);
  const [stage, setStage] = useState(0); // 0 none, 1 measuring, 2 sorted/highlighted, 3 voted
  const [prediction, setPrediction] = useState(null);
  const [steps, setSteps] = useState([]);
  const [running, setRunning] = useState(false);

  async function handleClick(e) {
    if (running) return;
    setRunning(true);
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const py = ((e.clientY - rect.top) / rect.height) * H;
    const x = Math.max(0, Math.min(100, ((px - PAD) / (W - PAD * 2)) * 100));
    const y = Math.max(0, Math.min(100, ((H - PAD - py) / (H - PAD * 2)) * 100));

    const withDist = songDataset.map((p, i) => ({
      ...p, i, dist: Math.hypot(p.x - x, p.y - y),
    })).sort((a, b) => a.dist - b.dist);

    setQuery({ x, y });
    setAllDists([]);
    setPrediction(null);
    setStage(0);
    setSteps([`New song dropped at (Tempo ${x.toFixed(0)}, Energy ${y.toFixed(0)}). No label yet — that's what we're about to predict.`]);
    await sleep(500);

    setStage(1);
    setAllDists(withDist);
    setSteps((s) => [...s, `Measuring straight-line (Euclidean) distance from the new point to all ${songDataset.length} training songs.`]);
    await sleep(1000);

    setStage(2);
    const nearest = withDist.slice(0, k);
    setSteps((s) => [...s, `Sorted by distance. Keeping the K=${k} closest: ${nearest.map(n => n.dist.toFixed(1)).join(", ")}.`]);
    await sleep(1000);

    setStage(3);
    const hitCount = nearest.filter((n) => n.label === "Hit").length;
    const missCount = k - hitCount;
    const pred = hitCount > missCount ? "Hit" : "Miss";
    setPrediction(pred);
    setSteps((s) => [...s, `Majority vote among neighbors: ${hitCount} Hit vs ${missCount} Miss → predicted class: ${pred}.`]);
    setRunning(false);
  }

  const neighbors = stage >= 2 ? allDists.slice(0, k) : [];

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-amber mb-2">Simulation Engine</p>
      <h1 className="font-display font-bold text-3xl mb-2">K-Nearest Neighbors — Is this song a Hit or a Miss?</h1>
      <p className="text-dim mb-8">Click anywhere on the plot to drop a new song, based on Tempo × Energy.</p>

      <ConceptCard
        accent="amber"
        tagline="KNN doesn't learn a formula at all — it just remembers every training example, and when a new point shows up, it asks its nearest neighbors what they are."
        points={[
          { label: "Measure distance to every known example.", text: "Usually straight-line (Euclidean) distance in feature space — here, the 2D space of Tempo and Energy." },
          { label: "Sort and keep the K closest.", text: `K is a number you choose. We're using K=${k} right now.` },
          { label: "Let them vote.", text: "Whichever class is most common among those K neighbors becomes the prediction. Odd K values avoid ties in two-class problems." },
          { label: "K controls the trade-off.", text: "Small K (like 1) reacts to every local quirk in the data (can overfit / get noisy). Large K smooths predictions but can blur real boundaries between classes." },
        ]}
        note="KNN has no training phase — all the 'work' happens at prediction time, which is why it's called a lazy learner."
      />

      <div className="border border-edge rounded-xl bg-surface p-6 grid md:grid-cols-[1fr_260px] gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <label className="font-mono text-[10px] uppercase tracking-widest text-dim">K = {k}</label>
            <input type="range" min="1" max="7" step="2" value={k}
              onChange={(e) => setK(Number(e.target.value))} className="accent-amber flex-1 max-w-[160px]" />
          </div>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            onClick={handleClick}
            className="w-full h-auto bg-surface2 rounded-lg border border-edge cursor-crosshair"
          >
            <text x={W/2} y={H-6} textAnchor="middle" fontSize="10" className="fill-dim font-mono">Tempo →</text>
            <text x={12} y={H/2} textAnchor="middle" fontSize="10" className="fill-dim font-mono" transform={`rotate(-90 12 ${H/2})`}>Energy →</text>

            {stage === 1 && query && allDists.map((p, idx) => (
              <line key={idx} x1={scaleX(query.x)} y1={scaleY(query.y)} x2={scaleX(p.x)} y2={scaleY(p.y)}
                stroke="#232C3D" strokeWidth="1" />
            ))}

            {songDataset.map((p, i) => {
              const isNeighbor = neighbors.some((n) => n.i === i);
              const dimmed = stage >= 2 && !isNeighbor;
              return (
                <circle
                  key={i} cx={scaleX(p.x)} cy={scaleY(p.y)}
                  r={isNeighbor ? 7 : 5}
                  fill={p.label === "Hit" ? "#5EEAD4" : "#F2748C"}
                  stroke={isNeighbor ? "#F5B85C" : "none"}
                  strokeWidth="2.5"
                  opacity={dimmed ? 0.25 : 1}
                />
              );
            })}

            {stage >= 2 && query && neighbors.map((n, idx) => (
              <g key={idx}>
                <line x1={scaleX(query.x)} y1={scaleY(query.y)} x2={scaleX(n.x)} y2={scaleY(n.y)}
                  stroke="#F5B85C" strokeWidth="1.6" strokeDasharray="4 3" />
                <text
                  x={(scaleX(query.x) + scaleX(n.x)) / 2} y={(scaleY(query.y) + scaleY(n.y)) / 2 - 4}
                  textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#F5B85C"
                >
                  {n.dist.toFixed(1)}
                </text>
              </g>
            ))}

            {query && (
              <circle cx={scaleX(query.x)} cy={scaleY(query.y)} r="8"
                fill={prediction === "Hit" ? "#5EEAD4" : prediction === "Miss" ? "#F2748C" : "#8B7FF0"}
                stroke="#FFFFFF" strokeWidth="2" />
            )}
          </svg>
          <StepLog steps={steps} accent="amber" />
        </div>

        <div className="flex flex-col gap-4">
          <Legend />
          {prediction ? (
            <div className="border border-edge rounded-lg p-4 bg-surface2">
              <p className="font-mono text-[10px] uppercase text-dim mb-1">Prediction</p>
              <p className={`font-display font-semibold text-xl ${prediction === "Hit" ? "text-cyan" : "text-signal"}`}>
                {prediction}
              </p>
              <p className="text-xs text-dim mt-2">
                {neighbors.filter(n => n.label === "Hit").length} of {k} nearest neighbors are Hits.
              </p>
            </div>
          ) : (
            <p className="text-xs text-dim">Click the plot to classify a new song.</p>
          )}
        </div>
      </div>

      <ExplanationPanel
        algorithm="knn"
        context={{ k, query, neighbors: neighbors.map(n => n.label), prediction }}
        fallback={`With K=${k}, the algorithm measured distance from the new point to every training song, kept the ${k} closest, and took a majority vote. ${
          neighbors.filter(n => n.label === "Hit").length} out of ${k} neighbors were "Hit" songs, so it predicted "${prediction || "—"}". Closer neighbors carry the same weight as farther ones here — a "weighted" KNN variant would let closer points count more.`}
      />
    </section>
  );
}

function Legend() {
  return (
    <div className="flex flex-col gap-2 font-mono text-xs text-dim">
      <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-cyan inline-block" /> Hit</div>
      <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-signal inline-block" /> Miss</div>
      <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full border-2 border-amber inline-block" /> Nearest neighbor</div>
    </div>
  );
}
