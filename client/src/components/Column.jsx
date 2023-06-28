import { useLoader } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export default function Column({
  locationAndRooms,
  setCountry,
  radius,
  setIsOpen,
  setRotate,
}) {
  const prismRef = useRef();
  const matcapTexture = useLoader(
    TextureLoader,
    new URL("../assets/column.jpg", import.meta.url).href
  );
  const [properties, setProperties] = useState({
    height: 0.3,
    width: 0.022,
    color: "#f70aeb",
    x:
      Math.cos((locationAndRooms.lat / 180) * Math.PI) *
      Math.sin((locationAndRooms.long / 180) * Math.PI),
    y: Math.sin((locationAndRooms.lat / 180) * Math.PI),
    z:
      Math.cos((locationAndRooms.lat / 180) * Math.PI) *
      Math.cos((locationAndRooms.long / 180) * Math.PI),
  });

  useEffect(() => {
    prismRef.current.lookAt(0, 0, 0);
  }, []);
  return (
    <mesh
      renderOrder={3}
      onClick={() => {
        setIsOpen(true);
        setRotate(true);
        setCountry(locationAndRooms.location);
      }}
      onPointerOver={(event) => {
        setProperties((prev) => ({ ...prev, color: "yellow" }));
        setRotate(false);
      }}
      onPointerLeave={(event) => {
        setProperties((prev) => ({ ...prev, color: "#f70aeb" }));
        setRotate(true);
      }}
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
