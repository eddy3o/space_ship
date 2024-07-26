import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

import Balls from "./Balls";
import Enemies from "./Enemies";
import Ship from "./Ship";

const CanvasComponent = () => {
  const [sphere, setSphere] = useState<number[][]>([]);
  const [enemies, setEnemies] = useState<number[][]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Implementing the setInterval method
    const interval = setInterval(() => {
      setEnemies((prevEnemies) => [
        ...prevEnemies,
        [Math.random() * (5 + 5) - 5, 0, -13],
      ]);
      console.log("vuelta");
    }, 1000);

    // Clearing the interval
    return () => clearInterval(interval);
  }, []);

  const shotBall = (event: React.MouseEvent) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    setSphere([...sphere, [x * 5, 0, 4]]);
  };

  return (
    <>
      <Canvas ref={canvasRef} onClick={shotBall}>
        <directionalLight color={"white"} position={[0, 5, 3]} intensity={10} />
        <gridHelper />
        <PerspectiveCamera
          makeDefault
          position={[0, 6, 9]}
          rotation={[-0.7, 0, 0]}
        />
        <Ship position={[0, 0, 4]} />
        <Balls spheres={sphere} setSpheres={setSphere} />
        <Enemies spheres={enemies} setSpheres={setEnemies} />
      </Canvas>
    </>
  );
};

export default CanvasComponent;
