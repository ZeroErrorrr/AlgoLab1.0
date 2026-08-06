import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function GlowPlatform() {
  const baseRef = useRef();
  const ringRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (baseRef.current) {
      baseRef.current.position.y = 0.15 + Math.sin(t * 0.8) * 0.08;
      baseRef.current.rotation.y = t * 0.12;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.25;
    }
  });

  return (
    <group>
      <mesh ref={baseRef} receiveShadow castShadow>
        <cylinderGeometry args={[2.2, 2.2, 0.12, 64]} />
        <meshStandardMaterial
          color="#122232"
          emissive="#5EEAD4"
          emissiveIntensity={0.4}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.22, 0]}>
        <ringGeometry args={[2.32, 2.5, 64]} />
        <meshBasicMaterial color="#5EEAD4" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[2.55, 2.62, 64]} />
        <meshBasicMaterial color="#F5B85C" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      <pointLight position={[0, 0.6, 0]} color="#5EEAD4" intensity={1.6} distance={7} />
    </group>
  );
}
