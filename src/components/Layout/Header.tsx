import React from "react";
import mealsImage from "../../assets/meals.jpg";
import { HeaderProps } from "./header-props.model";
import "./Header.scss";
import { HeaderCartButton } from "./HeaderCartButton";

export const Header = (props: HeaderProps) => {
  return (
    <React.Fragment>
      <header className="header">
        <h1>Rect Meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className="main-image">
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </React.Fragment>
  );
};
