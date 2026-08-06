import { Line } from "@react-three/drei";

export default function KNNConnection({
  start,
  end,
}) {
  return (
    <Line
      points={[start, end]}
      color="#FFD54A"
      lineWidth={3}
      transparent
      opacity={0.8}
    />
  );
}