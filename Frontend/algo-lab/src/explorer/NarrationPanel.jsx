export default function NarrationPanel({ algorithm }) {

  const messages = {
    neural: "⚡ Signals are travelling through the neural network...",
    tree: "🌳 The tree is asking questions to make a decision...",
    knn: "👥 Looking at the nearest neighbours...",
    linear: "📈 Finding the best fitting line..."
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[700px] z-20">

      <div className="backdrop-blur-xl bg-slate-900/50 border border-cyan-500/30 rounded-2xl p-6">

        <p className="text-cyan-200 text-lg">

          {messages[algorithm]}

        </p>

      </div>

    </div>
  );
}