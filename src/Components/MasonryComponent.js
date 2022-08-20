import React from "react";
import { CellMeasurer, Masonry } from "react-virtualized";

import keyMapper from "../helpers/keyMapper";

import CardItem from "./CardItem";

import { columnWidth, defaultHeight, cache, cellPositioner } from "../globals";
const MasonryComponent = ({ itemsWithSizes, setRef }) => {
  const cellRenderer = ({ index, key, parent, style }) => {
    const { item, size } = itemsWithSizes[index];
    const height = columnWidth * (size.height / size.width) || defaultHeight;
    let id = 0;
    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>
          {item.image && (
            <CardItem key={id++} height={height} item={item}></CardItem>
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
      height={800}
      width={1650}
      keyMapper={keyMapper}
      ref={setRef}
    />
  );
};

export default MasonryComponent;
