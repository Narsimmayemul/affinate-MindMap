import React, { useCallback, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  MarkerType,
} from "reactflow";

import ZoomNode from "./ZoomNode";

import "reactflow/dist/style.css";
import "./index.css";
// import { Background } from 'react-flow-renderer';

const snapGrid = [20, 20];
const nodeTypes = {
  zoom: ZoomNode,
};

const initialNodes = [
  {
    id: "1",
    type: "zoom",
    data: {
      content: (
        <div>
          <h4>React Hooks</h4>
          <p>
          React introduced hooks (e.g., useState, useEffect, useContext) to allow functional components to manage state and side effects. Hooks simplify the process of managing component logic and make it easier to share stateful logic between components without using class components.
          </p>
        </div>
      ),
      zoom: 1,
    },
    position: { x: 500, y: 250 },
    // sourcePosition: 'left'
    sourcePosition: 'left', targetPosition: 'right'
  },
  {
    id: "2",
    type: "zoom",
    data: {
      content: (
        <div>
          <h4>Lifecycle Methods</h4>
          <p>
          React components have a lifecycle with specific phases (mounting, updating, and unmounting). During these phases, you can hook into specific lifecycle methods (e.g., componentDidMount, componentDidUpdate, componentWillUnmount) to perform actions such as data fetching, manual DOM manipulation, or cleanup.
          </p>
        </div>
      ),
      zoom: 1,
    },
    position: { x: 50, y: 50 },
    // sourcePosition: 'left'
  },
  {
    id: "3",
    type: "zoom",
    data: {
      content: (
        <div>
          <h4>Virtual DOM</h4>
          <p>
          React uses a virtual DOM to improve performance. When the state or props of a component change, React creates a virtual representation of the DOM and compares it with the previous version. It then efficiently updates only the parts of the real DOM that have changed, minimizing direct manipulation of the DOM and improving performance.
          </p>
        </div>
      ),
      zoom: 1,
    },
    position: { x: 50, y: 250 },
    // sourcePosition: 'left'
  },
  {
    id: "4",
    type: "zoom",
    data: {
      content: (
        <div>
          <h4>State and Props</h4>
          <p>
          Components in React can maintain internal state (data specific to that component) and receive props (data passed from parent components). The state allows a component to manage its own data, while props allow data to be passed between components, enabling reusability and dynamic rendering.
           </p>
        </div>
      ),
      zoom: 1,
    },
    position: { x: 50, y: 450 },
    // sourcePosition: 'left',
    // targetPosition: 'left'
  },
  {
    id: "5",
    type: "zoom",
    data: {
      content: (
        <div>
          <h4>JSX Syntax</h4>
          <p>
          React uses JSX (JavaScript XML), a syntax extension that allows you to write HTML-like code within JavaScript. This makes it easier to visualize the structure of your UI directly in your code. Components are typically written as JSX elements.
          </p>
        </div>
      ),
      zoom: 1,
    },
    position: { x: 900, y: 50 },
  },
  {
    id: "6",
    type: "zoom",
    data: {
      content: (
        <div>
          <h4>Component-Based Structure</h4>
          <p>
          React is built around components. Each component represents a part of the UI, and components can be nested, managed, and handled independently. This modular approach makes the development and maintenance of complex UIs easier.
           </p>
        </div>
      ),
      zoom: 1,
    },
    position: { x: 900, y: 350 },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "2",
    target: "1",
    markerStart: { type: MarkerType.ArrowClosed, color: 'black' },
    sourceHandle: "right",
  },
  {
    id: "e1-3",
    source: "3",
    target: "1",
    markerStart: { type: MarkerType.ArrowClosed, color: 'black' },
    sourceHandle: "right",
  },
  {
    id: "e1-4",
    source: "4",
    target: "1",
    markerStart: { type: MarkerType.ArrowClosed, color: 'black' },
    sourceHandle: "right",
  },
  {
    id: "e1-5",
    source: "1",
    target: "5",
    markerEnd: { type: MarkerType.ArrowClosed, color: 'black' },
    targetHandle: "left",
    
  },
  {
    id: "e1-6",
    source: "1",
    target: "6",
    markerEnd: { type: MarkerType.ArrowClosed, color: 'black' },
    targetHandle: "left",   
  },
];

const defaultViewport = { x: 0, y: 0, zoom: 1 };

const ContextualZoomFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [focusedNode, setFocusedNode] = useState(null);
  const [zoom, setZoom] = useState(1);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  const handleNodeClick = (event, node) => {
    setFocusedNode(node.id);
    setZoom(node.data.zoom || 1); 
  };

  const handleZoomChange = (event) => {
    const newZoom = parseFloat(event.target.value);
    setZoom(newZoom);
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === focusedNode) {
          return {
            ...node,
            data: {
              ...node.data,
              zoom: newZoom,
            },
          };
        } else {
          const minZoom = 0.3; 
          const decrementFactor = 0.7;
          const otherNodeZoom = Math.max(
            minZoom,
            1 - (newZoom - 1) * decrementFactor
          );
          return {
            ...node,
            data: {
              ...node.data,
              zoom: otherNodeZoom,
            },
          };
        }
      })
    );
  };



  return (
    <div style={{ height: "100vh"  , width:'180vh'}}>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            focused: node.id === focusedNode,
          },
          
        }))}
        
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultViewport={defaultViewport}
        onNodeClick={handleNodeClick}
        attributionPosition="center"
        
      > 
      <Controls />
        <Background variant="dots" color="green" gap={12} size={1} />
      </ReactFlow>
       
      {focusedNode && (
        <div className="zoom-controls">
          <label>Focused:</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={zoom}
            onChange={handleZoomChange}
            className="zoom-slider"
          />
          <div className="zoom-scale">
            {[...Array(26).keys()].map((i) => (
              <div key={i} className="tick">
                {i % 5 === 0 && (
                  <span className="tick-label">{(i / 10).toFixed(1)}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const WrappedContextualZoomFlow = () => (
  <ReactFlowProvider>
    <ContextualZoomFlow />
  </ReactFlowProvider>
);

export default WrappedContextualZoomFlow;