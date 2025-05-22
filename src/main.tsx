import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainLayout } from "./components/layout/MainLayout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainLayout children={null} />
  </StrictMode>
);
