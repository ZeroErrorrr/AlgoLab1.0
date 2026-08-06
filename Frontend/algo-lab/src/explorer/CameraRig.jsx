import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useNeuron } from "./NeuronContext";
import { useRef, useEffect } from "react";

export default function CameraRig() {
  const { camera } = useThree();
  const { selectedNeuron } = useNeuron();

  const targetPos = useRef(new Vector3(0, 2, 14));
  const lookPos = useRef(new Vector3(0, 0, 0));

  useEffect(() => {
    if (selectedNeuron) {
      targetPos.current.set(
        selectedNeuron.position[0],
        selectedNeuron.position[1] + 0.5,
        7
      );

      lookPos.current.set(
        selectedNeuron.position[0],
        selectedNeuron.position[1],
        0
      );
    } else {
      targetPos.current.set(0, 2, 14);
      lookPos.current.set(0, 0, 0);
    }
  }, [selectedNeuron]);

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.08);

    // Stop updating once the animation is almost complete.
    if (camera.position.distanceTo(targetPos.current) > 0.02) {
      camera.lookAt(lookPos.current);
    }
  });

  return null;
}