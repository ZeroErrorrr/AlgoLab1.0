import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ---------- Inline icons (no external icon lib required) ----------
const IconCalendar = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconZap = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
  </svg>
);

const IconFlame = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2c1.2 3.6-2.4 4.8-2.4 8.4a2.4 2.4 0 0 0 4.8 0c0-.8-.4-1.6-.8-1.6.8 0 2.4 1.2 2.4 3.6A4.4 4.4 0 0 1 7.2 12.4C7.2 8 11 6.8 11 4a2 2 0 0 1 1-2z" />
  </svg>
);

const IconTarget = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconTrophy = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
    <path d="M5 4H3a2 2 0 0 0 0 4h2" />
    <path d="M19 4h2a2 2 0 0 1 0 4h-2" />
  </svg>
);

const IconAward = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="8" r="6" />
    <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
  </svg>
);

const IconStar = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
  </svg>
);

const IconCheck = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

// ---------- Data ----------
const dailyChallenges = [
  { id: 1, day: 1, title: "Decision Tree Explorer", algorithm: "Decision Tree", difficulty: "Easy", xp: 50, route: "/sim/decision-tree", description: "Build a Decision Tree and classify at least 5 different inputs correctly.", objective: "Complete one Decision Tree simulation." },
  { id: 2, day: 2, title: "KNN Neighbor Hunt", algorithm: "KNN", difficulty: "Easy", xp: 60, route: "/sim/knn", description: "Experiment with different K values and observe how predictions change.", objective: "Try K = 1, 3 and 5." },
  { id: 3, day: 3, title: "Linear Regression Predictor", algorithm: "Linear Regression", difficulty: "Medium", xp: 80, route: "/sim/linear-regression", description: "Train a Linear Regression model and understand how the best-fit line changes.", objective: "Predict at least 5 values." },
  { id: 4, day: 4, title: "Neural Network Trainer", algorithm: "Neural Network", difficulty: "Hard", xp: 120, route: "/sim/neural-network", description: "Train a Neural Network and visualize how it learns from data.", objective: "Complete one full training session." },
  { id: 5, day: 5, title: "Accuracy Master", algorithm: "Any Model", difficulty: "Medium", xp: 50, route: "/sim/neural-network", description: "Train any model to achieve 95%+ accuracy on the moons dataset.", objective: "95% accuracy on moons." },
  { id: 6, day: 6, title: "Overfitting Buster", algorithm: "Decision Tree", difficulty: "Medium", xp: 75, route: "/sim/decision-tree", description: "Train a decision tree with max depth ≤ 3 that still gets 85%+ accuracy.", objective: "85%+ at depth ≤ 3." },
  { id: 7, day: 7, title: "XOR Conqueror", algorithm: "Neural Network", difficulty: "Hard", xp: 100, route: "/sim/neural-network", description: "Achieve 90%+ accuracy on the XOR dataset using any model.", objective: "90% on XOR." },
  { id: 8, day: 8, title: "Speed Demon", algorithm: "Neural Network", difficulty: "Medium", xp: 60, route: "/sim/neural-network", description: "Train a model in under 100 epochs that reaches 90%+ accuracy.", objective: "90% in <100 epochs." },
  { id: 9, day: 9, title: "Spiral Solver", algorithm: "Neural Network", difficulty: "Hard", xp: 120, route: "/sim/neural-network", description: "Get 85%+ accuracy on the spiral dataset.", objective: "85% on spirals." },
  { id: 10, day: 10, title: "Precision Pro", algorithm: "Neural Network", difficulty: "Medium", xp: 80, route: "/sim/neural-network", description: "Train a model with precision above 0.9.", objective: "Precision > 0.9." },
  { id: 11, day: 11, title: "Perfect F1", algorithm: "Neural Network", difficulty: "Hard", xp: 150, route: "/sim/neural-network", description: "Achieve an F1 score above 0.95.", objective: "F1 > 0.95." },
];

const achievements = [
  { title: "First Steps", Icon: IconStar, check: (c) => c.length >= 1 },
  { title: "3-Day Streak", Icon: IconFlame, check: (_c, _xp, streak) => streak >= 3 },
  { title: "100 XP", Icon: IconZap, check: (_c, xp) => xp >= 100 },
  { title: "300 XP", Icon: IconAward, check: (_c, xp) => xp >= 300 },
  { title: "Hat Trick", Icon: IconTarget, check: (c) => c.length >= 3 },
  { title: "Completionist", Icon: IconTrophy, check: (c) => c.length >= dailyChallenges.length },
];

export default function DailyChallenges() {
  const navigate = useNavigate();

  const today = useMemo(() => {
    const start = new Date(new Date().getFullYear(), 0, 0);
    const dayOfYear = Math.floor((Date.now() - start.getTime()) / 86400000);
    return dailyChallenges[dayOfYear % dailyChallenges.length];
  }, []);

  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("daily-completed");
    return saved ? JSON.parse(saved) : [];
  });

  const [xp, setXp] = useState(() => Number(localStorage.getItem("daily-xp")) || 0);
  const [streak, setStreak] = useState(() => Number(localStorage.getItem("daily-streak")) || 0);

  const isTodayDone = completed.includes(today.id);
  const level = Math.floor(xp / 100) + 1;
  const xpInLevel = xp % 100;

  function claimReward() {
    if (isTodayDone) return;

    const updatedCompleted = [...completed, today.id];
    const updatedXp = xp + today.xp;
    const updatedStreak = streak + 1;

    setCompleted(updatedCompleted);
    setXp(updatedXp);
    setStreak(updatedStreak);

    localStorage.setItem("daily-completed", JSON.stringify(updatedCompleted));
    localStorage.setItem("daily-xp", String(updatedXp));
    localStorage.setItem("daily-streak", String(updatedStreak));
  }

  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center">
              <IconCalendar className="w-4 h-4 text-amber-300" />
            </div>
            <h1 className="text-xl font-semibold">Daily Challenge</h1>
          </div>
          <p className="text-sm text-dim max-w-xl">
            One ML challenge every day. Earn XP, build streaks, unlock badges.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          <div className="rounded-xl border border-edge bg-surface px-5 py-4">
            <p className="text-[11px] uppercase tracking-wider text-dim mb-1">Level</p>
            <p className="text-2xl font-semibold text-amber-300">{level}</p>
            <p className="text-[11px] text-dim mt-1">{xpInLevel}/100 XP to next</p>
          </div>

          <div className="rounded-xl border border-edge bg-surface px-5 py-4">
            <p className="text-[11px] uppercase tracking-wider text-dim mb-1">Total XP</p>
            <p className="text-2xl font-semibold text-cyan">{xp}</p>
          </div>

          <div className="rounded-xl border border-edge bg-surface px-5 py-4">
            <p className="text-[11px] uppercase tracking-wider text-dim mb-1">Streak</p>
            <p className="text-2xl font-semibold text-red-400">
              {streak} day{streak !== 1 ? "s" : ""}
            </p>
            <p className="text-[11px] text-dim mt-1">Keep it going!</p>
          </div>

          <div className="rounded-xl border border-edge bg-surface px-5 py-4">
            <p className="text-[11px] uppercase tracking-wider text-dim mb-1">Completed</p>
            <p className="text-2xl font-semibold text-green-400">
              {completed.length}/{dailyChallenges.length}
            </p>
          </div>
        </div>

        {/* XP bar */}
        <div className="rounded-xl border border-edge bg-surface px-5 py-4 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-dim">Level {level} progress</span>
            <span className="font-mono text-xs text-amber-300">{xpInLevel}/100 XP</span>
          </div>
          <div className="h-2 rounded-full bg-surface2 overflow-hidden">
            <motion.div
              animate={{ width: `${xpInLevel}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-amber-400 to-red-400 rounded-full"
            />
          </div>
        </div>

        {/* Today's Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <div className={`rounded-2xl border p-6 bg-surface ${isTodayDone ? "border-green-500/25" : "border-amber-400/25"}`}>
            <div className="flex items-start justify-between mb-4 gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[10px] font-medium tracking-wide uppercase bg-amber-500/10 text-amber-300 border border-amber-400/25 px-2.5 py-1 rounded-full">
                    Day {today.day} · Today
                  </span>
                  {isTodayDone && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-green-500/10 text-green-400 border border-green-500/25 px-2.5 py-1 rounded-full">
                      <IconTrophy className="w-3 h-3" /> Completed
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-semibold mb-1.5">{today.title}</h2>
                <p className="text-sm text-dim leading-relaxed max-w-md">{today.description}</p>
              </div>

              <div className="text-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center mx-auto">
                  <IconZap className="w-5 h-5 text-amber-300" />
                </div>
                <p className="text-xs font-medium text-amber-300 mt-1.5">+{today.xp} XP</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-5 text-sm">
              <IconTarget className="w-3.5 h-3.5 text-cyan shrink-0" />
              <span className="text-dim">
                Goal: <span className="text-ink font-medium">{today.objective}</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => navigate(today.route)}
                className="px-5 py-2.5 rounded-lg bg-cyan text-bg text-sm font-medium hover:scale-[1.02] transition"
              >
                Launch Challenge
              </button>

              <button
                onClick={claimReward}
                disabled={isTodayDone}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition inline-flex items-center gap-1.5 ${
                  isTodayDone
                    ? "bg-surface2 text-dim cursor-not-allowed"
                    : "bg-amber-400 text-black hover:scale-[1.02]"
                }`}
              >
                {isTodayDone ? (
                  <>
                    <IconCheck className="w-4 h-4" /> Challenge Completed
                  </>
                ) : (
                  <>Claim {today.xp} XP</>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* All Challenges */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-dim mb-3">
            All Challenges
          </h2>

          <div className="space-y-2">
            {dailyChallenges.map((c) => {
              const isDone = completed.includes(c.id);
              const isToday = c.id === today.id;

              return (
                <div
                  key={c.id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${
                    isToday ? "border-amber-400/20 bg-amber-500/5" : "border-edge bg-surface"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isDone ? "bg-green-500/15" : "bg-surface2"
                    }`}
                  >
                    {isDone ? (
                      <IconTrophy className="w-4 h-4 text-green-400" />
                    ) : (
                      <IconCalendar className="w-4 h-4 text-dim" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{c.title}</p>
                    <p className="text-xs text-dim truncate">{c.objective}</p>
                  </div>

                  <span className="font-mono text-xs text-amber-300 shrink-0">+{c.xp} XP</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-dim mb-3">
            Achievements
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {achievements.map((badge) => {
              const unlocked = badge.check(completed, xp, streak);
              const Icon = badge.Icon;

              return (
                <div
                  key={badge.title}
                  className={`flex flex-col items-center text-center p-3 rounded-xl border transition ${
                    unlocked
                      ? "border-amber-400/25 bg-amber-400/5"
                      : "border-edge bg-surface2 opacity-40"
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1.5 ${unlocked ? "text-amber-300" : "text-dim"}`} />
                  <p className="text-[10px] leading-tight">{badge.title}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}