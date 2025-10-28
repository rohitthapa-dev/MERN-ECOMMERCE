import { createSlice } from "@reduxjs/toolkit";
import { getCartsFromLocal, removeCartsFromLocal, setCartsToLocal } from "../local/local.js";


export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    carts: getCartsFromLocal()
  },
  reducers: {

    setCart: (state, action) => {
      const isExist = state.carts.find((item) => item.id === action.payload.id);
      if (isExist) {
        state.carts = state.carts.map((item) => item.id === action.payload.id ? action.payload : item);
        setCartsToLocal(state.carts);
      } else {
        state.carts.push(action.payload);
        setCartsToLocal(state.carts);
      }

    },

    clearCart: (state) => {
      state.carts = []
      removeCartsFromLocal();
    }


  }
});


export const { setCart, clearCart } = cartSlice.actions;