import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  severity: "success",
  message: "",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { showSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
