import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

type BallsProps = {
  spheres: number[][];
  setSpheres: React.Dispatch<React.SetStateAction<number[][]>>;
};

const Balls = ({ spheres, setSpheres }: BallsProps) => {
  useFrame(() => {
    setSpheres((s) =>
      s.map((position) => {
        return [position[0], position[1], position[2] - 0.04];
      })
    );
  });
  return spheres.map((position: number[], index: number) => (
    <mesh
      key={index}
      position={new THREE.Vector3(position[0], position[1], position[2])}
    >
      <sphereGeometry args={[0.1, 32, 16]} />
      <meshStandardMaterial />
    </mesh>
  ));
};

export default Balls;
