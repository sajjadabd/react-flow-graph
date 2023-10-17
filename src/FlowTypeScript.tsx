import { useCallback, useState } from "react";
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Controls,
  Connection,
  useNodesState,
  useEdgesState,
  // Panel,
} from "reactflow";

// import CustomNode from "./CustomNode";

import "reactflow/dist/style.css";

import CustomNode from "./CustomNode";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  },
  { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
  { id: "3", data: { label: "Node 3" }, position: { x: 400, y: 100 } },
  {
    id: "4",
    type: "custom",
    data: { label: "Node" },
    position: { x: 400, y: 200 },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3" },
];

const nodeTypes = {
  custom: CustomNode,
};

enum BackgroundVariant {
  Lines = "lines",
  Dots = "dots",
  Cross = "cross",
}

const FlowTypeScript = () => {
  const [variant, setVariant] = useState(BackgroundVariant.Dots);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((els) => addEdge({ ...params, animated: true }, els)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <Background variant={variant} gap={12} size={1} />
        {/* <Panel position="top-left">
          <div>variant:</div>
          <button onClick={() => setVariant(BackgroundVariant.Dots)}>
            dots
          </button>
          <button onClick={() => setVariant(BackgroundVariant.Lines)}>
            lines
          </button>
          <button onClick={() => setVariant(BackgroundVariant.Cross)}>
            cross
          </button>
        </Panel> */}
      </ReactFlow>
    </div>
  );
};

export default FlowTypeScript;
