// Import CSS
import "./CardItem.css";

import { columnWidth } from "../../globals";

const CardItem = ({ item, height }) => {
  return (
    <img
      src={item.download_url}
      alt={item.author}
      style={{ height: height, width: columnWidth, display: "block" }}
      className="image"
    ></img>
  );
};

export default CardItem;
