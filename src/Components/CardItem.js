import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { columnWidth } from "../globals";

const CardItem = ({ item, height }) => {
  return (
    <img
      src={item.image}
      alt={item.title}
      style={{ height: height, width: columnWidth, display: "block" }}
    ></img>
  );
};

export default CardItem;
