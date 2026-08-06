import { useMemo } from "react";
import KNNPoint from "./KNNPoint";
import KNNConnection from "./KNNConnection";
import KNNPacket from "./KNNPacket";

export default function KNN() {

  const bluePoints = useMemo(() => [
    [-3,2,0],
    [-2.2,0.8,0],
    [-3,-1.2,0],
    [-1.5,-2,0],
    [-0.8,1.8,0],
  ], []);

  const redPoints = useMemo(() => [
    [2.5,2,0],
    [3,-0.4,0],
    [2,-2,0],
    [0.8,-1.3,0],
    [1.5,1,0],
  ], []);

  const query = [0.2,0.2,0];

  const nearest = [
    [-0.8,1.8,0],
    [1.5,1,0],
    [0.8,-1.3,0],
  ];

  return (

    <group scale={1.2}>

      {/* Blue Class */}

      {bluePoints.map((p,i)=>(
        <KNNPoint
          key={"b"+i}
          position={p}
          color="#38BDF8"
        />
      ))}

      {/* Red Class */}

      {redPoints.map((p,i)=>(
        <KNNPoint
          key={"r"+i}
          position={p}
          color="#EF4444"
        />
      ))}

      {/* Query */}

      <KNNPoint
        position={query}
        color="#FFD54A"
        pulse
      />

      {/* Connections */}

      {nearest.map((p,i)=>(

        <KNNConnection
          key={i}
          start={query}
          end={p}
        />

      ))}

      {/* Packet */}

      <KNNPacket

        start={query}
        end={nearest[0]}
        speed={0.8}

      />

    </group>

  );

}