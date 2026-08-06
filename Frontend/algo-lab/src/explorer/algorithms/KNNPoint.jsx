import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function KNNPoint({

    position,

    color,

    pulse=false,

}){

const mesh=useRef();

const glow=useRef();

useFrame(({clock})=>{

if(!mesh.current)return;

mesh.current.rotation.y+=0.01;

const s=

pulse

?

1+Math.sin(clock.elapsedTime*4)*0.18

:

1+Math.sin(clock.elapsedTime*2+position[0])*0.05;

mesh.current.scale.setScalar(s);

if(glow.current){

glow.current.scale.setScalar(s*1.5);

}

});

return(

<group position={position}>

<mesh ref={glow}>

<sphereGeometry args={[0.35,32,32]}/>

<meshBasicMaterial

color={color}

transparent

opacity={0.18}

/>

</mesh>

<mesh ref={mesh} castShadow>

<sphereGeometry args={[0.18,32,32]}/>

<meshStandardMaterial

color={color}

emissive={color}

emissiveIntensity={2}

metalness={0.4}

roughness={0.2}

/>

</mesh>

</group>

);

}