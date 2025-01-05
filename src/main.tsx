import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import React from "react";

const App = () => {
  return (
    <StrictMode>
      <div className="container">
        <h1>Hello, World!</h1>
      </div>
    </StrictMode>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("No root element found");
}

const root = createRoot(container);
root.render(React.createElement(App));
