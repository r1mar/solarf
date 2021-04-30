import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import { CONFIG } from "./Constants";

export default function Anchor(props) {
  const anchor = new THREE.Object3D();

  useFrame(state => {
    anchor.rotation.z += CONFIG.planets.rotationSpeed / (props.index + 1);
  });

  return (
    <mesh rotation-z={props.winkel}>
      <primitive object={anchor}  />
      {...props.children}
    </mesh>
  );
}