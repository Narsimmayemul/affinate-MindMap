import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  MarkerType,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 50, y: 50 }, style: { border: '1px solid black', boxShadow: '1px 3px 1px #9E9E9E', borderRadius: '20px', width: 250, height: 150 }, data: { label: 'Component-Based Structure: React is built around components. Each component represents a part of the UI, and components can be nested, managed, and handled independently. This modular approach makes the development and maintenance of complex UIs easier.' }, targetPosition: 'right', sourcePosition: 'right' },
  { id: '2', position: { x: 50, y: 250 }, style: { border: '1px solid black', boxShadow: '1px 3px 1px #9E9E9E', borderRadius: '20px', width: 250, height: 150 }, data: { label: 'JSX Syntax: React uses JSX (JavaScript XML), a syntax extension that allows you to write HTML-like code within JavaScript. This makes it easier to visualize the structure of your UI directly in your code. Components are typically written as JSX elements.' }, targetPosition: 'right', sourcePosition: 'right' },
  { id: '3', position: { x: 50, y: 450 }, style: { border: '1px solid black', boxShadow: '1px 3px 1px #9E9E9E', borderRadius: '20px', width: 250, height: 170 }, data: { label: 'State and Props: Components in React can maintain internal state (data specific to that component) and receive props (data passed from parent components). The state allows a component to manage its own data, while props allow data to be passed between components, enabling reusability and dynamic rendering.' }, targetPosition: 'right', sourcePosition: 'right' },
  { id: '4', position: { x: 350, y: 250 }, style: { border: '1px solid black', boxShadow: '1px 3px 1px #9E9E9E', borderRadius: '20px', width: 250, height: 200 }, data: { label: 'Virtual DOM: React uses a virtual DOM to improve performance. When the state or props of a component change, React creates a virtual representation of the DOM and compares it with the previous version. It then efficiently updates only the parts of the real DOM that have changed, minimizing direct manipulation of the DOM and improving performance.' }, sourcePosition: 'left', targetPosition: 'right' },
  { id: '5', position: { x: 650, y: 100 }, style: { border: '1px solid black', boxShadow: '1px 3px 1px #9E9E9E', borderRadius: '20px', width: 250, height: 200 }, data: { label: 'Lifecycle Methods: React components have a lifecycle with specific phases (mounting, updating, and unmounting). During these phases, you can hook into specific lifecycle methods (e.g., componentDidMount, componentDidUpdate, componentWillUnmount) to perform actions such as data fetching, manual DOM manipulation, or cleanup.' }, sourcePosition: 'left', targetPosition: 'left' },
  { id: '6', position: { x: 650, y: 400 }, style: { border: '1px solid black', boxShadow: '1px 3px 1px #9E9E9E', borderRadius: '20px', width: 250, height: 170 }, data: { label: 'Hooks: React introduced hooks (e.g., useState, useEffect, useContext) to allow functional components to manage state and side effects. Hooks simplify the process of managing component logic and make it easier to share stateful logic between components without using class components.' }, sourcePosition: 'left', targetPosition: 'left' },
];

const initialEdges = [
  { id: 'e1-4', source: '4', target: '1', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
  { id: 'e2-4', source: '4', target: '2', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
  { id: 'e3-4', source: '4', target: '3', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: 'black' } },
  { id: 'e5-4', source: '5', target: '4', animated: true, markerStart: { type: MarkerType.ArrowClosed, color: 'black' } },
  { id: 'e6-4', source: '6', target: '4', animated: true, markerStart: { type: MarkerType.ArrowClosed, color: 'black' } },
];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [focusedNode, setFocusedNode] = useState(null);
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const [zoomLevel, setZoomLevel] = useState(1);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed, color: '#f00' } }, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    setFocusedNode(node.id);
    fitView({ nodes: [node], padding: 0.1 });
  }, [fitView]);

  useEffect(() => {
    const handleScroll = (event) => {
      if (focusedNode) {
        if (event.deltaY < 0) {
          zoomIn();
        } else {
          zoomOut();
        }
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [focusedNode, zoomIn, zoomOut]);

  const getNodeStyle = (node) => {
    const baseStyle = { border: '1px solid black', boxShadow: '1px 3px 1px #9E9E9E', width: 250, height: 150 };

    let borderRadius = 20 / zoomLevel; 

    if (borderRadius < 5) {
      borderRadius = 5; 
    }

    return {
      ...baseStyle,
      borderRadius: `${borderRadius}px`,
      transform: `scale(${zoomLevel})`,
      position: 'absolute',
      left: node.position.x,
      top: node.position.y,
    };
  };

  const handleZoomChange = (event) => {
    setZoomLevel(event.target.value);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes.map(node => ({
          ...node,
          style: getNodeStyle(node),
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onNodeClick={onNodeClick}
        snapToGrid={true}
        snapGrid={[15, 15]}
      >
        <Controls />
        <Background variant="dots" color="green" gap={12} size={1} />
        {focusedNode && (
          <>
            <div
              style={{
                position: 'absolute',
                pointerEvents: 'none',
                border: 'none',
                borderRadius: '5px',
                width: nodes.find(node => node.id === focusedNode).style.width,
                height: nodes.find(node => node.id === focusedNode).style.height,
                left: nodes.find(node => node.id === focusedNode).position.x,
                top: nodes.find(node => node.id === focusedNode).position.y,
                transform: 'translate(-2px, -2px)',
              }}
            />
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoomLevel}
              onChange={handleZoomChange}
              style={{
                position: 'absolute',
                left: nodes.find(node => node.id === focusedNode).position.x,
                top: nodes.find(node => node.id === focusedNode).position.y + parseInt(nodes.find(node => node.id === focusedNode).style.height, 10) + 10,
                zIndex: 10,
              }}
            />
          </>
        )}
      </ReactFlow>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
