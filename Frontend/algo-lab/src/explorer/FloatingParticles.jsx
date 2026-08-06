import { Sparkles } from "@react-three/drei";

export default function FloatingParticles({ visible = true }) {
  if (!visible) return null;

  return (
    <>
      {/* Cyan particles */}
      <Sparkles
        count={700}
        scale={[18, 10, 18]}
        size={2.5}
        speed={0.35}
        color="#5EEAD4"
        opacity={0.8}
      />

      {/* Amber particles */}
      <Sparkles
        count={350}
        scale={[16, 8, 16]}
        size={3}
        speed={0.2}
        color="#F5B85C"
        opacity={0.45}
      />

      {/* Blue particles */}
      <Sparkles
        count={250}
        scale={[20, 12, 20]}
        size={4}
        speed={0.15}
        color="#38BDF8"
        opacity={0.25}
      />
    </>
  );
}