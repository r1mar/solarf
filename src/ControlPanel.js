import React from "react";
import "./ControlPanel.css";

export default function ControlPanel(props) {
  return (<div className="controlPanel"><button onClick={props.close}>Schließen</button></div>);
}