import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerId: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setCustomerId: (state, action) => {
      console.log("payload", action.payload);
      return { ...state, customerId: action.payload };
    },
  },
});

// action creators
export const { setCustomerId } = userSlice.actions;

export default userSlice.reducer;
