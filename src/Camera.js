import React, { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";

export default function Camera(props) {
  const ref = useRef();
  const ggm = useThree();
  // Make the camera known to the system
  //useEffect(() => void setDefaultCamera(ref.current), [])
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld());
  return <perspectiveCamera ref={ref} {...props} />;
}
