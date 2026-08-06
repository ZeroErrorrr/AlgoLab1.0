import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useNeuron } from "../NeuronContext";

export default function TreeNode({
  position,
  label,
  color,
  leaf = false,
}) {
  const mesh = useRef();
  const glow = useRef();

  const [hovered, setHovered] = useState(false);

  const { selectedNeuron, setSelectedNeuron } = useNeuron();

  const selected = selectedNeuron?.label === label;

  useFrame(({ clock }) => {
    if (!mesh.current || !glow.current) return;

    const pulse =
      1 +
      Math.sin(clock.elapsedTime * 2 + position[0]) * 0.05;

    mesh.current.scale.setScalar(
      selected ? 1.35 : hovered ? 1.15 : pulse
    );

    glow.current.scale.setScalar(
      selected ? 1.8 : hovered ? 1.55 : 1.35
    );

    mesh.current.rotation.y += 0.01;
  });

  return (
    <group position={position}>

      {/* Glow */}

      <mesh ref={glow}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Main Node */}

      <mesh
        ref={mesh}
        castShadow
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();

          setSelectedNeuron({
            label,
            color,
            position,
            leaf,
          });
        }}
      >
        <sphereGeometry args={[0.22, 32, 32]} />

        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={
selected
? 6
: hovered
? 4
: 2.8
}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>

    </group>
  );
}