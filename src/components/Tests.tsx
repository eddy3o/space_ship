/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Vector3 } from 'three';
import { useRef } from 'react';
import { MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'; 

type BoxesProps = {
  position: number[];
  color: string;
}

function Boxes({ position, color }: BoxesProps) { 
  const ref = useRef<Mesh>(null)
  const vector3Position = new Vector3(position[0], position[1], position[2]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useFrame((state, _delta ) => {
    if (ref.current) {
      ref.current.rotation.x += state.mouse.x * 0.1;
      ref.current.rotation.y += state.mouse.y * 0.1;
    }
  })
  return (
    <mesh position={vector3Position} ref = {ref}>
      <boxGeometry args={[2, 2, 2]}/>
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}

type SphereProps = {
  position: number[];
  color: string;
}

const Sphere = ({position, color} : SphereProps) => {
  const vector3Position = new Vector3(position[0], position[1], position[2]);
  return (
    <mesh position={vector3Position}>
      <sphereGeometry/>
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
const Things = () => {
  return (
    <Canvas>

        <directionalLight position={[0, 0, 2]}/>

        {/* <Boxes position = {[-1, 1, 0]} color = {'blue'} />
        <Boxes position = {[1, 1, 0]} color = {'red'} />

        <Boxes position = {[-1, -1, 0]} color = {'green'} />
        
        {/* <Sphere position={[0, 0, 0]} color='red' /> */}
        <Boxes position = {[1, -1, 0]} color = {'hotpink'} /> 
        <Sphere position={[0, 0, 0]} color='red' />
        <mesh>
          <boxGeometry />
          {/* <meshStandardMaterial /> */}
          <MeshWobbleMaterial />
        </mesh>

        <mesh position={[0, 0, -2]}> 
          <boxGeometry />
          <MeshWobbleMaterial />
        </mesh>

        <OrbitControls/>
        
      </Canvas>
  )
}

export default Things;