import React from "react";
import { CellMeasurer, Masonry } from "react-virtualized";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import keyMapper from "../helpers/keyMapper";

import {
  columnWidth,
  defaultHeight,
  defaultWidth,
  cache,
  cellPositioner,
  cellPositionerConfig,
} from "../globals";
const MasonryComponent = ({ itemsWithSizes, setRef }) => {
  const cellRenderer = ({ index, key, parent, style }) => {
    const { item, size } = itemsWithSizes[index];
    const height = columnWidth * (size.height / size.width) || defaultHeight;

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>
          {item.image && (
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={item.image}
                alt={item.title}
                style={{
                  height: height,
                  width: columnWidth,
                  display: "block",
                }}
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          )}
        </div>
      </CellMeasurer>
    );
  };

  return (
    <Masonry
      cellCount={itemsWithSizes.length}
      cellMeasurerCache={cache}
      cellPositioner={cellPositioner}
      cellRenderer={cellRenderer}
      height={600}
      width={1698}
      keyMapper={keyMapper}
      ref={setRef}
    />
  );
};

export default MasonryComponent;
