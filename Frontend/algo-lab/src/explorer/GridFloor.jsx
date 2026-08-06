import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";

export default function GridFloor({ visible = true }) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });

  if (!visible) return null;

  return (
    <group ref={ref} position={[0, -0.05, 0]}>
      <Grid
        args={[40, 40]}
        cellSize={0.6}
        cellThickness={0.6}
        cellColor="#1B2338"
        sectionSize={3}
        sectionThickness={1.2}
        sectionColor="#5EEAD4"
        fadeDistance={22}
        fadeStrength={1.5}
        infiniteGrid
      />
    </group>
  );
}
