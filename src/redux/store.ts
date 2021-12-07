import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import productApi from "./services/products";
import filterReducer from "./services/filter";
import cartApi from "./services/cart";
import snackbarReducer from "./services/snackbarSlice";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    filter: filterReducer,
    [cartApi.reducerPath]: cartApi.reducer,
    snackbar: snackbarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

setupListeners(store.dispatch);
