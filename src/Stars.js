import * as THREE from "three";

import { CONFIG } from "./Constants";

  function getRandom(max, min = 0) {
    return Math.floor(min + Math.random() * max);
  }

  function drawStars(context) {
    let count = CONFIG.map.stars.count;

    while (count--) {
      let radius = getRandom(
          CONFIG.map.stars.width.max,
          CONFIG.map.stars.width.min
        ),
        x = getRandom(CONFIG.map.size - 1),
        y = getRandom(CONFIG.map.size - 1);

      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI);
      context.fillStyle = "white";
      context.fill();
    }
  }

export default function Stars() {
    let main = document.createElement("canvas");

    main.width = CONFIG.map.size;
    main.height = CONFIG.map.size;

    let context = main.getContext("2d");

    drawStars(context);


  return new THREE.CanvasTexture(main);
}

/* 
const width = 9;  

const height = 9;  

const widthSegments = 2;  

const heightSegments = 2;  

const geometry = new THREE.PlaneGeometry(
    width, height,
    widthSegments, heightSegments);
    
 const ctx = document.createElement('canvas').getContext('2d');
  ctx.canvas.width = 256;
  ctx.canvas.height = 256;
  ctx.fillStyle = '#FFF';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const texture = new THREE.CanvasTexture(ctx.canvas);

  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });
  const cube = new THREE.Mesh(geometry, material);*/
