import { Node } from "reactflow";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    data: { label: "1" },
    position: { x: 250, y: 25 },
  },
  {
    id: "2",
    // you can also pass a React component as a label
    type: "custom",
    data: { label: <div>2</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "custom",
    data: { label: "3" },
    position: { x: 250, y: 250 },
  },
];

export default initialNodes;
