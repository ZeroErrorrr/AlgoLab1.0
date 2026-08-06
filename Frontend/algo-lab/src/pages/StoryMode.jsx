import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import storyData from "../data/storyData";

// ---------- Inline icons (no external icon lib required) ----------
const IconBook = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const IconPlay = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

const IconCheckCircle = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconChevronRight = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const IconSparkle = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" />
  </svg>
);

export default function StoryMode() {
  const navigate = useNavigate();

  const [selectedStory, setSelectedStory] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [completedStories, setCompletedStories] = useState(() => {
    const saved = localStorage.getItem("story-progress");
    return saved ? JSON.parse(saved) : [];
  });

  const openStory = (story) => {
    setSelectedStory(story);
    setCurrentSlide(0);
  };

  function goToSim(algorithm) {
    switch (algorithm) {
      case "Logistic Regression":
        navigate("/sim/linear-regression");
        break;
      case "Decision Tree":
        navigate("/sim/decision-tree");
        break;
      case "KNN":
        navigate("/sim/knn");
        break;
      case "Neural Network":
        navigate("/sim/neural-network");
        break;
      default:
        navigate("/hub");
    }
  }

  // ---------- LIST VIEW ----------
  if (!selectedStory) {
    return (
      <div className="min-h-screen bg-bg text-ink">
        <div className="max-w-4xl mx-auto px-4 py-6">

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center">
                <IconBook className="w-4 h-4 text-amber-300" />
              </div>
              <h1 className="text-xl font-semibold">Story Mode</h1>
            </div>
            <p className="text-sm text-dim max-w-xl">
              Every ML concept starts with a story. Build intuition before the
              math. {completedStories.length} / {storyData.length} stories
              completed.
            </p>
          </div>

          {/* Story grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {storyData.map((story) => {
              const completed = completedStories.includes(story.id);

              return (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                  className={`rounded-2xl border p-5 cursor-pointer transition ${
                    completed
                      ? "border-green-500/25 bg-surface"
                      : "border-edge bg-surface"
                  }`}
                  onClick={() => openStory(story)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-medium tracking-wide uppercase bg-amber-500/10 text-amber-300 border border-amber-400/25 px-2.5 py-1 rounded-full">
                      {story.concept}
                    </span>

                    {completed ? (
                      <IconCheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                    ) : (
                      <IconPlay className="w-4 h-4 text-dim shrink-0" />
                    )}
                  </div>

                  <h2 className="text-base font-semibold mb-0.5">{story.title}</h2>
                  <p className="text-xs text-dim mb-3">{story.topic}</p>

                  <p className="text-sm text-dim leading-relaxed line-clamp-2 mb-3">
                    {story.scenario}
                  </p>

                  <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan">
                    Read story <IconChevronRight className="w-3 h-3" />
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ---------- STORY DETAIL VIEW ----------
  const story = selectedStory;
  const slide = story.slides[currentSlide];
  const isLastSlide = currentSlide === story.slides.length - 1;

  function goBack() {
    setSelectedStory(null);
    setCurrentSlide(0);
  }

  function nextSlide() {
    if (currentSlide < story.slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
      return;
    }

    if (!completedStories.includes(story.id)) {
      const updated = [...completedStories, story.id];
      setCompletedStories(updated);
      localStorage.setItem("story-progress", JSON.stringify(updated));
    }
  }

  function previousSlide() {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  }

  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex items-start justify-between mb-4 gap-4">
          <div className="min-w-0">
            <h1 className="text-lg font-semibold">{story.title}</h1>
            <p className="text-xs text-dim mt-0.5">{story.topic}</p>
          </div>

          <button
            onClick={goBack}
            className="px-4 py-2 rounded-lg bg-surface2 text-ink text-sm font-medium hover:bg-surface transition shrink-0"
          >
            Back to stories
          </button>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-6">
          {story.slides.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                index <= currentSlide ? "bg-amber-400" : "bg-surface2"
              }`}
            />
          ))}
        </div>

        {/* Slide */}
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="rounded-2xl border border-edge bg-surface min-h-[280px] flex items-center justify-center p-8 text-center">
            <div className="text-4xl md:text-5xl font-semibold">{slide.visual}</div>
          </div>

          <p className="mt-6 text-sm text-dim leading-relaxed">{slide.text}</p>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={previousSlide}
            disabled={currentSlide === 0}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              currentSlide === 0
                ? "bg-surface2 text-dim cursor-not-allowed"
                : "bg-surface2 text-ink hover:bg-surface"
            }`}
          >
            Previous
          </button>

          <div className="text-xs text-dim">
            {currentSlide + 1} / {story.slides.length}
          </div>

          <button
            onClick={nextSlide}
            className="px-4 py-2 rounded-lg bg-cyan text-bg text-sm font-medium hover:scale-[1.02] transition inline-flex items-center gap-1.5"
          >
            {isLastSlide ? (
              <>
                <IconCheckCircle className="w-4 h-4" /> Complete Story
              </>
            ) : (
              <>
                Next <IconChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Key takeaway (shown on final slide) */}
        {isLastSlide && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-green-500/25 bg-green-500/5 p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <IconSparkle className="w-4 h-4 text-green-300" />
              <h3 className="text-sm font-semibold text-green-300">Key Takeaway</h3>
            </div>

            <p className="text-sm text-dim leading-relaxed mb-4">{story.takeaway}</p>

            <button
              onClick={() => goToSim(story.algorithm)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan text-bg text-sm font-medium hover:scale-[1.02] transition"
            >
              Try it in Algorithm Hub <IconChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}