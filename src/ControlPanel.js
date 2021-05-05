import React, { useState } from "react";
import "./ControlPanel.css";

export default function ControlPanel(props) {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div className="controlPanel" style={{ width: collapsed ? 30 : 300 }}>
      <div className="toolbar">
        <button
          id="controlPanelCloseButton"
          onClick={() => setCollapsed(!collapsed)}
        >
          { collapsed ? "»" : "«" }
        </button>
      </div>
    </div>
  );
}
