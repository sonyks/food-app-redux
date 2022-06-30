import { createAction } from "@reduxjs/toolkit";
import { CartItem } from "../models/cart-item.model";

export enum CartActionTypes {
  AddCartItem = "ADD_CART_ITEM",
  RemoveCartItem = "REMOVE_ITEM",
  ClearItems = "CLEAR_ITEMS",
}

export const addCartItemAction = createAction<CartItem>(
  CartActionTypes.AddCartItem
);
export const removeCartItemAction = createAction<string>(
  CartActionTypes.RemoveCartItem
);
export const clearItemsAction = createAction(CartActionTypes.ClearItems);

export type CartAction =
  | {
      type: CartActionTypes.AddCartItem;
      payload: CartItem;
    }
  | {
      type: CartActionTypes.RemoveCartItem;
      payload: string;
    }
  | { type: CartActionTypes.ClearItems };
