import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocaltStorage } from "../../utils/utils";

const initialState = {
  items: getLocalStorage("wishlist") || [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    addToWishlist: (state, action) => {
      if (state.items.indexOf(action.payload.productId) === -1) {
        state.items.push(action.payload.productId);
        setLocaltStorage("wishlist", state.items);
      }
    },
    removeFromWsihlist: (state, action) => {
      state.items = state.items.filter(
        (itemId: string) => itemId !== action.payload.productId
      );
      setLocaltStorage("wishlist", state.items);
    },
  },
});

export const { addToWishlist, removeFromWsihlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
