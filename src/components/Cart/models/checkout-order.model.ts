import { CartItem } from "../../../models/cart-item.model";
import { CheckoutModel } from "./checkout.model";

export interface CheckoutOrder {
  user: CheckoutModel;
  orderItems: CartItem[];
}
