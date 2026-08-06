import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function DecisionPacket({ path }) {
  const packet = useRef();
  const glow = useRef();

  useFrame(({ clock }) => {
    if (!packet.current || !glow.current) return;

    // Repeat animation forever
    const t = (clock.elapsedTime * 0.45) % 2;

    let start;
    let end;
    let progress;

    if (t < 1) {
      start = path[0];
      end = path[1];
      progress = t;
    } else {
      start = path[1];
      end = path[2];
      progress = t - 1;
    }

    const position = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...start),
      new THREE.Vector3(...end),
      progress
    );

    packet.current.position.copy(position);
    glow.current.position.copy(position);

    glow.current.scale.setScalar(
      1.5 + Math.sin(clock.elapsedTime * 8) * 0.2
    );
  });

  return (
    <>
      {/* Glow */}
      <mesh ref={glow}>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshBasicMaterial
          color="#FFD54A"
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Packet */}
      <mesh ref={packet}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshBasicMaterial color="#FFD54A" />
      </mesh>
    </>
  );
}