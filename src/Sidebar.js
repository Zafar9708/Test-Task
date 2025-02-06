

import React, { useState } from "react";

export default function Sidebar({ tables, usedTables }) {
  const [tablesExpanded, setTablesExpanded] = useState(false);
  const [expandedTables, setExpandedTables] = useState(new Set());

  const onDragStart = (event, table) => {
    if (usedTables.has(table.id)) return; 
    event.dataTransfer.setData("application/reactflow", JSON.stringify(table));
    event.dataTransfer.effectAllowed = "move";
  };

  const toggleTables = () => {
    setTablesExpanded((prev) => !prev);
  };

  const toggleTable = (tableId) => {
    setExpandedTables((prev) => {
      const newExpanded = new Set(prev);
      newExpanded.has(tableId) ? newExpanded.delete(tableId) : newExpanded.add(tableId);
      return newExpanded;
    });
  };

  return (
    <aside className="w-64 p-4 bg-gray-100 border-r">
      <div className="flex items-center">
        <button
          onClick={toggleTables}
          className="mr-2 w-6 h-6 flex items-center justify-center border rounded bg-gray-300 hover:bg-gray-400"
        >
          {tablesExpanded ? "−" : "+"}
        </button>
        <h2 className="font-semibold">Tables</h2>
      </div>

      {tablesExpanded && (
        <div className="mt-2 ml-4">
          {tables.map((table) => (
            <div key={table.id} className="mb-2">
              <div
                className={`p-2  rounded  flex items-center cursor-pointer ${usedTables.has(table.id) ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
                  }`}
                draggable={!usedTables.has(table.id)}
                onDragStart={(event) => onDragStart(event, table)}
              >
                <button
                  onClick={() => toggleTable(table.id)}
                  className="mr-2 w-6 h-6 flex items-center justify-center border rounded bg-gray-300"
                >
                  {expandedTables.has(table.id) ? "+" : "+"}
                </button>
                {table.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}


