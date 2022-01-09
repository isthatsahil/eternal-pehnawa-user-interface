import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  price: 20000,
  view: "grid",
  sort: "price-lowest",
  freeShipping: false,
  artisan: "all",
  subCategory: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    updateFilter: (state, action) => {
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
