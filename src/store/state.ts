import { CartItem } from "../models/cart-item.model";

export interface IState {
  items: CartItem[];
  totalAmount: number;
}

export const defaultState: IState = {
  items: [],
  totalAmount: 0,
};
