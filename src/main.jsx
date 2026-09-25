import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import ThemeProvider from "./theme/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
