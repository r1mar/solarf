import React from "react";
import "./ControlPanel.css";

export default function ControlPanel(props) {
  return (<div className="controlPanel"><div className="toolbar"><button id="controlPanelCloseButton" onClick={() => props.collapse()}>&laquo;</button></div></div>);
}