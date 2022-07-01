import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../models/cart-item.model";
import { defaultState } from "./state";

const cartSlice = createSlice({
  name: "cart",
  initialState: defaultState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      const currentState = current(state);
      const updateTotalAmount =
        currentState.totalAmount + action.payload.price * action.payload.amount;
      const existingCartItemIndex = currentState.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = currentState.items[existingCartItemIndex];
      let updateItem: CartItem;
      let updatedItems: CartItem[];
      if (existingCartItem) {
        updateItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        } as CartItem;
        updatedItems = [...currentState.items];
        updatedItems[existingCartItemIndex] = updateItem;
      } else {
        updateItem = {
          ...action.payload,
        } as CartItem;
        updatedItems = [...currentState.items, updateItem];
      }

      state.items = updatedItems;
      state.totalAmount = updateTotalAmount;
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      const currentState = current(state);
      const existingCartItemIndex = currentState.items.findIndex(
        (item) => item.id === action.payload
      );
      const existingCartItem = currentState.items[existingCartItemIndex];
      const updateTotalAmount =
        currentState.totalAmount - existingCartItem.price;

      let updatedItems: CartItem[];
      if (existingCartItem.amount === 1) {
        updatedItems = [
          ...currentState.items.filter((item) => item.id !== action.payload),
        ];
      } else {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        } as CartItem;
        updatedItems = [...currentState.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      state.items = [...updatedItems];
      state.totalAmount = updateTotalAmount;
    },
    clearItems: (state) => {
      state.items = defaultState.items;
      state.totalAmount = 0;
    },
  },
});

export const { addCartItem, removeCartItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
