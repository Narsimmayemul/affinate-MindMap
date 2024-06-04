// nodes-edges.js

export const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: 'An input node' },
      position: { x: 0, y: 50 },
      sourcePosition: 'right',
    },
    {
      id: '2',
      type: 'selectorNode',
      data: { label: 'A selector node' },
      position: { x: 250, y: 50 },
      sourcePosition: 'right',
      targetPosition: 'left',
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'An output node' },
      position: { x: 500, y: 50 },
      targetPosition: 'left',
    },
  ];
  
  export const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
    { id: 'e2-3', source: '2', target: '3', type: 'smoothstep' },
  ];
  