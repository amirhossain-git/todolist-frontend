import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import "./styles.css";
import { ThemeProvider } from "./state/theme.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2600,
            style: {
              background: "rgba(15, 23, 42, 0.92)",
              color: "#fff",
              borderRadius: "14px"
            }
          }}
        />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

