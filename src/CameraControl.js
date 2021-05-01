import React, { useState, useRef, useEffect } from "react";
import "./CameraControl.css";
import { CONFIG } from "./Constants";

export default function CameraControl(props) {
  const [start, setStart] = useState({ x1: 0, y1: 0 }),
    [zoom, setZoom] = useState(CONFIG.zoom.min),
    [last, setLast] = useState(null),
    [down, setDown] = useState(false);

  const ref = useRef(),
    preventDefault = e => e.preventDefault();

  useEffect(() => {
    ref.current.addEventListener("wheel", preventDefault);

    return () => {
      if(ref.current) {
      ref.current.removeEventListener("wheel", preventDefault);
      }
    };
  });

  function onMoveCamera(e, x, y) {
    if (props.onMoveCamera && last) {
      props.onMoveCamera({
        x: last.x - x,
        y: y - last.y
      });
    }
    setLast({ x: x, y: y });
  }

  function onMouseMove(e) {
    if ((e.pageX != start.x1 || e.pageY != start.y1) && down) {
      onMoveCamera(e, e.pageX, e.pageY);
    }
  }

  function updateZoom(value) {
    if (props.onChangeZoom) {
      let temp = zoom + value;

      temp = temp < CONFIG.zoom.min ? CONFIG.zoom.min : temp;
      temp = temp > CONFIG.zoom.max ? CONFIG.zoom.max : temp;

      setZoom(temp);
      props.onChangeZoom(temp);
    }
  }

  function onWheel(e) {
    updateZoom(e.deltaY / 100);
  }

  function onTouchStart(e) {
    if (e.touches && e.touches.length) {
      let tempStart = {
        x1: e.touches[0].clientX,
        y1: e.touches[0].clientY
      };

      if (e.touches[1]) {
        tempStart.x2 = e.touches[1].clientX;
        tempStart.y2 = e.touches[1].clientY;
      }
      setStart(tempStart);
    }
    setDown(true);
  }

  function getDirection(start, ende) {
    const [dirX, valueX] =
        start.x > ende.x
          ? ["left", start.x - ende.x]
          : ["right", ende.x - start.x],
      [dirY, valueY] =
        start.y > ende.y
          ? ["top", start.y - ende.y]
          : ["bottom", ende.y - start.y];

    return valueX > valueY ? dirX : dirY;
  }

  function onTouchMove(e) {
    if (
      e.changedTouches &&
      e.changedTouches.length &&
      e.changedTouches.length === 1 &&
      down &&
      (start.x != e.changedTouches[0].clientX ||
        start.y != e.changedTouches[0].clientY)
    ) {
      onMoveCamera(e, e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
  }

  function onTouchEnd(e) {
    if (e.changedTouches && e.changedTouches.length) {
      if (e.changedTouches.length === 2) {
        const dir1 = getDirection(
            { x: start.x1, y: start.y1 },
            { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
          ),
          dir2 = getDirection(
            { x: start.x2, y: start.y2 },
            { x: e.changedTouches[1].clientX, y: e.changedTouches[1].clientY }
          );

        if (dir1 === "top" && dir2 === "bottom") {
          // zoom in vertikal
          updateZoom(start.y1 - e.changedTouches[0].clientY);
        } else if (dir1 === "bottom" && dir2 === "top") {
          // zoom out vertikal
          updateZoom(start.y1 - e.changedTouches[0].clientY);
        } else if (dir1 === "left" && dir2 === "right") {
          // zoom in horizontal
          updateZoom(start.x1 - e.changedTouches[0].clientX);
        } else if (dir1 === "right" && dir2 === "left") {
          // zoom out horizontal
          updateZoom(start.x1 - e.changedTouches[0].clientX);
        }
      }
    }
    setDown(false);
    setLast(null);
  }

  function onMouseDown(e) {
    setStart({ x1: e.pageX, y1: e.pageY });
    setDown(true);
  }

  function onMouseUp() {
    setDown(false);
    setLast(null);
  }

  return (
    <div
      ref={ref}
      className="cameraControl"
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    >
      {...props.children}
    </div>
  );
}
