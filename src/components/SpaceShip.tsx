import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/Addons.js"

const Ship = () => {
    const gltf = useLoader(GLTFLoader, '/models/SpaceShip/scene.gltf')
    return <primitive object={gltf.scene} />
}

const SpaceShip = () => {
  return (
    <Ship/>
  )
}

export default SpaceShip
