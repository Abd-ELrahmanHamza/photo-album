// Import CSS
import "./CardItem.css";

// Import globals
import { columnWidth } from "../../globals";

// Import react router dom components
import { Link } from "react-router-dom";

/**
 * Card item component
 *
 * @param {Object} item - Image object
 * @param {number} index - Index of image
 * @param {number} height - Height of image
 *
 * @returns {React.Component} - CardItem component
 */
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
