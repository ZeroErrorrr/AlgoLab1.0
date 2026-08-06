import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useNeuron } from "../NeuronContext";

export default function Neuron({
  position,
  color = "#38BDF8",
  label,
  active = false,
}) {
  const mesh = useRef();

  const { selectedNeuron, setSelectedNeuron } = useNeuron();

  useFrame(() => {
    if (!mesh.current) return;

    mesh.current.rotation.y += 0.01;

mesh.current.position.y =
position[1] +
Math.sin(Date.now()*0.002+position[0])*0.03;

    // Highlight selected neuron
    const selected =
      selectedNeuron?.label === label;

    mesh.current.scale.setScalar(
      selected ? 1.6 : 1
    );
  });

  const selected =
    selectedNeuron?.label === label;

  return (
    <mesh
      ref={mesh}
      position={position}
     onClick={(e) => {
  e.stopPropagation();

  if (selectedNeuron?.label === label) {
    setSelectedNeuron(null);
  } else {
    setSelectedNeuron({
      label,
      color,
      active,
      position,
    });
  }
}}
    >
      <sphereGeometry args={[0.22, 32, 32]} />

      <meshStandardMaterial
color={color}
emissive={color}
emissiveIntensity={
selected ? 5 : 2
}
metalness={0.8}
roughness={0.05}
/>
    </mesh>
  );
}