import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function DataPacket({
  start,
  end,
  color = "#FFD54A",
  speed = 0.8,
}) {
  const ref = useRef();

  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = (clock.elapsedTime * speed) % 1;

    ref.current.position.lerpVectors(startVec, endVec, t);

    ref.current.scale.setScalar(
      1 + Math.sin(clock.elapsedTime * 8) * 0.2
    );
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08,24,24]} />
      <meshBasicMaterial
color="#FFF176"
/> 
    </mesh>
  );
}