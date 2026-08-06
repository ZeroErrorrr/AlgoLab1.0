import { Line } from "@react-three/drei";

export default function TreeConnection({
  start,
  end,
}) {
  return (
    <Line
      points={[start, end]}
      color="#60A5FA"
      lineWidth={2.5}
      transparent
      opacity={0.7}
    />
  );
}