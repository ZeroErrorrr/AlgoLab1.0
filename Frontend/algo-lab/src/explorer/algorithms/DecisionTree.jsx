import { useState } from "react";
import TreeNode from "./TreeNode";
import TreeConnection from "./TreeConnection";
import DecisionPacket from "./DecisionPacket";

const nodes = [
  {
    id: "root",
    label: "Age < 30 ?",
    position: [0, 3, 0],
    color: "#FACC15",
  },

  {
    id: "left",
    label: "Income > 50K ?",
    position: [-2.2, 1, 0],
    color: "#38BDF8",
  },

  {
    id: "right",
    label: "Student ?",
    position: [2.2, 1, 0],
    color: "#38BDF8",
  },

  {
    id: "buy1",
    label: "BUY",
    position: [-3.2, -1.2, 0],
    color: "#22C55E",
    leaf: true,
  },

  {
    id: "dont1",
    label: "DON'T BUY",
    position: [-1.2, -1.2, 0],
    color: "#EF4444",
    leaf: true,
  },

  {
    id: "buy2",
    label: "BUY",
    position: [1.2, -1.2, 0],
    color: "#22C55E",
    leaf: true,
  },

  {
    id: "dont2",
    label: "DON'T BUY",
    position: [3.2, -1.2, 0],
    color: "#EF4444",
    leaf: true,
  },
];

const edges = [
  [0,1],
  [0,2],
  [1,3],
  [1,4],
  [2,5],
  [2,6]
];

export default function DecisionTree(){
  console.log("✅ DecisionTree Rendered");

  

    const [run,setRun]=useState(false);

    return(

    <group position={[0, -0.3, 0]} scale={1.35}>
        {/* Tree Connections */}

        {edges.map(([a,b],i)=>(

            <TreeConnection
                key={i}
                start={nodes[a].position}
                end={nodes[b].position}
            />

        ))}

        {/* Tree Nodes */}

        {nodes.map((node)=>(

            <TreeNode
                key={node.id}
                {...node}
            />

        ))}

        {/* Animated Decision Packet */}

        <DecisionPacket

            run={run}

            path={[
                nodes[0].position,
                nodes[1].position,
                nodes[3].position
            ]}

        />

        {/* Floating Control Panel */}

        {/* <group position={[6,2.5,0]}>

            <mesh>

                <planeGeometry args={[3.8,3.4]}/>

                <meshStandardMaterial
                    color="#101827"
                />

            </mesh>

        </group> */}

    </group>

    );

}