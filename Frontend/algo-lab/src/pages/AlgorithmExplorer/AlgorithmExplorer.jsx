import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { NeuronProvider } from "../../explorer/NeuronContext";

import ControlPanel from "../../explorer/ControlPanel";
import InfoPanel from "../../explorer/InfoPanel";
import Scene from "../../explorer/Scene";

export default function AlgorithmExplorer() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showParticles, setShowParticles] = useState(true);
  const [gridVisible, setGridVisible] = useState(true);

  const [algorithm, setAlgorithm] = useState("Neural Network");

  return (
    <NeuronProvider>
      <section className="h-[calc(100vh-64px)] flex bg-bg text-ink overflow-hidden">

        <ControlPanel
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          autoRotate={autoRotate}
          setAutoRotate={setAutoRotate}
          showParticles={showParticles}
          setShowParticles={setShowParticles}
          gridVisible={gridVisible}
          setGridVisible={setGridVisible}
        />

        <div className="flex-1 relative">
          <Canvas
            camera={{
              position: [0, 0, 12],
              fov: 45,
            }}
            gl={{ antialias: true }}
            shadows
          >
            <color attach="background" args={["#0A0E17"]} />
            <fog attach="fog" args={["#0A0E17", 8, 22]} />

            <ambientLight
              intensity={0.35}
              color="#5EEAD4"
            />

            <directionalLight
              position={[5, 8, 5]}
              intensity={0.7}
              color="#E4E8F1"
              castShadow
            />

            <pointLight
              position={[-4, 2, 2]}
              intensity={2.2}
              color="#5EEAD4"
              distance={12}
            />

            <pointLight
              position={[4, 2, -2]}
              intensity={2.2}
              color="#F5B85C"
              distance={12}
            />

            <Suspense fallback={null}>
              <Scene algorithm={algorithm} />
            </Suspense>

            <OrbitControls
              makeDefault
              enableRotate
              enableZoom
              enablePan
              autoRotate={autoRotate}
              autoRotateSpeed={0.25}
              minDistance={4}
              maxDistance={25}
              minPolarAngle={0}
              maxPolarAngle={Math.PI}
              rotateSpeed={0.8}
              zoomSpeed={1}
              panSpeed={0.8}
            />

          </Canvas>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60" />
        </div>

        <InfoPanel />

      </section>
    </NeuronProvider>
  );
}