import React from "react";
import "./style.css";
import { Canvas, useThree } from "@react-three/fiber";

import CameraControl from "./CameraControl";
import Planet from "./Planet";
import Sun from "./Sun";
import Camera from "./Camera";
import ControlPanel from "./ControlPanel";
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
      },
      planets: CONFIG.planets.list.map(planet => ({
        ...planet,
        winkel: Math.random() * 360
      }))
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
    const light = new THREE.SpotLight(0xffffff),
      sunConfig = CONFIG.planets.sun,
      planets = this.state.planets.map(planet => {
        return (
          <Planet
            key={planet.name}
            zoom={this.state.camera.zoom}
            type={planet.name}
            winkel={planet.winkel}
          />
        );
      });

    return (
      <div className="fullScreen">
        <Canvas
          className="main"
          orthographic={true}
          camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
            position: [0, 0, 1000]
          }}
        >
          <pointLight intensity={1.1} />

          <primitive
            object={light}
            position={[
              0,
              0,
              ((sunConfig.radius ?? 1) * 6) / this.state.camera.zoom
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

          <Camera x={this.state.camera.x} y={this.state.camera.y} />
          <Sun zoom={this.state.camera.zoom} />
          {planets}
        </Canvas>
      <ControlPanel>
        <CameraControl onMoveCamera={this.onMoveCamers} onChangeZoom={this.onChangeZoom} />
      </ControlPanel>
      </div>
    );
  }
}
