import { useState, useEffect, useRef } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";
import globeVertexShader from "../assets/globe/vertex.glsl";
import globeFragmentShader from "../assets/globe/fragment.glsl";
import atmosphereVertexShader from "../assets/atmosphere/vertex.glsl";
import atmosphereFragmentShader from "../assets/atmosphere/fragment.glsl";
import { useLoader } from "@react-three/fiber";
import Column from "./Column";
import { v4 as uuidv4 } from "uuid";
import { DataContext } from "../context/AuthContext";

function Globe({ radius }) {
  const globeTexture = useLoader(
    TextureLoader,
    new URL("../assets/globe2.jpg", import.meta.url).href
  );
  return (
    <mesh rotation={[0, -Math.PI / 2, 0]}>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        receiveShadow
        attach="material"
        args={[
          {
            vertexShader: globeVertexShader,
            fragmentShader: globeFragmentShader,
            uniforms: {
              globeTexture: { value: globeTexture },
            },
          },
        ]}
      />
    </mesh>
  );
}

function Atmosphere({ radius }) {
  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        attach="material"
        args={[
          {
            vertexShader: atmosphereVertexShader,
            fragmentShader: atmosphereFragmentShader,
            side: THREE.BackSide,
            transparent: true,
          },
        ]}
      />
    </mesh>
  );
}

function Earth({ setIsOpen, setCountry, setRotate }) {
  const { data } = DataContext();
  const earthRef = useRef();

  const [radius, setRadius] = useState(
    window.innerWidth < 639
      ? window.innerWidth / 650
      : Math.min(window.innerWidth / 1000, 1)
  );

  const onWindowResize = () => {
    const width = window.innerWidth;
    setRadius(width < 640 ? width / 650 : Math.min(width / 1000, 1));
  };

  useEffect(() => {
    addEventListener("resize", onWindowResize, false);

    return () => {
      removeEventListener("resize", onWindowResize, false);
    };
  }, []);
  return (
    <group ref={earthRef}>
      <Globe radius={radius} />
      <Atmosphere radius={radius} />
      {data.map((obj) => (
        <Column
          radius={radius}
          setRotate={setRotate}
          setIsOpen={setIsOpen}
          setCountry={setCountry}
          locationAndRooms={obj}
          key={uuidv4()}
        />
      ))}
    </group>
  );
}

export default Earth;
