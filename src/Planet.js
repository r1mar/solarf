import React, { useRef, useState } from "react";

import Anchor from "./Anchor";
import { CONFIG } from "./Constants";

export default function Planet(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false),
    [active, setActive] = useState(false);

  let planetConfig = CONFIG.planets.list.find(
      planet => planet.name === props.type
    ),
    position = [planetConfig.distanceToSun / props.zoom, 0, 0];

  return (
    <Anchor
      winkel={props.winkel}
      index={CONFIG.planets.list.indexOf(planetConfig)}
    >
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
        <meshStandardMaterial
          color={hovered ? "hotpink" : planetConfig.color}
        />
      </mesh>
    </Anchor>
  );
}
