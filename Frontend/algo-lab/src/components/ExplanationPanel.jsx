import { useState } from "react";

/**
 * Implements the "Need AI Explanation? NO / YES" branch from the architecture diagram.
 *
 * On YES, this calls POST /api/explain on your Node + Express backend, which
 * should call the Gemini API and return { explanation: string }.
 *
 * Until that backend exists, calls will fail and this panel falls back to a
 * canned explanation so the frontend demo never breaks on stage.
 *
 * `context` should describe what just happened in the simulation, e.g.
 * { algorithm: "decisionTree", outlook: "sunny", humidity: "high", result: "Don't play" }
 */
export default function ExplanationPanel({ algorithm, context, fallback }) {
  const [asked, setAsked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  async function handleYes() {
    setAsked(true);
    setLoading(true);
    setExplanation(null);
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ algorithm, context }),
      });
      if (!res.ok) throw new Error("backend not ready");
      const data = await res.json();
      setExplanation(data.explanation);
      setIsFallback(false);
    } catch (err) {
      // backend isn't wired up yet — show a demo explanation instead
      setExplanation(fallback);
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 border border-edge rounded-xl bg-surface p-5">
      {!asked && (
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-dim mb-1">Need AI Explanation?</p>
            <p className="text-sm text-dim">Ask the AI tutor to walk through why this happened.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setAsked(true)}
              className="px-4 py-2 rounded-lg border border-edge text-dim text-xs font-mono hover:text-ink transition-colors"
            >
              No thanks
            </button>
            <button
              onClick={handleYes}
              className="px-4 py-2 rounded-lg bg-cyan text-bg text-xs font-mono font-semibold hover:opacity-90 transition-opacity"
            >
              Yes, explain →
            </button>
          </div>
        </div>
      )}

      {asked && loading && (
        <div className="flex items-center gap-3 text-dim font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-amber animate-pulse-glow" />
          Calling Gemini via your Express API…
        </div>
      )}

      {asked && !loading && explanation && (
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-cyan mb-2">AI Explanation</p>
          <p className="text-sm leading-relaxed text-ink">{explanation}</p>
          {isFallback && (
            <p className="mt-3 text-[11px] font-mono text-dim border-t border-edge pt-2">
              ⚠ Demo response — connect your Express + Gemini backend at{" "}
              <code className="text-amber">POST /api/explain</code> to enable live answers.
            </p>
          )}
        </div>
      )}

      {asked && !loading && !explanation && (
        <p className="text-sm text-dim">No explanation needed — nice, saved an API call.</p>
      )}
    </div>
  );
}
