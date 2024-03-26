import { createSlice } from "@reduxjs/toolkit";
import { TCartMeal } from "../types/types";

type State = {
  items: TCartMeal[];
  totalQuantity: number;
  totalPrice: number;
};

const initialAuthState: State = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialAuthState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload.item;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          ...newItem,
          // quantity: action.payload.quantity,
        });
        state.totalQuantity += newItem.quantity;
        state.totalPrice += (newItem.price.rub * newItem.quantity);
      } else {
        existingItem.quantity += newItem.quantity;
        state.totalQuantity += newItem.quantity;
        state.totalPrice += (existingItem.price.rub * newItem.quantity);
      }
    },
    updateItem(state, action) {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        state.totalQuantity += action.payload.quantity;
        state.totalPrice += (existingItem.price.rub * action.payload.quantity);
      }
    },
    removeItem(state, action) {
      const existingItemId = action.payload.id;
      const existingItem = state.items.find((item) => item.id === existingItemId);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.quantity * existingItem.price.rub;
        state.items = state.items.filter((item) => item.id !== existingItemId);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
      state.items = action.payload.cart;
    },
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;