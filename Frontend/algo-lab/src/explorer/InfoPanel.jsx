import { useNeuron } from "./NeuronContext";

export default function InfoPanel() {
  const { selectedNeuron } = useNeuron();

  return (
    <aside className="w-72 shrink-0 border-l border-edge bg-surface/70 backdrop-blur p-5 flex flex-col gap-6 overflow-y-auto">

      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-amber mb-1">
          System Readout
        </p>

        <h2 className="font-display font-semibold text-lg">
          Lab Environment
        </h2>
      </div>

      <div className="flex flex-col gap-3 font-mono text-xs">
        <ReadoutRow label="Status" value="Online" color="text-cyan" />
        <ReadoutRow label="Platform" value="Ready" color="text-cyan" />
        <ReadoutRow label="Particles" value="Active" color="text-amber" />
        <ReadoutRow label="Camera" value="Orbit Controls" color="text-dim" />
      </div>

      <div className="pt-4 border-t border-edge">

        {selectedNeuron ? (
          <>
            <h3 className="text-lg font-semibold text-cyan mb-4">
              {selectedNeuron.label}
            </h3>

            <div className="space-y-3 text-sm">

              <div>
                <span className="text-dim">Color</span>
                <p>{selectedNeuron.color}</p>
              </div>

              <div>
                <span className="text-dim">Type</span>
                <p>
                  {selectedNeuron.leaf
                    ? "Leaf Node"
                    : "Decision Node"}
                </p>
              </div>

              <div>
                <span className="text-dim">Status</span>
                <p className="text-cyan">
                  Selected
                </p>
              </div>

            </div>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold">
              Algorithm Explorer
            </h3>

            <p className="mt-3 text-sm text-dim leading-relaxed">
              Click any neuron or decision node to inspect it.
            </p>
          </>
        )}

      </div>

      <div className="mt-auto pt-4 border-t border-edge">
        <p className="text-[11px] text-dim">
          Interactive AI Algorithm Visualizer
        </p>
      </div>

    </aside>
  );
}

function ReadoutRow({ label, value, color }) {
  return (
    <div className="flex items-center justify-between border-b border-edge/50 pb-2">
      <span className="text-dim uppercase tracking-wide">
        {label}
      </span>

      <span className={color}>
        {value}
      </span>
    </div>
  );
}