import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  capturedOrder: {},
};

export const capturedOrderSlice = createSlice({
  name: "capturedOrder",
  initialState: initialState,
  reducers: {
    setCaptureOrderHelper: (state, action) => {
      return { ...state, capturedOrder: action.payload };
    },
  },
});

export const { setCaptureOrderHelper } = capturedOrderSlice.actions;
export default capturedOrderSlice.reducer;
