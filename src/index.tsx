import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme/theme.js";
//const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
