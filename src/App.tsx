import { StrictMode } from "react";
import "./style.css";
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

export default App;