import "./CartItem.scss";
import { CartItemProps } from "./models/cart-item-props.model";

export const CartItemComponent = (props: CartItemProps) => {
  const price = `$${props.item.price.toFixed(2)}`;

  const addHandler = () => {
    props.onAdd(props.item);
  };

  const removeHandler = () => {
    props.onRemove(props.item.id);
  };

  return (
    <li className="cart-item">
      <div>
        <h2>{props.item.name}</h2>
        <div className="summary-cart-item">
          <span className="price">{price}</span>
          <span className="amount">x {props.item.amount}</span>
        </div>
      </div>
      <div className="actions">
        <button onClick={removeHandler}>−</button>
        <button onClick={addHandler}>+</button>
      </div>
    </li>
  );
};
