import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const ZoomNode = ({ id, data }) => {
  const nodeZoom = data.zoom || 1;
  const isMinimized = nodeZoom < 0.8;
  const isPartial = nodeZoom >= 0.8 && nodeZoom < 1;
  const borderColor = data.focused ? "aqua" : "black";
  const bor = data.focused ? "2" : "1";

  return (
    <div
      style={{
        transform: `scale(${nodeZoom})`,
        padding: 10,
        border: `${bor}px solid ${borderColor}`,
        backgroundColor: "whight",
        borderRadius: "15px",
        boxShadow: '5px -5px 20px 5px #9E9E9E',
        width: "250px",
        // overflow: "hidden",

      }}
    >
      <Handle type="target" position={Position.Left} />
      {isMinimized ? (
        <h4>{data.content.props.children[0].props.children}</h4>
      ) : isPartial ? (
        <div>
          <h4>{data.content.props.children[0].props.children}</h4>
          <p>{data.content.props.children[1].props.children.slice(0, 60)}...</p>
        </div>
      ) : (
        data.content
      )}
      
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default memo(ZoomNode);