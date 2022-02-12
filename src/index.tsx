import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
//import theme from "./theme/theme.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const theme = createTheme();
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Auth0ProviderWithHistory>
              <App />
            </Auth0ProviderWithHistory>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
