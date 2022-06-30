import "./MealItem.scss";
import { MealItemForm } from "./MealItemForm";
import { useRef } from "react";
import { Meal } from "../../../models/meal.model";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../../store/cart-reducer";

export const MealItem = (props: Meal) => {
  const amountInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const addToCartHandler = (amount: number) => {
    dispatch(
      addCartItem({
        id: props.id,
        amount: amount,
        name: props.name,
        price: props.price,
      })
    );
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
