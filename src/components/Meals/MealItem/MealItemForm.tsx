import { useRef, useState } from "react";
import { Input } from "../../UI/Input";
import "./MealItemForm.scss";
import { MenuItemFormProps } from "./menu-item-form-props.model";

export const MealItemForm = (props: MenuItemFormProps) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef<HTMLInputElement | null>(null);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current?.value;
    const enteredAmountNumber = Number(enteredAmount);

    if (
      enteredAmount?.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};
