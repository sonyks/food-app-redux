import React from "react";
import { InputProps } from "./input-props.model";
import "./Input.scss";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    return (
      <div className="input">
        <label htmlFor={props.input.id}>{props.label}</label>
        <input
          ref={ref}
          id={props.input.id}
          type={props.input.type}
          min={props.input.min}
          max={props.input.max}
          step={props.input.step}
          defaultValue={props.input.defaultValue}
        />
      </div>
    );
  }
);
