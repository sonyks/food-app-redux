import { CardProps } from "./card-props.model";
import "./Card.scss";

export const Card = (props: CardProps) => {
  return <div className="card">{props.children}</div>;
};
