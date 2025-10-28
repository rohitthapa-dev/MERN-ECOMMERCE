import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "./mainApi.js";
import { userSlice } from "../features/user/userSlice.js";
import { cartSlice } from "../features/cart/cartSlice.js";


export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [mainApi.reducerPath]: mainApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    mainApi.middleware
  ])
});