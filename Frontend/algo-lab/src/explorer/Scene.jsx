import FloatingParticles from "./FloatingParticles";
import AlgorithmScene from "../explorer/AlgorithmScene";

export default function Scene({ algorithm }) {
  return (
    <>
      <FloatingParticles />
      <AlgorithmScene algorithm={algorithm} />
    </>
  );
}