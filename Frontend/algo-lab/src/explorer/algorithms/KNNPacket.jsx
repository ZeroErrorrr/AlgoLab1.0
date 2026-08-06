import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function KNNPacket({
  start,
  end,
  speed = 0.8,
}) {
  const packet = useRef();
  const glow = useRef();

  useFrame(({ clock }) => {

    if (!packet.current || !glow.current) return;

    const t =
      (clock.elapsedTime * speed) % 1;

    const pos = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...start),
      new THREE.Vector3(...end),
      t
    );

    packet.current.position.copy(pos);
    glow.current.position.copy(pos);

    glow.current.scale.setScalar(
      1.6 +
      Math.sin(clock.elapsedTime * 8) * 0.2
    );

  });

  return (
    <>
      <mesh ref={glow}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshBasicMaterial
          color="#FFD54A"
          transparent
          opacity={0.25}
        />
      </mesh>

      <mesh ref={packet}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshBasicMaterial
          color="#FFD54A"
        />
      </mesh>
    </>
  );
}