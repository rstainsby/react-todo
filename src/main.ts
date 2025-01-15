import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";

const container = document.getElementById("root");

if (!container) {
  throw new Error("No root element found");
}

const root = createRoot(container);
root.render(React.createElement(App));
