import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { columnWidth } from "../globals";

const CardItem = ({ item, height }) => {
  return (
    <Card style={{ width: { columnWidth } }}>
      <Card.Img
        src={item.download_url}
        alt={item.author}
        style={{ height: height, width: columnWidth, display: "block" }}
      />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>

    // <img
    //   src={item.image}
    //   alt={item.title}
    //   style={{ height: height, width: columnWidth, display: "block" }}
    // ></img>
  );
};

export default CardItem;
