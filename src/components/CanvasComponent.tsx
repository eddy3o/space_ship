import { PerspectiveCamera } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import SpaceShip from "./SpaceShip"
import { Vector3 } from 'three';
import { useRef, useState } from "react";
import * as THREE from 'three' 

type ShipMethodsProps = {
  position: number[];
}

const ShipMethods = ({position} : ShipMethodsProps) => {
  const shipRef = useRef<THREE.Group>(null);
  const vector3Position = new Vector3(position[0], position[1], position[2]);
  useFrame((state) => {
    if (shipRef.current) {
      shipRef.current.position.x = state.mouse.x * 5
    }
  })
  return (
    <group position={vector3Position} scale={[0.6,0.6,0.6]} ref={shipRef}>
      <SpaceShip />
    </group>
  )
}

const CanvasComponent = () => {
  const [sphere, setSphere] = useState<number[][]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const shotBall = (event: React.MouseEvent) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;

    setSphere([...sphere, [x * 5, 0, 4]]); 
  };

  return (
    <>
      <Canvas ref={canvasRef} onClick={shotBall}>
        <directionalLight color={'pink'} position={[0, 5, 3]} intensity={10} />
        <gridHelper />
        <PerspectiveCamera 
          makeDefault 
          position={[0, 6, 9]} 
          rotation={[-0.7, 0, 0]}
        />
        <ShipMethods position={[0, 0, 4]}/>
        { 
          sphere.map((position: number[], index: number) => (
            <mesh key={index} position={new Vector3(position[0], position[1], position[2])} >
              <sphereGeometry args={[0.1, 0.1, 0.1]}/> 
              <meshStandardMaterial />
            </mesh>
          ))
        }
      </Canvas> 
    </>
  )
}

export default CanvasComponent
