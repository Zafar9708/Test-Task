

import React, { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./Sidebar";
import TableNode from "./TableNode";
import CustomEdge from "./CustomEdge";

const nodeTypes = { table: TableNode };
const edgeTypes = { custom: CustomEdge };

const initialTables = [
  {
    id: "1",
    name: "employee_salary",
    columns: [
      { column_id: "c1", name: "experience", column_data_type: "INTEGER" },
      { column_id: "c2", name: "gender", column_data_type: "VARCHAR(255)" },
      { column_id: "c3", name: "salary", column_data_type: "INTEGER" },
    ],
  },
  {
    id: "2",
    name: "patients",
    columns: [
      { column_id: "c4", name: "date_of_birth", column_data_type: "DATE" },
      { column_id: "c5", name: "first_name", column_data_type: "VARCHAR(50)" },
      { column_id: "c6", name: "gender", column_data_type: "VARCHAR(10)" },
    ],
  },
  {
    id: "e",
    name: "employees",
    columns: [
      { column_id: "c4", name: "name", column_data_type: "VARCHAR(50)" },
      { column_id: "c5", name: "experience", column_data_type: "INTEGER" },
      { column_id: "c6", name: "place", column_data_type: "VARCHAR(10)" },
    ],
  },
];

export default function TableFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [usedTables, setUsedTables] = useState(new Set()); // Track used tables

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge({ ...params, type: "custom", animated: true }, eds));
    },
    [setEdges]
  );

  const onDropTable = (event) => {
    event.preventDefault();
    const tableData = JSON.parse(event.dataTransfer.getData("application/reactflow"));

    if (usedTables.has(tableData.id)) return; // Prevent duplicate drops

    const newNode = {
      id: uuidv4(),
      type: "table",
      position: { x: event.clientX - 100, y: event.clientY - 50 },
      data: {
        ...tableData,
        onRemove: (nodeId, tableId) => onRemoveTable(nodeId, tableId),
        onResize: (nodeId, size) => onResizeTable(nodeId, size),
        onColumnDrop: (sourceNodeId, sourceColumnId, targetNodeId, targetColumnId) =>
          onDropColumn(sourceNodeId, sourceColumnId, targetNodeId, targetColumnId),
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setUsedTables((prev) => new Set(prev).add(tableData.id)); // Disable dragged table
  };

  const onDropColumn = (sourceNodeId, sourceColumnId, targetNodeId, targetColumnId) => {
    const newEdge = {
      id: `edge-${sourceNodeId}-${sourceColumnId}-${targetNodeId}-${targetColumnId}`,
      source: sourceNodeId,
      target: targetNodeId,
      sourceHandle: sourceColumnId,
      targetHandle: targetColumnId,
      type: "custom",
      animated: true,
    };

    setEdges((eds) => addEdge(newEdge, eds));
  };

  const onRemoveTable = (nodeId, tableId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    setUsedTables((prev) => {
      const updated = new Set(prev);
      updated.delete(tableId); // Re-enable table in sidebar
      return updated;
    });
  };

  const onResizeTable = (nodeId, size) => {
  setNodes((nds) =>
    nds.map((node) =>
      node.id === nodeId
        ? {
            ...node,
            data: {
              ...node.data,
              width: size.width,
              height: size.height,
            },
          }
        : node
    )
  );
};

  return (
    <div className="flex h-screen">
      <Sidebar tables={initialTables} usedTables={usedTables} />
      <div
        className="flex-grow relative border"
        style={{ height: "calc(100vh - 2rem)" }}
        onDrop={onDropTable}
        onDragOver={(event) => event.preventDefault()}
      >
        <ReactFlow 
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodesDraggable={true}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant="none" />
          
        </ReactFlow>
      </div>
    </div>
  );
}

