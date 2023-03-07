import { Suspense } from "react";
import Earth from "./Earth";
import { OrbitControls } from "@react-three/drei";
import { GizmoHelper } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Scene() {
  return (
    <div className="h-full w-full overflow-hidden">
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
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={1.6}
        />
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Scene;
