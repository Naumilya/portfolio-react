import { App } from "@/app/App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/app/styles/globals.css";
import "@/app/styles/variables.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
