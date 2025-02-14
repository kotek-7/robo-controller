import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Controller from "./Controller.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Monitor from "./Monitor.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/robo-controller" element={<Controller />} />
        <Route path="/robo-monitor" element={<Monitor />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
