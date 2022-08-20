import {
  CellMeasurerCache,
  createMasonryCellPositioner,
} from "react-virtualized";

const columnWidth = 200;
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
  columnCount: 8,
  columnWidth,
  spacer: 10,
};

const cellPositioner = createMasonryCellPositioner(cellPositionerConfig);


export {
  columnWidth,
  defaultHeight,
  defaultWidth,
  cache,
  cellPositioner,
  cellPositionerConfig,
};
