import { useState } from "react";
import { createOrder } from "../../firebase-service/firebase";
import { CartItem } from "../../models/cart-item.model";
import { Modal } from "../UI/Modal";
import { CartProps } from "./models/cart-props.model";
import "./Cart.scss";
import { CartItemComponent } from "./CartItem";
import { Checkout } from "./Checkout";
import { CheckoutModel } from "./models/checkout.model";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItemAction,
  clearItemsAction,
  removeCartItemAction,
} from "../../store/cart-actions";
import { IState } from "../../store/state";

export const Cart = (props: CartProps) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: IState) => state.items);
  const selectedTotalAmount = useSelector((state: IState) => state.totalAmount);

  const cartItemRemoveHandler = (id: string) => {
    dispatch(removeCartItemAction(id));
  };
  const cartItemAddHandler = (item: CartItem) => {
    dispatch(addCartItemAction({ ...item, amount: 1 }));
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (data: CheckoutModel) => {
    setIsSubmitting(true);
    const items = selectedItems;
    await createOrder({
      user: data,
      orderItems: items,
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    dispatch(clearItemsAction());
  };

  const cartItems = (
    <ul className="cart-items">
      {selectedItems.map((item) => (
        <CartItemComponent
          item={item}
          key={item.id}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  const hasItems = selectedItems.length > 0;

  const totalAmount = `$${selectedTotalAmount.toFixed(2)}`;

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
