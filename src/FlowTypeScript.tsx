import { useCallback, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Node,
  addEdge,
  Background,
  Edge,
  Controls,
  Connection,
  useNodesState,
  useEdgesState,
  useReactFlow,
  // Panel,
} from "reactflow";

// import CustomNode from "./CustomNode";

import "reactflow/dist/style.css";

import CustomNode from "./CustomNode";

/*
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
*/

const initialNodes: Node[] = [];

for (let i = 1; i <= 70; i++) {
  const newNode = {
    id: i.toString(),
    data: { label: `Node ${i}` },
    position: {
      x: Math.floor((Number(i) - 1) % 4) * 200,
      y: Math.floor((Number(i) - 1) / 4) * 50,
    }, // Adjust the position as needed
  };
  initialNodes.push(newNode);
}

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3" },
];

/*
initialEdges.map(
  (item, _) => (initialNodes[Number(item.source) - 1].type = "input")
);
*/

const nodeTypes = {
  custom: CustomNode,
};

enum BackgroundVariant {
  Lines = "lines",
  Dots = "dots",
  Cross = "cross",
}

let nodeId = 5;

const Flow = () => {
  const reactFlowInstance = useReactFlow();
  const addExtraNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `Node ${id}`,
      },
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  const [variant, setVariant] = useState(BackgroundVariant.Dots);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Edge | Connection) =>
      // setEdges((els) => addEdge({ ...params, animated: true }, els)),
      setEdges((els) => addEdge({ ...params }, els)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(e, node) => console.log(node)}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
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
      <button onClick={addExtraNode} className="btn-add">
        add node
      </button>
    </div>
  );
};

const FlowTypeScript = () => {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
};

export default FlowTypeScript;
