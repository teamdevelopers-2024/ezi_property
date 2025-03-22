import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import "./styles/bootstrap.min.css";
// import "./styles/animate.min.css"
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
