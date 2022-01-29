import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import productApi from "./services/products";
import filterReducer from "./services/filter";
import cartApi from "./services/cart";
import snackbarReducer from "./services/snackbarSlice";
import wishlistReducer from "./services/wishlistSlice";
import customerApi from "./services/customers";
import checkoutApi from "./services/checkout";
import userReducer from "./services/user.js";
import checkoutHelperReducer from "./services/checkoutHelper.js";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const rootReducer = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  filter: filterReducer,
  [cartApi.reducerPath]: cartApi.reducer,
  snackbar: snackbarReducer,
  wishlist: wishlistReducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [checkoutApi.reducerPath]: checkoutApi.reducer,
  user: userReducer,
  checkoutHelper: checkoutHelperReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [
    "filter",
    "snackbar",
    "wishlist",
    productApi.reducerPath,
    "user",
    customerApi.reducerPath,
    //cartApi.reducerPath,
    checkoutApi.reducerPath,
    "checkoutHelper",
  ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: {
//     [productApi.reducerPath]: productApi.reducer,
//     filter: filterReducer,
//     [cartApi.reducerPath]: cartApi.reducer,
//     snackbar: snackbarReducer,
//     wishlist: wishlistReducer,
//     [customerApi.reducerPath]: customerApi.reducer,
//     [checkoutApi.reducerPath]: checkoutApi.reducer,
//     user: userReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(productApi.middleware),
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupListeners(store.dispatch);
