import React from 'react';
import { Handle, Node } from 'react-flow-renderer'; // Ensure you import components from react-flow-renderer

const SpecialNode = ({ data }) => {
  return (
    <Node
      id={data.id}
      style={{
        border: '1px solid black',
        borderRadius: '8px',
        padding: '10px',
        background: 'white',
      }}
    >
      <Handle type="target" position="left" />
      {data.label}
      <Handle type="source" position="right" />
    </Node>
  );
};

export default SpecialNode;
