import React, { useState, useRef, useEffect } from 'react';
import './Preview.css';
import { CONFIG } from './Constants';

export default function Preview(props) {
  const [down, setDown] = useState(false);

  const ref = useRef();

  useEffect(() => {
    ref.current.width = CONFIG.preview.width;
    ref.current.height = CONFIG.preview.height;

    let context = ref.current.getContext("2d"),
        x = CONFIG.preview.width / 2,
        y = CONFIG.preview.height / 2;

    context.beginPath();
    context.arc(x, y, CONFIG.preview.sunRadius, 0, 2 * Math.PI);
    context.fillStyle = CONFIG.planets.sun.color;
    context.fill();
  });

  function onMoveCamera(e, x, y) {
    if (props.onMoveCamera) {
      props.onMoveCamera({
        x: last.x - x,
        y: y - last.y
      });
    }
  }

  function onMouseMove(e) {
    if (down) {
      onMoveCamera(e, e.pageX, e.pageY);
    }
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
    setDown(false);
  }

  function onMouseDown(e) {
    setDown(true);
  }

  function onMouseUp() {
    setDown(false);
  }

  return (
    <canvas
      ref={ref}
      className="space"
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    >
      {...props.children}
    </canvas>
  );
}
