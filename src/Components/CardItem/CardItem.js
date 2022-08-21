// Import CSS
import "./CardItem.css";

// Import globals
import { columnWidth } from "../../globals";

// Import react router dom components
import { Link } from "react-router-dom";

const CardItem = ({ item, height, index }) => {
  return (
    <div className="image">
      <Link to={`/Image/${index}`}>
        <img
          src={item.download_url}
          alt={item.author}
          style={{ height: height, width: columnWidth, display: "block" }}
        ></img>
      </Link>
    </div>
  );
};

export default CardItem;
