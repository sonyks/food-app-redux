import { RefObject } from "react";

export interface MenuItemFormProps {
  onAddToCart(amount: number): void;
  amount: RefObject<HTMLInputElement | null>;
}
