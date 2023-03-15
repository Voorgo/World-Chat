import { useState, useEffect, useRef } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";
import globeVertexShader from "../assets/globe/vertex.glsl";
import globeFragmentShader from "../assets/globe/fragment.glsl";
import atmosphereVertexShader from "../assets/atmosphere/vertex.glsl";
import atmosphereFragmentShader from "../assets/atmosphere/fragment.glsl";
import { useLoader } from "@react-three/fiber";
import Column from "./Column";

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

function Earth() {
  const earthRef = useRef();
  const [radius, setRadius] = useState(
    window.innerWidth < 639
      ? window.innerWidth / 650
      : Math.min(window.innerWidth / 1000, 1)
  );

  // Resize for responsive
  const onWindowResize = () => {
    const width = window.innerWidth;
    setRadius(width < 640 ? width / 650 : Math.min(width / 1000, 1));
  };

  // Listener resize events
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
      <Column radius={radius} lat={44.4} long={26.0833} />
    </group>
  );
}

export default Earth;
