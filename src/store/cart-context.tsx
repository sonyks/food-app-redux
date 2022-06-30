import { createContext } from "react";
import { CartItem } from "../models/cart-item.model";
import { IState } from "./state";

export const defaultState: IState = {
  items: [],
  totalAmount: 0,
  addItem: (item: CartItem) => {},
  removeItem: (id: any) => {},
  clearItems: () => {},
};
const CartContext = createContext(defaultState);

export default CartContext;
