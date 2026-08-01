import { useState } from "react";

const starterMessages = [
  { role: "tutor", text: "Hey! I'm your AI tutor. Ask me anything about Decision Trees, KNN, Linear Regression, or Neural Networks — or run a simulation first and ask about what you just saw." },
];

export default function AITutor() {
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ algorithm: "tutorChat", context: { question: userMsg.text } }),
      });
      if (!res.ok) throw new Error("no backend yet");
      const data = await res.json();
      setMessages((m) => [...m, { role: "tutor", text: data.explanation }]);
    } catch {
      setMessages((m) => [...m, {
        role: "tutor",
        text: "⚠ Demo mode — this reuses the same POST /api/explain endpoint as the inline explanations. Once your Express + Gemini backend is live, real answers will appear here.",
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-cyan mb-2">AI Tutor</p>
      <h1 className="font-display font-bold text-3xl mb-2">Ask about any algorithm</h1>
      <p className="text-dim mb-8">This chat calls the same backend endpoint as the inline explanations — one Gemini integration, two surfaces.</p>

      <div className="border border-edge rounded-xl bg-surface flex flex-col h-[480px]">
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user" ? "bg-cyan text-bg" : "bg-surface2 border border-edge text-ink"
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-dim font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse-glow" /> thinking…
            </div>
          )}
        </div>
        <div className="border-t border-edge p-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="e.g. Why does KNN care about K?"
            className="flex-1 bg-surface2 border border-edge rounded-md px-3 py-2 text-sm focus:outline-none focus:border-cyan/50"
          />
          <button onClick={send} className="px-4 py-2 rounded-md bg-cyan text-bg font-mono text-xs font-semibold hover:opacity-90 transition-opacity">
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
