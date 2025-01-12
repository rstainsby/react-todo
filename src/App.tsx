import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree })

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </StrictMode>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("No root element found");
}

const root = createRoot(container);
root.render(React.createElement(App));
