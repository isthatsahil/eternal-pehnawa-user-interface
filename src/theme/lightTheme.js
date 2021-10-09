import { createTheme } from "@mui/material";

export const LightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "rgba(20,33,61,1)",
      paper: "rgba(28,27,27,0.47)",
    },
  },
});
