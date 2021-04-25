import React from "react";
import "./style.css";
import { Canvas, useThree } from "@react-three/fiber";

import CameraControl from "./CameraControl";
import Planet from "./Planet";
import { CONFIG } from "./Constants";
import * as THREE from "three";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      camera: {
        x: 0,
        y: 0,
        zoom: CONFIG.zoom.min
      }
    };

    this.onMoveCamera = this.onMoveCamera.bind(this);
    this.onChangeZoom = this.onChangeZoom.bind(this);
  }

  onMoveCamera(e) {
    let camera = { ...this.state.camera };

    camera.x += e.x;
    camera.y += e.y;
    this.setState({ camera: camera });
  }

  onChangeZoom(e) {
    let camera = { ...this.state.camera };

    camera.zoom = e;

    this.setState({
      camera
    });
  }

  render() {
    const light = new THREE.SpotLight(0xffffff);

    return (
      <CameraControl
        onMoveCamera={this.onMoveCamera}
        onChangeZoom={this.onChangeZoom}
      >
        <Canvas
          className="main"
          orthographic={true}
          camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
            position: [0, 0, 1000]
          }}
          /*onCreated={({ gl, scene }) => {
            scene.background = Stars(); //new THREE.Color('#373740');
          }}*/
        >
          <pointLight intensity={1.1} />

          <primitive
            object={light}
            position={[
              0,
              0,
              ((CONFIG.planets.sun.radius ?? 1) * CONFIG.planets.scale * 6) /
                this.state.camera.zoom
            ]}
          />
          <primitive object={light.target} position={[0, 0, 0]} />
          <ambientLight intensity={0.15} />

          <gridHelper
            args={[
              CONFIG.map.size / this.state.camera.zoom,
              50,
              "saddlebrown",
              "saddlebrown"
            ]}
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          />

          <Planet
            position={[0, 0, 0]}
            type="sun"
            cameraX={this.state.camera.x}
            cameraY={this.state.camera.y}
            zoom={this.state.camera.zoom}
            cameraUpdate={true}
          />
          <Planet
            position={[
              (CONFIG.planets.venus.distanceToSun * CONFIG.planets.scale) /
                this.state.camera.zoom,
              0,
              0
            ]}
            zoom={this.state.camera.zoom}
            type="venus"
          />
          <Planet
            position={[
              (CONFIG.planets.earth.distanceToSun * CONFIG.planets.scale) /
                this.state.camera.zoom,
              0,
              0
            ]}
            zoom={this.state.camera.zoom}
            type="earth"
          />
        </Canvas>
      </CameraControl>
    );
  }
}
