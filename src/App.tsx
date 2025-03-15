import { useState } from "react";

import { Control, Canvas } from "./components";

import "./App.css";

import { TOOL } from "./types";
function App() {
  const [tool, setTool] = useState<TOOL>(TOOL.MOVE);

  return (
    <>
      <Canvas tool={tool} />
      <Control tool={tool} onChangeTool={setTool} />
    </>
  );
}

export default App;
