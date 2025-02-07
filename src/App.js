import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TableFlow from "./TableFlow";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TableFlow />
    </DndProvider>
  );
}

export default App;
