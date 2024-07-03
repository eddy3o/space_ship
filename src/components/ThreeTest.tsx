import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three' 
import { OrbitControls } from '@react-three/drei';

const Cube = () => {
  const cubeMaterialRef = useRef<THREE.MeshToonMaterial>(null);
  const cubeMesh = useRef<THREE.Mesh>(null);
  const [targetScale, setTargetScale] = useState(1);

  const resizecube = () => {
    setTargetScale(1.5); // Define el tamaño objetivo
  };

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const baseValue = 128;  // Ajusta este valor para cambiar el nivel mínimo de brillo
    const amplitude = 127;  // Ajusta este valor para cambiar la amplitud del cambio de color

    const r = Math.sin(elapsedTime * 0.5) * amplitude + baseValue;
    const g = Math.sin(elapsedTime * 0.7 + 2) * amplitude + baseValue;
    const b = Math.sin(elapsedTime * 0.9 + 4) * amplitude + baseValue;

    if (cubeMaterialRef.current) {
      cubeMaterialRef.current.color.setRGB(r / 255, g / 255, b / 255);
    }
    if (cubeMesh.current) {
      cubeMesh.current.rotation.x += 0.01;
      cubeMesh.current.rotation.y += 0.01;
      const currentScale = cubeMesh.current.scale.x;
      const delta = (targetScale - currentScale) * 0.1; // Ajusta el factor para una transición más suave o más rápida
      const newScale = currentScale + delta;
      cubeMesh.current.scale.set(newScale, newScale, newScale);
    }
  });

  return (
    <mesh ref={cubeMesh} onClick={resizecube}>
      <boxGeometry />
      <meshToonMaterial ref={cubeMaterialRef} />
    </mesh>
  );
}

const LightHandler = () => {
  const light = useRef<THREE.DirectionalLight>(null)
  useFrame((state) => {
    if (light.current) {
      light.current.position.x = state.mouse.x;
      light.current.position.y = state.mouse.y;
    }
  })

  return (
    <>
      <directionalLight position={[0, 0, 3]} intensity={1} ref={light}/>
    </>
  ) 
}

const ThreeTest = () => {
  return (
    <>
      <Canvas>
        <ambientLight intensity={0.1} />
        <LightHandler />
        <Cube />
        <OrbitControls/>
        <gridHelper />
      </Canvas> 
    </>
  )
}

export default ThreeTest
