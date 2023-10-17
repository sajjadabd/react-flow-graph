import { useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import { Nodes, Edges } from "./Graph";

import "reactflow/dist/style.css";

// const initialNodes = [
//   { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
//   { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
// ];
// const initialEdges = [{ id: "e1-2", source: "1", target: "2", animated: true }];

export default function FlowInteractiveWithControl() {
  const [nodes, setNodes, onNodesChange] = useNodesState(Nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(Edges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
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
        fitView
      >
        <Controls />
        {/* <MiniMap /> */}
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
