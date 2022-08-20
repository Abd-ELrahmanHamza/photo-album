import "./App.css";
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

import keyMapper from "./helpers/keyMapper";

import {
  columnWidth,
  defaultHeight,
  defaultWidth,
  cache,
  cellPositioner,
  cellPositionerConfig,
} from "./globals";

import MasonryComponent from "./Components/MasonryComponent";

class App extends React.Component {
  state = { images: list };

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

export default App;
