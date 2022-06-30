import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../models/cart-item.model";
import { CartAction, CartActionTypes } from "./cart-actions";
import { defaultState, IState } from "./state";

export const cartReducer = (
  state: IState = defaultState,
  action: CartAction
): IState => {
  debugger;
  switch (action.type) {
    case CartActionTypes.AddCartItem: {
      const updateTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updateItem: CartItem;
      let updatedItems: CartItem[];
      if (existingCartItem) {
        updateItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        } as CartItem;
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updateItem;
      } else {
        updateItem = {
          ...action.payload,
        } as CartItem;
        updatedItems = [...state.items, updateItem];
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: updateTotalAmount,
      };
    }
    case CartActionTypes.RemoveCartItem:
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const existingCartItem = state.items[existingCartItemIndex];
      const updateTotalAmount = state.totalAmount - existingCartItem.price;

      let updatedItems: CartItem[];
      if (existingCartItem.amount === 1) {
        updatedItems = [
          ...state.items.filter((item) => item.id !== action.payload),
        ];
      } else {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        } as CartItem;
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return {
        ...state,
        items: [...updatedItems],
        totalAmount: updateTotalAmount,
      };
    case CartActionTypes.ClearItems: {
      return defaultState;
    }
    default:
      return defaultState;
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: defaultState,
  reducers: {},
  extraReducers: {
    cartReducer,
  },
});

export default cartSlice.reducer;
