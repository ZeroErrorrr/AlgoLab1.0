import { Line } from "@react-three/drei";

export default function Connection({
  start,
  end,
  active = false,
}) {
  return (
    <Line
      points={[start, end]}
      color={
active
? "#FFE55C"
: "#6BCBFF"
}
      lineWidth={1.8}
      transparent
      opacity={0.45}
    />
  );
}