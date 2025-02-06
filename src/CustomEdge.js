import React from "react";
import { getBezierPath, EdgeLabelRenderer, BaseEdge } from "reactflow";
import { FaEquals } from "react-icons/fa";

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, markerEnd }) => {
  const [edgePath, labelX, labelY] = getBezierPath({ sourceX, sourceY, targetX, targetY });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ stroke: "#f59e0b", strokeWidth: 2 }} />
      <EdgeLabelRenderer>
        <div
          className="absolute bg-white p-1 rounded-full shadow-md border cursor-pointer"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          }}
        >
          <FaEquals className="text-blue-500" />
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;