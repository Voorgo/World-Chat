import { useLoader } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const colors = {
  hazardous: "#E763F9",
  veryUnhealthy: "#B982E1",
  unhealthy: "#B982E1",
  high: "#8BA1CA",
  moderate: "#5CC1B2",
  good: "#f70aeb",
};

export default function Column({ lat, long, radius }) {
  const prismRef = useRef();
  const matcapTexture = useLoader(
    TextureLoader,
    new URL("../assets/column.jpg", import.meta.url).href
  );

  const [properties, setProperties] = useState({
    height: 0.18,
    width: 0.022,
    color: colors.good,
    x: Math.cos((lat / 180) * Math.PI) * Math.sin((long / 180) * Math.PI),
    y: Math.sin((lat / 180) * Math.PI),
    z: Math.cos((lat / 180) * Math.PI) * Math.cos((long / 180) * Math.PI),
  });

  useEffect(() => {
    prismRef.current.lookAt(0, 0, 0);
  }, []);
  return (
    <mesh
      position={[
        radius * properties.x,
        radius * properties.y,
        radius * properties.z,
      ]}
      ref={prismRef}
    >
      <boxGeometry
        args={[
          radius * properties.width,
          radius * properties.width,
          radius * properties.height,
        ]}
      />
      <meshMatcapMaterial matcap={matcapTexture} color={properties.color} />
    </mesh>
  );
}
