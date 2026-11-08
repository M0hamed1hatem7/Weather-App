import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CitiesProvider } from "./context/CitiesProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { ToastProvider } from "./context/ToastProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <CitiesProvider>
          <App />
        </CitiesProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
);
