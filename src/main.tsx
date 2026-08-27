import { App } from "@/app/App";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/app/styles/globals.css";
import "@/app/styles/variables.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
