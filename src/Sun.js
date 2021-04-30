import React, { useRef, useState } from "react";

import { CONFIG } from "./Constants";

export default function Sun(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false),
        [active, setActive] = useState(false);

  let planetConfig = CONFIG.planets.sun;

  return (
    <mesh
      {...props}
      position={[0,0,0]}
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
