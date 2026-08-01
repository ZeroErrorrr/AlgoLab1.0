import { useState } from "react";
import { tennisTrainingData, countPlay, entropy } from "../../data/datasets.js";
import ExplanationPanel from "../../components/ExplanationPanel.jsx";
import ConceptCard from "../../components/ConceptCard.jsx";
import StepLog from "../../components/StepLog.jsx";

const nodePos = {
  outlook:  { x: 450, y: 30,  w: 160, h: 58, label: "Outlook?" },
  humidity: { x: 210, y: 185, w: 160, h: 58, label: "Humidity?" },
  overcast: { x: 450, y: 185, w: 160, h: 58, label: "Play", leaf: "play" },
  wind:     { x: 690, y: 185, w: 160, h: 58, label: "Wind?" },
  h_high:   { x: 110, y: 340, w: 160, h: 58, label: "Don't play", leaf: "no" },
  h_normal: { x: 310, y: 340, w: 160, h: 58, label: "Play", leaf: "play" },
  w_weak:   { x: 590, y: 340, w: 160, h: 58, label: "Play", leaf: "play" },
  w_strong: { x: 790, y: 340, w: 160, h: 58, label: "Don't play", leaf: "no" },
};
const edgeList = [
  ["outlook", "humidity", "Sunny"], ["outlook", "overcast", "Overcast"], ["outlook", "wind", "Rain"],
  ["humidity", "h_high", "High"], ["humidity", "h_normal", "Normal"],
  ["wind", "w_weak", "Weak"], ["wind", "w_strong", "Strong"],
];

// real counts, computed from the actual 14-row training set — not scripted
const nodeRows = {
  outlook: tennisTrainingData,
  humidity: tennisTrainingData.filter((r) => r.outlook === "sunny"),
  overcast: tennisTrainingData.filter((r) => r.outlook === "overcast"),
  wind: tennisTrainingData.filter((r) => r.outlook === "rain"),
  h_high: tennisTrainingData.filter((r) => r.outlook === "sunny" && r.humidity === "high"),
  h_normal: tennisTrainingData.filter((r) => r.outlook === "sunny" && r.humidity === "normal"),
  w_weak: tennisTrainingData.filter((r) => r.outlook === "rain" && r.wind === "weak"),
  w_strong: tennisTrainingData.filter((r) => r.outlook === "rain" && r.wind === "strong"),
};
const nodeStats = Object.fromEntries(Object.entries(nodeRows).map(([k, rows]) => [k, countPlay(rows)]));
const rootEntropy = entropy(nodeRows.outlook).toFixed(2);
const outlookWeightedEntropy = (
  (nodeRows.humidity.length / 14) * entropy(nodeRows.humidity) +
  (nodeRows.overcast.length / 14) * entropy(nodeRows.overcast) +
  (nodeRows.wind.length / 14) * entropy(nodeRows.wind)
).toFixed(2);
const outlookGain = (entropy(nodeRows.outlook) - (
  (nodeRows.humidity.length / 14) * entropy(nodeRows.humidity) +
  (nodeRows.overcast.length / 14) * entropy(nodeRows.overcast) +
  (nodeRows.wind.length / 14) * entropy(nodeRows.wind)
)).toFixed(3);

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

export default function DecisionTreeSim() {
  const [outlook, setOutlook] = useState("sunny");
  const [humidity, setHumidity] = useState("high");
  const [wind, setWind] = useState("weak");
  const [activePath, setActivePath] = useState([]);
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);

  async function run() {
    setRunning(true);
    setActivePath([]);
    setSteps([]);
    setResult(null);

    const path = ["outlook"];
    const log = [
      `Root node holds all 14 training examples (${nodeStats.outlook.yes} Yes / ${nodeStats.outlook.no} No) — entropy ${rootEntropy} bits, fairly mixed.`,
      `The tree tests "Outlook" first because it produces the largest information gain (≈${outlookGain} bits) of any feature — splitting on it drops average entropy from ${rootEntropy} to ${outlookWeightedEntropy}. This example's Outlook = "${outlook}".`,
    ];
    let leaf, leafLabel;

    if (outlook === "sunny") {
      path.push("humidity");
      log.push(`Sunny branch still mixed (${nodeStats.humidity.yes}Y/${nodeStats.humidity.no}N) → ask one more question: Humidity = "${humidity}".`);
      if (humidity === "high") { leaf = "h_high"; leafLabel = "Don't play"; log.push(`Humidity = High is a pure group (${nodeStats.h_high.yes}Y/${nodeStats.h_high.no}N) → stop splitting. Prediction: Don't play.`); }
      else { leaf = "h_normal"; leafLabel = "Play"; log.push(`Humidity = Normal is a pure group (${nodeStats.h_normal.yes}Y/${nodeStats.h_normal.no}N) → stop splitting. Prediction: Play.`); }
    } else if (outlook === "overcast") {
      leaf = "overcast"; leafLabel = "Play";
      log.push(`Overcast is already a pure group (${nodeStats.overcast.yes}Y/${nodeStats.overcast.no}N, entropy 0) → no more questions needed. Prediction: Play.`);
    } else {
      path.push("wind");
      log.push(`Rain branch still mixed (${nodeStats.wind.yes}Y/${nodeStats.wind.no}N) → ask one more question: Wind = "${wind}".`);
      if (wind === "weak") { leaf = "w_weak"; leafLabel = "Play"; log.push(`Wind = Weak is a pure group (${nodeStats.w_weak.yes}Y/${nodeStats.w_weak.no}N) → stop splitting. Prediction: Play.`); }
      else { leaf = "w_strong"; leafLabel = "Don't play"; log.push(`Wind = Strong is a pure group (${nodeStats.w_strong.yes}Y/${nodeStats.w_strong.no}N) → stop splitting. Prediction: Don't play.`); }
    }
    path.push(leaf);

    for (let i = 0; i < path.length; i++) {
      setActivePath(path.slice(0, i + 1));
      setSteps(log.slice(0, i + 1));
      await sleep(1100);
    }
    setResult(leafLabel);
    setRunning(false);
  }

  const isNodeActive = (key) => activePath.includes(key);
  const isEdgeActive = (a, b) => {
    const ia = activePath.indexOf(a), ib = activePath.indexOf(b);
    return ia !== -1 && ib === ia + 1;
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-cyan mb-2">Simulation Engine</p>
      <h1 className="font-display font-bold text-3xl mb-2">Decision Tree — Should I play tennis?</h1>
      <p className="text-dim mb-8">Trained on the classic 14-row PlayTennis dataset. Every count on this diagram is real, not scripted.</p>

      <ConceptCard
        accent="cyan"
        tagline="A decision tree repeatedly asks the single yes/no question that splits its remaining examples into the purest possible groups — until every group is pure enough to just read off the answer."
        points={[
          { label: "Start with all the data mixed together.", text: "9 of our 14 example days were good for tennis, 5 weren't — that mix is measured as entropy (0.94 bits: close to 1 means very mixed, 0 means pure)." },
          { label: "Try every possible question, keep the best one.", text: "For each feature (Outlook, Humidity, Wind), the tree checks: if I split on this, how much less mixed do the resulting groups become? That reduction is called information gain." },
          { label: "Split on the question with the highest gain.", text: `Outlook wins here — splitting on it alone drops average entropy from ${rootEntropy} to ${outlookWeightedEntropy} bits, more than Humidity or Wind manage on their own.` },
          { label: "Repeat inside each branch, stop when a group is pure.", text: "The Overcast branch is already 4-for-4 Yes, so it stops immediately — no further questions needed there." },
        ]}
        note="This is a simplified walk-through of the real ID3 algorithm. Production trees also handle numeric features, pruning to avoid overfitting, and stopping rules based on minimum group size."
      />

      <div className="border border-edge rounded-xl bg-surface p-6">
        <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-edge">
          <Field label="Outlook" value={outlook} onChange={setOutlook} options={["sunny", "overcast", "rain"]} />
          {outlook === "sunny" && <Field label="Humidity" value={humidity} onChange={setHumidity} options={["high", "normal"]} />}
          {outlook === "rain" && <Field label="Wind" value={wind} onChange={setWind} options={["weak", "strong"]} />}
          <button
            onClick={run}
            disabled={running}
            className="ml-auto px-5 py-2 rounded-lg bg-cyan text-bg font-mono text-xs font-semibold self-end disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            {running ? "Tracing…" : "▶ Trace decision"}
          </button>
        </div>

        <svg viewBox="0 0 900 430" className="w-full h-auto">
          {edgeList.map(([a, b, label]) => {
            const na = nodePos[a], nb = nodePos[b];
            const ax = na.x, ay = na.y + na.h, bx = nb.x, by = nb.y;
            const active = isEdgeActive(a, b);
            return (
              <g key={`${a}-${b}`}>
                <path
                  d={`M${ax},${ay} C${ax},${(ay + by) / 2} ${bx},${(ay + by) / 2} ${bx},${by}`}
                  fill="none"
                  stroke={active ? "#F5B85C" : "#232C3D"}
                  strokeWidth={active ? 2.5 : 1.4}
                />
                <text x={(ax + bx) / 2} y={(ay + by) / 2 - 4} textAnchor="middle" className="fill-dim font-mono" fontSize="10">
                  {label}
                </text>
              </g>
            );
          })}
          {Object.entries(nodePos).map(([key, n]) => {
            const active = isNodeActive(key);
            const stats = nodeStats[key];
            let fill = "#1B2338", stroke = "#232C3D";
            if (n.leaf === "play") { fill = active ? "#5EEAD4" : "#1B2338"; stroke = "#5EEAD4"; }
            if (n.leaf === "no") { fill = active ? "#F2748C" : "#1B2338"; stroke = "#F2748C"; }
            if (!n.leaf && active) { fill = "#26304A"; stroke = "#F5B85C"; }
            const textFill = active && n.leaf ? "#0A0E17" : "#E4E8F1";
            return (
              <g key={key}>
                <rect x={n.x - n.w / 2} y={n.y} width={n.w} height={n.h} rx="8" fill={fill} stroke={stroke} strokeWidth="1.6" />
                <text x={n.x} y={n.y + 24} textAnchor="middle" fontSize="13" fill={textFill} fontWeight={n.leaf ? "600" : "400"}>
                  {n.label}
                </text>
                <text x={n.x} y={n.y + 42} textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono, monospace"
                  fill={active && n.leaf ? "#0A0E17" : "#7C8699"} opacity={active && n.leaf ? 0.75 : 1}>
                  {stats.yes}Y · {stats.no}N
                </text>
              </g>
            );
          })}
        </svg>

        <StepLog steps={steps} accent="cyan" />
        {result && (
          <div className="mt-2 font-mono text-xs text-ink border-t border-edge pt-3">
            ✓ Final recommendation: <span className="font-semibold text-cyan">{result}</span>
          </div>
        )}
      </div>

      <ExplanationPanel
        algorithm="decisionTree"
        context={{ outlook, humidity, wind, result }}
        fallback={`Outlook was tested first because it had the highest information gain (≈${outlookGain} bits) of the three features. Given Outlook="${outlook}"${
          outlook === "sunny" ? ` and Humidity="${humidity}"` : outlook === "rain" ? ` and Wind="${wind}"` : ""
        }, that example lands in a pure leaf: ${result || "no result yet"}. "Pure" means every training example in that group shares the same outcome, so the tree can stop asking questions.`}
      />
    </section>
  );
}

function Field({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] uppercase tracking-widest text-dim">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-surface2 border border-edge rounded-md px-3 py-2 text-sm capitalize focus:outline-none focus:border-cyan/50"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
