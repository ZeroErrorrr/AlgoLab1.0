import { useState } from "react";
import { studyScoreDataset } from "../../data/datasets.js";
import ExplanationPanel from "../../components/ExplanationPanel.jsx";
import ConceptCard from "../../components/ConceptCard.jsx";
import StepLog from "../../components/StepLog.jsx";

const W = 560, H = 380, PAD = 40;
const maxHours = 10, maxScore = 100;
const scaleX = (v) => PAD + (v / maxHours) * (W - PAD * 2);
const scaleY = (v) => H - PAD - (v / maxScore) * (H - PAD * 2);

function bestFit(data) {
  const n = data.length;
  const sumX = data.reduce((a, d) => a + d.hours, 0);
  const sumY = data.reduce((a, d) => a + d.score, 0);
  const sumXY = data.reduce((a, d) => a + d.hours * d.score, 0);
  const sumXX = data.reduce((a, d) => a + d.hours * d.hours, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}
function sse(line, data) {
  return data.reduce((acc, d) => acc + Math.pow(line.slope * d.hours + line.intercept - d.score, 2), 0);
}

const target = bestFit(studyScoreDataset);
const initialGuess = { slope: 2, intercept: 80 };
const startError = sse(initialGuess, studyScoreDataset);
const finalError = sse(target, studyScoreDataset);

function lerp(a, b, t) { return a + (b - a) * t; }
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

export default function LinearRegressionSim() {
  const [line, setLine] = useState(initialGuess);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [predictHours, setPredictHours] = useState(6);
  const [steps, setSteps] = useState([]);

  const totalSteps = 10;
  const currentError = sse(line, studyScoreDataset);

  async function runFit() {
    setRunning(true);
    setSteps([`Starting guess: y = ${initialGuess.slope.toFixed(2)}x + ${initialGuess.intercept.toFixed(2)}. Total squared error across all ${studyScoreDataset.length} points: ${startError.toFixed(0)}.`]);
    await sleep(600);

    for (let i = 1; i <= totalSteps; i++) {
      const t = i / totalSteps;
      const eased = 1 - Math.pow(1 - t, 3);
      const newLine = {
        slope: lerp(initialGuess.slope, target.slope, eased),
        intercept: lerp(initialGuess.intercept, target.intercept, eased),
      };
      setLine(newLine);
      setStep(i);
      if (i === Math.round(totalSteps * 0.3) || i === Math.round(totalSteps * 0.6)) {
        setSteps((s) => [...s, `Nudging slope and intercept downhill on the error surface — error now ${sse(newLine, studyScoreDataset).toFixed(0)}, down from ${startError.toFixed(0)}.`]);
      }
      await sleep(260);
    }
    setSteps((s) => [...s, `Converged. Final line: y = ${target.slope.toFixed(2)}x + ${target.intercept.toFixed(2)}, minimum possible error for a straight line: ${finalError.toFixed(0)}.`]);
    setRunning(false);
  }

  function reset() {
    setLine(initialGuess);
    setStep(0);
    setSteps([]);
  }

  const predictedScore = Math.min(100, Math.max(0, line.slope * predictHours + line.intercept));
  const converged = step === totalSteps;

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-violet mb-2">Simulation Engine</p>
      <h1 className="font-display font-bold text-3xl mb-2">Linear Regression — Study hours → Exam score</h1>
      <p className="text-dim mb-8">Watch the line minimize real squared error, not just move for show.</p>

      <ConceptCard
        accent="violet"
        tagline="Linear regression looks for the one straight line that stays, on average, as close as possible to every data point — measured by squaring each miss so big errors count more than small ones."
        points={[
          { label: "Draw the vertical gap (residual) from each point to the line.", text: "That gap is the model's error for that one example. Watch the dashed lines below — they shrink as the fit improves." },
          { label: "Square every residual and add them up.", text: "This total is the Sum of Squared Errors (SSE). Squaring punishes big misses much more than small ones, so the line can't ignore outliers." },
          { label: "Adjust slope and intercept to shrink that total.", text: "This is gradient descent: nudge the line's parameters in whichever direction reduces SSE, repeat until it stops improving." },
          { label: "Stop at the minimum — the least-squares line.", text: `Here that's y = ${target.slope.toFixed(2)}x + ${target.intercept.toFixed(2)}, found analytically rather than by trial and error, but the animation shows what the descent path looks like.` },
        ]}
        note="Real gradient descent takes many small steps guided by calculus (the derivative of the error). We're animating a smoothed path to the same destination so the convergence is visible instead of instant."
      />

      <div className="border border-edge rounded-xl bg-surface p-6 grid md:grid-cols-[1fr_240px] gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <button onClick={runFit} disabled={running}
              className="px-5 py-2 rounded-lg bg-violet text-bg font-mono text-xs font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity">
              {running ? "Fitting…" : "▶ Run gradient descent"}
            </button>
            <button onClick={reset} className="px-4 py-2 rounded-lg border border-edge text-dim font-mono text-xs hover:text-ink transition-colors">
              Reset
            </button>
            <span className="ml-auto font-mono text-[10px] text-dim">step {step}/{totalSteps}</span>
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto bg-surface2 rounded-lg border border-edge">
            <text x={W/2} y={H-8} textAnchor="middle" fontSize="10" className="fill-dim font-mono">Study hours →</text>
            <text x={14} y={H/2} textAnchor="middle" fontSize="10" className="fill-dim font-mono" transform={`rotate(-90 14 ${H/2})`}>Exam score →</text>

            {studyScoreDataset.map((d, i) => {
              const predicted = line.slope * d.hours + line.intercept;
              return (
                <line key={`res-${i}`} x1={scaleX(d.hours)} y1={scaleY(d.score)}
                  x2={scaleX(d.hours)} y2={scaleY(Math.max(0, Math.min(100, predicted)))}
                  stroke="#F2748C" strokeWidth="1.2" strokeDasharray="3 2" opacity={step > 0 || running ? 0.7 : 0.3} />
              );
            })}

            {studyScoreDataset.map((d, i) => (
              <circle key={i} cx={scaleX(d.hours)} cy={scaleY(d.score)} r="5" fill="#5EEAD4" />
            ))}

            <line
              x1={scaleX(0)} y1={scaleY(Math.max(0, Math.min(100, line.intercept)))}
              x2={scaleX(maxHours)} y2={scaleY(Math.max(0, Math.min(100, line.slope * maxHours + line.intercept)))}
              stroke={converged ? "#5EEAD4" : "#8B7FF0"} strokeWidth="2.5"
            />

            {predictHours != null && (
              <>
                <line x1={scaleX(predictHours)} y1={scaleY(0)} x2={scaleX(predictHours)} y2={scaleY(predictedScore)}
                  stroke="#F5B85C" strokeWidth="1.2" strokeDasharray="4 3" />
                <circle cx={scaleX(predictHours)} cy={scaleY(predictedScore)} r="6" fill="#F5B85C" />
              </>
            )}
          </svg>
          <StepLog steps={steps} accent="violet" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="border border-edge rounded-lg p-4 bg-surface2">
            <p className="font-mono text-[10px] uppercase text-dim mb-1">Total squared error</p>
            <p className={`font-display font-semibold text-2xl ${converged ? "text-cyan" : "text-signal"}`}>{currentError.toFixed(0)}</p>
            <p className="text-[11px] text-dim mt-1">lower is better · starts at {startError.toFixed(0)}</p>
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-dim">Predict for hours = {predictHours}</label>
            <input type="range" min="0" max="10" step="0.5" value={predictHours}
              onChange={(e) => setPredictHours(Number(e.target.value))} className="accent-amber w-full mt-2" />
          </div>
          <div className="border border-edge rounded-lg p-4 bg-surface2">
            <p className="font-mono text-[10px] uppercase text-dim mb-1">Predicted score</p>
            <p className="font-display font-semibold text-2xl text-amber">{predictedScore.toFixed(1)}</p>
          </div>
          <div className="font-mono text-[11px] text-dim leading-relaxed">
            line: y = {line.slope.toFixed(2)}x + {line.intercept.toFixed(2)}
          </div>
        </div>
      </div>

      <ExplanationPanel
        algorithm="linearRegression"
        context={{ slope: line.slope, intercept: line.intercept, predictHours, predictedScore, sse: currentError, converged }}
        fallback={`Linear regression finds the line minimizing total squared distance to every point — currently ${currentError.toFixed(0)}, down from a starting error of ${startError.toFixed(0)}. The final line is y = ${target.slope.toFixed(2)}x + ${target.intercept.toFixed(2)}, so studying ${predictHours} hours predicts a score of about ${predictedScore.toFixed(1)}.`}
      />
    </section>
  );
}
