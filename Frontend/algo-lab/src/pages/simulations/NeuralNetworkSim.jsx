import { useState, useMemo } from "react";
import { critterClasses, critterIcons, critterFeatures } from "../../data/datasets.js";
import ExplanationPanel from "../../components/ExplanationPanel.jsx";
import ConceptCard from "../../components/ConceptCard.jsx";
import StepLog from "../../components/StepLog.jsx";

const layers = [
  { x: 90, count: 4, labels: critterFeatures },
  { x: 330, count: 5, labels: null, tag: "Hidden layer 1 — simple patterns" },
  { x: 570, count: 4, labels: null, tag: "Hidden layer 2 — higher-level concepts" },
  { x: 810, count: 3, labels: critterClasses, icons: critterClasses.map((c) => critterIcons[c]) },
];
const V_GAP = 66, SVG_H = 440;

function layerY(count) {
  const totalH = (count - 1) * V_GAP;
  const startY = (SVG_H - totalH) / 2;
  return Array.from({ length: count }, (_, i) => startY + i * V_GAP);
}
const positions = layers.map((l) => ({ x: l.x, ys: layerY(l.count) }));

// deterministic pseudo-random weight per connection, purely for visualization —
// thicker / more opaque line = a stronger learned weight between those two neurons
function weightFor(li, ai, bi) {
  return Math.sin(li * 12.9898 + ai * 78.233 + bi * 37.719) * 0.5 + 0.5; // 0..1
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

export default function NeuralNetworkSim() {
  const [activeLayer, setActiveLayer] = useState(-1);
  const [flowingTo, setFlowingTo] = useState(-1);
  const [winner, setWinner] = useState(null);
  const [running, setRunning] = useState(false);
  const [target, setTarget] = useState("Dog");
  const [steps, setSteps] = useState([]);

  async function run() {
    setRunning(true);
    setWinner(null);
    setActiveLayer(-1);
    setFlowingTo(-1);
    setSteps([`Feeding in the 4 raw features of a "${target}" image: ${critterFeatures.join(", ")}.`]);
    await sleep(500);

    for (let li = 0; li < layers.length; li++) {
      setActiveLayer(li);
      if (li === 0) {
        setSteps((s) => [...s, "Input layer: each neuron just holds one raw feature value — no computation yet."]);
      } else {
        setSteps((s) => [...s, `${layers[li].tag || "Output layer"}: each neuron computes a weighted sum of every neuron in the previous layer, then applies an activation function (e.g. ReLU) to decide how strongly it fires.`]);
      }
      await sleep(700);

      if (li < layers.length - 1) {
        setFlowingTo(li + 1);
        await sleep(700);
      }
    }
    setWinner(target);
    setSteps((s) => [...s, `Output layer scores every class. "${target}" has the highest combined activation → predicted class: ${target}.`]);
    setRunning(false);
  }

  function reset() {
    setActiveLayer(-1); setFlowingTo(-1); setWinner(null); setSteps([]);
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-signal mb-2">Simulation Engine</p>
      <h1 className="font-display font-bold text-3xl mb-2">Neural Network — Cat, Dog, or Bird?</h1>
      <p className="text-dim mb-8">Line thickness below shows each connection's weight — the network's learned "opinion" of how much that signal matters.</p>

      <ConceptCard
        accent="signal"
        tagline="A neural network is layers of simple decisions stacked on top of each other — each neuron combines its inputs, weighs how much it trusts each one, and passes forward how strongly it 'fires.'"
        points={[
          { label: "Every connection has a learned weight.", text: "Thicker lines below mean a stronger weight — during training, the network adjusts these until the whole network's predictions get accurate." },
          { label: "Each neuron computes a weighted sum, then activates.", text: "It multiplies every incoming signal by that connection's weight, adds them up, then runs the result through an activation function (like ReLU) that decides how strongly to fire forward." },
          { label: "Early layers detect simple patterns; deeper layers combine them.", text: "Hidden layer 1 might learn simple shape cues; hidden layer 2 combines those into higher-level concepts like 'has whiskers' or 'has wings' — this is called a feature hierarchy." },
          { label: "The output layer scores every class.", text: "Whichever output neuron ends up with the highest activation is the network's prediction." },
        ]}
        note="This is a toy, untrained network for visualization — weights shown here are fixed for demo purposes, not learned from real image data."
      />

      <div className="border border-edge rounded-xl bg-surface p-6">
        <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-edge">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-dim block mb-1.5">Target class</label>
            <div className="flex gap-2">
              {critterClasses.map((c) => (
                <button key={c} onClick={() => setTarget(c)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono border ${
                    target === c ? "border-signal text-signal bg-signal/10" : "border-edge text-dim"
                  }`}>
                  {critterIcons[c]} {c}
                </button>
              ))}
            </div>
          </div>
          <button onClick={run} disabled={running}
            className="ml-auto px-5 py-2 rounded-lg bg-signal text-bg font-mono text-xs font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity self-end">
            {running ? "Running…" : "▶ Run forward pass"}
          </button>
          <button onClick={reset} className="px-4 py-2 rounded-lg border border-edge text-dim font-mono text-xs hover:text-ink transition-colors self-end">
            Reset
          </button>
        </div>

        <svg viewBox={`0 0 900 ${SVG_H}`} className="w-full h-auto">
          {layers.slice(0, -1).map((_, li) =>
            positions[li].ys.map((ay, ai) =>
              positions[li + 1].ys.map((by, bi) => {
                const flowing = flowingTo === li + 1;
                const w = weightFor(li, ai, bi);
                const idleWidth = 0.5 + w * 2.2;
                const idleOpacity = 0.15 + w * 0.55;
                return (
                  <path
                    key={`${li}-${ai}-${bi}`}
                    d={`M${positions[li].x + 16},${ay} C${(positions[li].x + positions[li+1].x)/2},${ay} ${(positions[li].x + positions[li+1].x)/2},${by} ${positions[li+1].x - 16},${by}`}
                    fill="none"
                    stroke={flowing ? "#F5B85C" : "#5A6478"}
                    strokeWidth={flowing ? 2 : idleWidth}
                    strokeOpacity={flowing ? 0.9 : idleOpacity}
                    className={flowing ? "edge-flow" : ""}
                  />
                );
              })
            )
          )}

          {layers.map((l, li) =>
            positions[li].ys.map((y, ni) => {
              const isActive = activeLayer === li;
              const isWinner = winner && li === layers.length - 1 && l.labels[ni] === winner;
              let fill = "#1B2338", stroke = "#232C3D";
              if (isActive) { fill = "#F5B85C"; stroke = "#F5B85C"; }
              if (isWinner) { fill = "#5EEAD4"; stroke = "#5EEAD4"; }
              return (
                <g key={`${li}-${ni}`}>
                  <circle cx={l.x} cy={y} r="16" fill={fill} stroke={stroke} strokeWidth="1.5" />
                  {l.icons && <text x={l.x} y={y + 6} textAnchor="middle" fontSize="16">{l.icons[ni]}</text>}
                  {l.labels && (
                    <text x={l.x} y={li === 0 ? y - 24 : y + 34} textAnchor="middle" fontSize="10"
                      fill={isWinner ? "#5EEAD4" : "#7C8699"} fontFamily="JetBrains Mono, monospace"
                      fontWeight={isWinner ? "600" : "400"}>
                      {l.labels[ni]}
                    </text>
                  )}
                </g>
              );
            })
          )}

          {layers.map((l, li) => (
            <text key={`tag-${li}`} x={l.x} y={SVG_H - 6} textAnchor="middle" fontSize="9"
              fontFamily="JetBrains Mono, monospace" fill={activeLayer === li ? "#F5B85C" : "#4C5468"}>
              {li === 0 ? "INPUT" : li === layers.length - 1 ? "OUTPUT" : `HIDDEN ${li}`}
            </text>
          ))}
        </svg>

        <StepLog steps={steps} accent="signal" />
      </div>

      <ExplanationPanel
        algorithm="neuralNetwork"
        context={{ target, winner }}
        fallback={`Each neuron multiplies its inputs by learned weights, sums them, and applies an activation function like ReLU to decide how strongly to fire forward. Early layers pick up simple patterns; deeper layers recombine those into more abstract concepts. By the output layer, "${target}" had the highest combined activation, so that's the network's prediction.`}
      />
    </section>
  );
}
