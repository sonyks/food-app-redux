import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../store/state";
import { CartIcon } from "../Cart/CartIcon";
import { HeaderCartButtonProps } from "./header-cart-button-props.model";
import "./HeaderCartButton.scss";

export const HeaderCartButton = (props: HeaderCartButtonProps) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const items = useSelector((state: IState) => state.items);

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const btnClasses = `button ${btnIsHighlighted ? "bump" : ""}`;
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className="icon">
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className="badge">{numberOfCartItems}</span>
    </button>
  );
};
