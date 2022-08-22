import React from "react";

// Import react-virtualized components
import { CellMeasurer, Masonry } from "react-virtualized";

// Import helpers
import keyMapper from "../../helpers/keyMapper";

// Import components
import CardItem from "../CardItem/CardItem";

// Import globals
import {
  columnWidth,
  defaultHeight,
  cache,
  cellPositioner,
} from "../../globals";

/**
 *
 * @param {Array} itemsWithSizes  - Array of items with sizes
 * @param {function} setRef  - Function to set ref
 * @param {number} pageCount - Number of pages
 * @returns
 */
const MasonryComponent = ({ itemsWithSizes, setRef, pageCount }) => {
  const cellRenderer = ({ index, key, parent, style }) => {
    const { item } = itemsWithSizes[index];
    const height = columnWidth * (item.height / item.width) || defaultHeight;

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>
          {item.download_url && (
            <CardItem height={height} item={item} index={index}></CardItem>
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
      autoHeight={true}
    />
  );
};

export default MasonryComponent;
