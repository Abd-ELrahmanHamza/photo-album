import React from "react";
import { CellMeasurer, Masonry } from "react-virtualized";

import keyMapper from "../../helpers/keyMapper";

import CardItem from "../CardItem/CardItem";

import { columnWidth, defaultHeight, cache, cellPositioner } from "../../globals";
const MasonryComponent = ({ itemsWithSizes, setRef, pageCount }) => {
  const cellRenderer = ({ index, key, parent, style }) => {
    const { item } = itemsWithSizes[index];
    const height = columnWidth * (item.height / item.width) || defaultHeight;

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>
          {item.download_url && (
            <CardItem height={height} item={item}></CardItem>
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
      height={pageCount * window.innerHeight}
      width={window.innerWidth - 50}
      keyMapper={keyMapper}
      ref={setRef}
    />
  );
};

export default MasonryComponent;
