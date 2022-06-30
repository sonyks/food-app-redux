import { useContext, useState } from "react";
import { createOrder } from "../../firebase-service/firebase";
import { CartItem } from "../../models/cart-item.model";
import CartContext from "../../store/cart-context";
import { Modal } from "../UI/Modal";
import { CartProps } from "./models/cart-props.model";
import "./Cart.scss";
import { CartItemComponent } from "./CartItem";
import { Checkout } from "./Checkout";
import { CheckoutModel } from "./models/checkout.model";

export const Cart = (props: CartProps) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item: CartItem) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (data: CheckoutModel) => {
    setIsSubmitting(true);
    const items = cartCtx.items;
    await createOrder({
      user: data,
      orderItems: items,
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearItems();
  };

  const cartItems = (
    <ul className="cart-items">
      {cartCtx.items.map((item) => (
        <CartItemComponent
          item={item}
          key={item.id}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  const hasItems = cartCtx.items.length > 0;

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const modalActions = (
    <div className="actions">
      <button className="button--alt" onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className="button" onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className="total">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onClose={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className="actions">
        <button className="button--alt" onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};
