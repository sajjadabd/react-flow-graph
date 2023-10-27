import { useCallback, useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  addEdge,
  useViewport,
  ReactFlowProvider,
} from "reactflow";

import { Nodes, Edges } from "./Graph";

import CustomNode from "./CustomNode";

import "reactflow/dist/style.css";

// const initialNodes = [
//   { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
//   { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
// ];
// const initialEdges = [{ id: "e1-2", source: "1", target: "2", animated: true }];

const nodeTypes = {
  custom: CustomNode,
};

function FlowInteractive() {
  const { x, y, zoom } = useViewport();

  useEffect(() => {
    console.log(x, y, zoom);
  }, [x, y, zoom]);

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
        // edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onlyRenderVisibleElements={true}
        elementsSelectable={true}
        elevateNodesOnSelect={true}
        snapToGrid={true}
        snapGrid={[25, 25]}
        maxZoom={5}
        minZoom={0.5}

        // fitView
      >
        <Controls />
        {/* <MiniMap /> */}
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

const FlowInteractiveWithControl = () => {
  return (
    <ReactFlowProvider>
      <FlowInteractive />
    </ReactFlowProvider>
  );
};

export default FlowInteractiveWithControl;
