import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

import { CONFIG } from "./Constants";

export default function Planet(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false),
        [active, setActive] = useState(false),
        [camera, setCamera] = useState({});

  // Subscribe this component to the render-loop, rotate the mesh every frame
  //useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
  useFrame(state => {
    if (
      props.cameraUpdate &&
      ((props.cameraX != undefined && props.cameraX != camera.x) ||
        (props.cameraY != undefined && props.cameraY != camera.y))
    ) {
      state.camera.position.x = props.cameraX;
      state.camera.position.y = props.cameraY;

      state.camera.updateProjectionMatrix();
    }
    //let winkel = Math.atan2(mesh.current.position.y, mesh.current.position.x) * 180 / Math.PI;
    
    //if(CONFIG.planets[props.type].distanceToSun) {
    //winkel = (winkel + CONFIG.planets.rotationSpeed) % 360;
    //mesh.current.position.x = Math.cos(winkel) * CONFIG.planets[props.type].distanceToSun;
    //mesh.current.position.y = Math.sin(winkel) * CONFIG.planets[props.type].distanceToSun;
    //}
    /*const step = 0.1
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, zoom ? 10 : 42, step)
    state.camera.position.lerp(vec.set(zoom ? 25 : 10, zoom ? 1 : 5, zoom ? 0 : 10), step)
    state.camera.lookAt(0, 0, 0)
    state.camera.updateProjectionMatrix()
    light.current.position.lerp(vec.set(zoom ? 4 : 0, zoom ? 3 : 8, zoom ? 3 : 5), step)*/
  });
  // Return view, these are regular threejs elements expressed in JSX
  //if(props.zoom && props.zoom != zoom) {
  //  setZoom(props.zoom);
  //}
  let planetConfig = CONFIG.planets.list.find(
    planet => planet.name === props.type
  ), position = [0, 0, 0];

  if(planetConfig.distanceToSun && props.winkel) {
    position[0] = Math.cos(props.winkel) * planetConfig.distanceToSun / props.zoom; // x Koordinate
    position[1] = Math.sin(props.winkel) * planetConfig.distanceToSun / props.zoom; // y Koordinate
  }

  return (
    <mesh
      {...props}
      position={position}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={event => setActive(!active)}
      onPointerOver={event => setHover(true)}
      onPointerOut={event => setHover(false)}
    >
      <sphereGeometry
        args={[
          (planetConfig.radius ?? 1) / props.zoom,
          CONFIG.planets.widthSegments ?? 1,
          CONFIG.planets.heigthSegments ?? 1
        ]}
      />
      <meshStandardMaterial color={hovered ? "hotpink" : planetConfig.color} />
    </mesh>
  );
}
