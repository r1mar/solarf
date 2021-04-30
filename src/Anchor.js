import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import { CONFIG } from "./Constants";

export default function Anchor(props) {
  const anchor = new THREE.Object3D();
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  useFrame(state => {
    mesh.current.rotation.z += CONFIG.planets.rotationSpeed / (props.index + 1);
  });

  return (
    <mesh rotation-z={props.winkel} 
      ref={mesh}>
      <primitive object={anchor}  />
      {...props.children}
    </mesh>
  );
}