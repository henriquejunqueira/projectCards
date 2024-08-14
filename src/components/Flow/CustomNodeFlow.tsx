import React, { useState, useEffect, useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import ColorSelectorNode from './ColorSelectorNode';

//import './index.css';

const initBgColor = '#fffafa'; // Define a cor inicial do background do painel

const connectionLineStyle = { stroke: '#8d0f0f' };
const snapGrid = [20, 20];
const nodeTypes = {
  selectorNode: ColorSelectorNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const CustomNodeFlow = (id, linhas) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  useEffect(() => {
    const onChange = (event) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== '2') {
            return node;
          }

          const color = event.target.value;

          setBgColor(color);

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        })
      );
    };

    // CARDS ANOTAÇÕES
    setNodes([
      {
        id: '1',
        type: 'input',
        data: { label: 'Anotação 01' },
        position: { x: 0, y: 50 },
        sourcePosition: 'right',
      },
      // CARD PRINCIPAL DE ENTRADA DE DADOS
      {
        id: '2',
        type: 'selectorNode',
        data: { onChange: onChange, color: initBgColor },
        style: {
          border: '1px solid #222222',
          padding: 10,
          borderRadius: '10px',
          background: '#222222',
          color: '#fffafa',
        },
        position: { x: 300, y: 50 },
      },
      {
        id: '3',
        type: 'output',
        data: { label: 'Anotação 02' },
        position: { x: 650, y: 25 },
        targetPosition: 'left',
      },
      {
        id: '4',
        type: 'output',
        data: { label: 'Anotação 03' },
        position: { x: 650, y: 100 },
        targetPosition: 'left',
      },
    ]);

    // LINHAS
    setEdges([
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: true,
        style: { stroke: '#8d0f0f' },
      },
      {
        id: 'e2a-3',
        source: '2',
        target: '3',
        sourceHandle: 'a',
        animated: true,
        style: { stroke: '#8d0f0f' },
      },
      {
        id: 'e2b-4',
        source: '2',
        target: '4',
        sourceHandle: 'b',
        animated: true,
        style: { stroke: '#8d0f0f' },
      },
    ]);
  }, []);

  // CONEXÃO
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, animated: true, style: { stroke: '#8d0f0f' } },
          eds
        )
      ),
    []
  );
  return (
    // PAINEL
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      style={{
        background: bgColor,
      }}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      snapGrid={snapGrid}
      defaultViewport={defaultViewport}
      fitView
      attributionPosition='bottom-left'
    >
      {/* MINIMAPA DO CANTO INFERIOR DIREITO */}
      <MiniMap
        nodeStrokeColor={(n) => {
          if (n.type === 'input') return '#0041d0';
          if (n.type === 'selectorNode') return bgColor;
          if (n.type === 'output') return '#ff0072';
        }}
        nodeColor={(n) => {
          if (n.type === 'selectorNode') return bgColor;
          return '#fff';
        }}
      />
      {/* CONTROLES DO CANTO INFERIOR ESQUERDO */}
      <Controls />
    </ReactFlow>
  );
};

export default CustomNodeFlow;
