import { CartItem } from "../models/cart-item.model";

export interface IState {
  items: CartItem[];
  totalAmount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
}
