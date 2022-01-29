import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkoutToken: {},
};

export const checkoutHelperSlice = createSlice({
  name: "checkoutHelper",
  initialState: initialState,
  reducers: {
    setCheckoutTokenHelper: (state, action) => {
      return { ...state, checkoutToken: action.payload };
    },
  },
});

export const { setCheckoutTokenHelper } = checkoutHelperSlice.actions;
export default checkoutHelperSlice.reducer;
