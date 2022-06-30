import "./MealItem.scss";
import { MealItemForm } from "./MealItemForm";
import { useContext, useRef } from "react";
import CartContext from "../../../store/cart-context";
import { Meal } from "../../../models/meal.model";

export const MealItem = (props: Meal) => {
  const amountInputRef = useRef<HTMLInputElement | null>(null);
  const cartCtx = useContext(CartContext);
  const addToCartHandler = (amount: number) => {
    cartCtx.addItem({
      id: props.id,
      amount: amount,
      name: props.name,
      price: props.price,
    });
  };
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className="meal">
      <div>
        <h3>{props.name}</h3>
        <div className="description">{props.description}</div>
        <div className="price">{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} amount={amountInputRef} />
      </div>
    </li>
  );
};
