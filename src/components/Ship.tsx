import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/Addons.js"
import * as THREE from 'three' 

type ShipProps = {
  position: number[];
}

const Ship = ({position} : ShipProps) => {
	const gltf = useLoader(GLTFLoader, '/models/SpaceShip/scene.gltf')
  const shipRef = useRef<THREE.Group>(null);
  const vector3Position = new THREE.Vector3(position[0], position[1], position[2]);
  useFrame((state) => {
    if (shipRef.current) {
      shipRef.current.position.x = state.mouse.x * 5
    }
  })
  return (
    <group position={vector3Position} scale={[0.3,0.3,0.3]} ref={shipRef}>
      <primitive object={gltf.scene} />
    </group>
  )
}

export default Ship
