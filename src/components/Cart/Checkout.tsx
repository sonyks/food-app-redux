import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
} from "react-hook-form";
import "./Checkout.scss";
import { CheckoutProps } from "./models/checkout-props.model";

type CheckoutInputs = {
  name: string;
  street: string;
  postal: string;
  city: string;
};

const trapSpacesForRequiredFields = (value: string) => !!value.trim();

export const Checkout = (props: CheckoutProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInputs>();

  const onSubmit: SubmitHandler<CheckoutInputs> = (
    data: UnpackNestedValue<CheckoutInputs>
  ) => {
    props.onConfirm({
      name: data.name,
      city: data.city,
      postal: data.postal,
      street: data.street,
    });
  };
  const onSubmitError: SubmitErrorHandler<CheckoutInputs> = (
    errors: FieldErrors<CheckoutInputs>
  ) => console.log(errors);

  return (
    <form
      className="checkout-form"
      onSubmit={handleSubmit(onSubmit, onSubmitError)}
    >
      <div className={`checkout-control ${errors.name && "checkout-invalid"}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          {...register("name", {
            required: true,
            validate: trapSpacesForRequiredFields,
          })}
        />
        {errors.name && (
          <p>Name field is required. Please enter a valid name!</p>
        )}
      </div>
      <div
        className={`checkout-control ${errors.street && "checkout-invalid"}`}
      >
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          {...register("street", {
            required: true,
            validate: trapSpacesForRequiredFields,
          })}
        />
        {errors.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={`checkout-control ${errors.city && "checkout-invalid"}`}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          {...register("postal", {
            required: true,
            validate: trapSpacesForRequiredFields,
          })}
        />
        {errors.postal && (
          <p>Please enter a valid postal code (5 characters length)</p>
        )}
      </div>
      <div className={`checkout-control ${errors.city && "checkout-invalid"}`}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          {...register("city", {
            required: true,
            validate: trapSpacesForRequiredFields,
          })}
        />
        {errors.city && <p>Please enter a valid city!</p>}
      </div>
      <div className="checkout-actions">
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className="checkout-submit">Confirm</button>
      </div>
    </form>
  );
};
