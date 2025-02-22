import { createRoot } from "react-dom/client";
import "./index.css";
import Controller from "./Controller.tsx";
import { HashRouter, Route, Routes } from "react-router";
import Monitor from "./Monitor.tsx";
import PidTuning from "./PidTuning.tsx";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Routes>
      <Route
        path="/"
        element={<Controller />}
      />
      <Route
        path="/monitor/"
        element={<Monitor />}
      />
      <Route
        path="/pid-tuning/"
        element={<PidTuning />}
      />
    </Routes>
  </HashRouter>,
);
