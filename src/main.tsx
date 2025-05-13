import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MainLayout from "./components/ui/layouts/MainLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainLayout children={null} />
  </StrictMode>
);
