import { CartItem } from "../../../models/cart-item.model";

export interface CartItemProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onAdd: (item: CartItem) => void;
}
