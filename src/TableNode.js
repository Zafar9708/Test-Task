
import React from "react";
import { Handle, Position } from "reactflow";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

const TableNode = ({ data, id }) => {
  const handleColumnCheckboxChange = (columnId) => {
    console.log(`Checkbox clicked for column: ${columnId}`);
  };

  const handleColumnDragStart = (event, columnId) => {
    event.dataTransfer.setData(
      "application/reactflow-column",
      JSON.stringify({ tableId: id, columnId })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const handleColumnDrop = (event, targetColumnId) => {
    event.preventDefault();
    const { tableId: sourceTableId, columnId: sourceColumnId } = JSON.parse(
      event.dataTransfer.getData("application/reactflow-column")
    );

    data.onColumnDrop(sourceTableId, sourceColumnId, id, targetColumnId);
  };

  const handleRemoveTable = () => {
    data.onRemove(id, data.id);
  };

  return (
    <Resizable
      width={data.width || 400}
      height={data.height || 270}
      onResize={(e, { size }) => {
        data.onResize(id, size);
      }}
    >
      <div
        className="bg-white rounded-md shadow-md"
        style={{ width: data.width || 400, height: data.height || 270 }}
      >
        <div className="text-black flex justify-between items-center p-2 rounded-t-md ">
          <span className="font-semibold">{data.name}</span>
          <button
            onClick={handleRemoveTable}
            className="text-blue-500 font-bold hover:text-red-700"
            aria-label="Remove table"
          >
            &times;
          </button>
        </div>

        <table className="w-full border-collapse mt-2" style={{ minWidth: "100%" }}>
          <thead>
            <tr className="bg-blue-100">
              <th style={{ minWidth: "100px" }}>
                <input
                  type="checkbox"
                  className="mr-16"
                  onChange={() => console.log("All columns selected/deselected")}
                  aria-label="Select all columns"
                />
              </th>
              <th className="p-2 text-left" style={{ minWidth: "150px" }}>Column</th>
              <th className="p-2 text-left" style={{ minWidth: "150px" }}>| Data Type</th>
            </tr>
          </thead>
          <tbody>
            {data.columns?.map((col) => (
              <tr key={col.column_id} className="hover:bg-gray-100 transition-colors">
                <td className="p-2" style={{ minWidth: "100px" }}>
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => handleColumnCheckboxChange(col.column_id)}
                    aria-label={`Select column ${col.name}`}
                  />
                </td>
                <td
                  className="p-2 cursor-grab"
                  draggable
                  onDragStart={(event) => handleColumnDragStart(event, col.column_id)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleColumnDrop(event, col.column_id)}
                  style={{ minWidth: "150px" }}
                >
                  {col.name}
                </td>
                <td className="p-2" style={{ minWidth: "150px" }}>{col.column_data_type}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-center p-2 mt-8 bg-gray-200 text-gray-700 italic">
          Scroll to see more columns
        </div>

        <Handle
          type="source"
          position={Position.Right}
          id={`${id}-right`}
          style={{ width: "8px", height: "8px", backgroundColor: "black", border: "2px solid white" }}
        />
        <Handle
          type="target"
          position={Position.Left}
          id={`${id}-left`}
          style={{ width: "8px", height: "8px", backgroundColor: "black", border: "2px solid white" }}
        />
      </div>
    </Resizable>
  );
};

export default TableNode;


