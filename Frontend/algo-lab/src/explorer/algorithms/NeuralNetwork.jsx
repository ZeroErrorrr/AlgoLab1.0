import Neuron from "./Neuron";
import Connections from "./Connections";
import DataPacket from "./DataPacket";

const input=[

[-5,2.5,0],
[-5,0.8,0],
[-5,-0.8,0],
[-5,-2.5,0],

];

const hidden=[

[0,3,0],
[0,1,0],
[0,-1,0],
[0,-3,0],

];

const output=[

[5,1.5,0],
[5,-1.5,0],

];

export default function NeuralNetwork() {
  return (
    <>
      {/* Input Layer */}
      {input.map((p, i) => (
        <Neuron
          key={`i${i}`}
          position={p}
          color="#38BDF8"
          label={`Input ${i + 1}`}
        />
      ))}

      {/* Hidden Layer */}
      {hidden.map((p, i) => (
        <Neuron
          key={`h${i}`}
          position={p}
          color="#A855F7"
          label={`Hidden ${i + 1}`}
        />
      ))}

      {/* Output Layer */}
      {output.map((p, i) => (
        <Neuron
          key={`o${i}`}
          position={p}
          color="#22C55E"
          active
          label={`Output ${i + 1}`}
        />
      ))}

      {/* Connections */}
      <Connections
        input={input}
        hidden={hidden}
        output={output}
      />

      {/* Data Packets: Input → Hidden */}
      {input.map((node, i) => (
        <DataPacket
          key={`p1-${i}`}
          start={node}
          end={hidden[i]}
        />
      ))}

      {/* Data Packets: Hidden → Output */}
      {hidden.map((node, i) => (
        <DataPacket
          key={`p2-${i}`}
          start={node}
          end={output[i % output.length]}
          speed={0.55}
        />
      ))}
    </>
  );
}