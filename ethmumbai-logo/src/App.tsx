import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { CustomizableSvgIcon } from "./component";

function App() {
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center bg-gray-900 text-gray-200">
      <CustomizableSvgIcon />
    </div>
  );
}

export default App;
