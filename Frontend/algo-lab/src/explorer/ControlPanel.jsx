export default function ControlPanel({
    algorithm,
    setAlgorithm,

    autoRotate,
    setAutoRotate,

    showParticles,
    setShowParticles,

    gridVisible,
    setGridVisible
})  {
  return (
    <aside className="w-64 shrink-0 border-r border-edge bg-surface/70 backdrop-blur p-5 flex flex-col gap-6 overflow-y-auto">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-cyan mb-1">Algorithm Explorer</p>
        <h2 className="font-display font-semibold text-lg">Control Panel</h2>
      </div>

      <div className="flex flex-col gap-4">
        <ToggleRow label="Auto-rotate" checked={autoRotate} onChange={setAutoRotate} accent="cyan" />
        <ToggleRow label="Particles" checked={showParticles} onChange={setShowParticles} accent="amber" />
        <ToggleRow label="Grid floor" checked={gridVisible} onChange={setGridVisible} accent="cyan" />
      </div>

      <div className="pt-4 border-t border-edge">
        <p className="font-mono text-[10px] uppercase tracking-widest text-dim mb-2">Algorithm</p>
        <div className="relative">
         <select
    value={algorithm}
    onChange={(e) => setAlgorithm(e.target.value)}
    className="w-full bg-surface2 border border-edge rounded-md px-3 py-2 text-sm"
>

    <option>Neural Network</option>

    <option>Decision Tree</option>

    <option>KNN</option>

    <option>Linear Regression</option>

</select>
          <span className="absolute -top-2 right-2 bg-amber text-bg text-[9px] font-mono px-1.5 py-0.5 rounded">SOON</span>
        </div>
        <p className="text-xs text-dim mt-2 leading-relaxed">
          Algorithm models will drop into this space next — for now, this is just the environment.
        </p>
      </div>
    </aside>
  );
}

function ToggleRow({ label, checked, onChange, accent }) {
  const dot = accent === "cyan" ? "bg-cyan" : "bg-amber";
  const track = checked ? (accent === "cyan" ? "bg-cyan/30" : "bg-amber/30") : "bg-surface2 border border-edge";
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-ink/90">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-9 h-5 rounded-full relative transition-colors ${track}`}
        aria-pressed={checked}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${checked ? `right-0.5 ${dot}` : "left-0.5 bg-dim"}`} />
      </button>
    </div>
  );
}
