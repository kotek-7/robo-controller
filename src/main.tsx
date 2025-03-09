import { createRoot } from "react-dom/client";
import "./index.css";
import Controller from "./Controller.tsx";
import { HashRouter, Route, Routes } from "react-router";
import Monitor from "./Monitor.tsx";
import PidTuning from "./PidTuning.tsx";
import JoystickDedicatedController from "./JoystickDedicatedController.tsx";
import ButtonsDedicatedController from "./ButtonsDedicatedController.tsx";

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
      <Route
        path="/joystick-only/"
        element={<JoystickDedicatedController />}
      />
      <Route
        path="/buttons-only/"
        element={<ButtonsDedicatedController />}
      />
    </Routes>
  </HashRouter>,
);
