import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function Camera(props) {
  const dummy = new THREE.Object3D();

  useFrame(state => {
    if (
      (props.x != undefined && props.x != state.camera.position.x) ||
      (props.y != undefined && props.y != state.camera.position.y)
    ) {
      state.camera.position.x = props.x;
      state.camera.position.y = props.y;

      state.camera.updateProjectionMatrix();
    }
  });

  return (<mesh> <primitive object={dummy} /> </mesh>);
}
