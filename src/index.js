import React from "react";
import { render } from "react-dom";
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
} from "react-virtualized";
import ImageMeasurer from "react-virtualized-image-measurer";
import list from "./data";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// Array of images with captions
//const list = [{image: 'http://...', title: 'Foo'}];

// We need to make sure images are loaded from scratch every time for this demo
const noCacheList = list;

const keyMapper = (item, index) => item.image || index;

const columnWidth = 320;
const defaultHeight = 250;
const defaultWidth = columnWidth;

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
  defaultHeight,
  defaultWidth,
  fixedWidth: true,
});

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositionerConfig = {
  cellMeasurerCache: cache,
  columnCount: 5,
  columnWidth,
  spacer: 10,
};

const cellPositioner = createMasonryCellPositioner(cellPositionerConfig);

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

class Index extends React.Component {
  state = { images: noCacheList };

  masonryRef = null;

  // this shows how to significantly change the input array, if items will be only appended this recalculation is not needed
  shorten = () => {
    cache.clearAll();
    cellPositioner.reset(cellPositionerConfig);
    this.masonryRef.clearCellPositions();
    this.setState({ images: [...this.state.images.slice(1)] });
  };

  setMasonry = (node) => (this.masonryRef = node);

  render() {
    return (
      <div>
        <h1>Shutterstock</h1>
        <button onClick={this.shorten}>Resize</button>
        <br />
        <br />
        <br />
        <ImageMeasurer
          items={this.state.images}
          image={(item) => item.image}
          keyMapper={keyMapper}
          onError={(error, item, src) => {
            console.error(
              "Cannot load image",
              src,
              "for item",
              item,
              "error",
              error
            );
          }}
          defaultHeight={defaultHeight}
          defaultWidth={defaultWidth}
        >
          {({ itemsWithSizes }) => (
            <MasonryComponent
              setRef={this.setMasonry}
              itemsWithSizes={itemsWithSizes}
            />
          )}
        </ImageMeasurer>
      </div>
    );
  }
}

// Render your grid
render(<Index />, document.getElementById("root"));
