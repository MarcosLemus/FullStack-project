import ReactDOM from "react-dom/client";

import "./bootstrap.js";

import ThemeProvider from "./theme";
import { AuthProvider } from "hooks";
import RouterProvider from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthProvider>
      <RouterProvider />
    </AuthProvider>
  </ThemeProvider>
);
