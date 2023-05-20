import { Suspense } from "react";
import Earth from "./Earth";
import { OrbitControls } from "@react-three/drei";
import { GizmoHelper } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import RoomsModal from "./RoomsModal";

function Scene() {
  const [rotate, setRotate] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState("");

  return (
    <div className="h-full w-full cursor-pointer overflow-hidden">
      <RoomsModal isOpen={isOpen} setIsOpen={setIsOpen} country={country} />
      <Canvas
        frameloop="always"
        orthographic
        camera={{
          zoom: 250,
          position: [0, 2, 5],
        }}
      >
        <GizmoHelper alignment="bottom-right" />
        <OrbitControls
          dampingFactor={0.1}
          enablePan={false}
          rotateSpeed={0.2}
          enableZoom={true}
          autoRotate={rotate}
          autoRotateSpeed={0.6}
          minZoom={250}
          maxZoom={650}
        />
        <Suspense fallback={null}>
          <Earth
            setIsOpen={setIsOpen}
            setRotate={setRotate}
            setCountry={setCountry}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Scene;
