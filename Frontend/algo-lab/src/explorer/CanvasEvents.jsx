import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useNeuron } from "./NeuronContext";

export default function CanvasEvents() {

const { gl } = useThree();

const { setSelectedNeuron } = useNeuron();

useEffect(()=>{

const clear=()=>{

setSelectedNeuron(null);

};

gl.domElement.addEventListener("pointerdown",clear);

return()=>{

gl.domElement.removeEventListener("pointerdown",clear);

};

},[]);

return null;

}