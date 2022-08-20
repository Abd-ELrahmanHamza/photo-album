import "./App.css";
import React, { useState } from "react";
import ImageMeasurer from "react-virtualized-image-measurer";
import list from "./data";

import keyMapper from "./helpers/keyMapper";

import {
  defaultHeight,
  defaultWidth,
  cache,
  cellPositioner,
  cellPositionerConfig,
} from "./globals";

import MasonryComponent from "./Components/MasonryComponent";
import { Container } from "react-bootstrap";

const App = () => {
  const [images, setImages] = useState(list);
  let masonryRef = null;

  // this shows how to significantly change the input array, if items will be only appended this recalculation is not needed
  const shorten = () => {
    cache.clearAll();
    cellPositioner.reset(cellPositionerConfig);
    masonryRef.clearCellPositions();
    setImages([...images.slice(1)]);
  };

  const setMasonry = (node) => (masonryRef = node);
  return (
    <Container fluid>
      <h1>Shutterstock</h1>
      <button onClick={shorten}>Resize</button>
      <ImageMeasurer
        items={images}
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
            setRef={setMasonry}
            itemsWithSizes={itemsWithSizes}
          />
        )}
      </ImageMeasurer>
    </Container>
  );
};

export default App;

// class App extends React.Component {
//   state = { images: list };

//   masonryRef = null;

//   // this shows how to significantly change the input array, if items will be only appended this recalculation is not needed
//   shorten = () => {
//     cache.clearAll();
//     cellPositioner.reset(cellPositionerConfig);
//     this.masonryRef.clearCellPositions();
//     this.setState({ images: [...this.state.images.slice(1)] });
//   };

//   setMasonry = (node) => (this.masonryRef = node);

//   render() {
//     return (
//       <Container fluid>
//         <h1>Shutterstock</h1>
//         <button onClick={this.shorten}>Resize</button>
//         <ImageMeasurer
//           items={this.state.images}
//           image={(item) => item.image}
//           keyMapper={keyMapper}
//           onError={(error, item, src) => {
//             console.error(
//               "Cannot load image",
//               src,
//               "for item",
//               item,
//               "error",
//               error
//             );
//           }}
//           defaultHeight={defaultHeight}
//           defaultWidth={defaultWidth}
//         >
//           {({ itemsWithSizes }) => (
//             <MasonryComponent
//               setRef={this.setMasonry}
//               itemsWithSizes={itemsWithSizes}
//             />
//           )}
//         </ImageMeasurer>
//       </Container>
//     );
//   }
// }

// export default App;
