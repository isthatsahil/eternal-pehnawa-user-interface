import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  price: 20000,
  view: "grid",
  sort: "price-lowest",
  freeShipping: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    updateFilter: (state, action) => {
      console.log(action.payload);
      return { ...state, ...action.payload };
    },
    clearFilter: (state) => {
      return { ...initialState, view: state.view };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateFilter, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
