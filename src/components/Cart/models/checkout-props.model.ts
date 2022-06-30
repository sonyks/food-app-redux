import { CheckoutModel } from "./checkout.model";

export interface CheckoutProps {
  onClose(): void;
  onConfirm(data: CheckoutModel): void;
}
