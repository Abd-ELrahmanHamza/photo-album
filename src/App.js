import "./App.css";
import React, { useState, useEffect } from "react";
import ImageMeasurer from "react-virtualized-image-measurer";
// import list from "./data";

import keyMapper from "./helpers/keyMapper";

import {
  defaultHeight,
  defaultWidth,
  cache,
  cellPositioner,
  cellPositionerConfig,
} from "./globals";

import MasonryComponent from "./Components/MasonryComponent";
import NavBar from "./Components/NavBar";
import { Button, Alert } from "react-bootstrap";
import Loading from "./Components/Loading";
import useFetch from "./Hooks/useFetch";

// We need to make sure images are loaded from scratch every time for this demo
// const noCacheList = list.map((item, index) => ({
//   title: index + ". " + item.title,
//   image: item.image + (item.image ? "?noCache=" + Math.random() : ""),
// }));

const App = () => {
  const { error, isPending, data } = useFetch(
    `https://picsum.photos/v2/list?page=2&limit=30`
  );
  const [images, setImages] = useState([]);
  console.log("rendered");

  useEffect(() => {
    console.log("fetched");
    if (data !== null) {
      const noCacheList = data.map((item, index) => ({
        title: index + ". " + item.title,
        image: item.image + (item.image ? "?noCache=" + Math.random() : ""),
      }));
      setImages([...images, ...data]);
    }
  }, [data]);

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
    <div>
      <NavBar></NavBar>
      <Button onClick={shorten}>Resize</Button>
      {isPending && (
        <div className="m-auto">
          <Loading></Loading>
        </div>
      )}
      {error && (
        <Alert key={"danger"} variant={"danger"}>
          {error}
        </Alert>
      )}
      {images && (
        <ImageMeasurer
          items={images}
          image={(item) => item.image}
          keyMapper={keyMapper}
          onError={(error, item, src) => {
            console.log(error, item, src);
          }}
          defaultHeight={defaultHeight}
          defaultWidth={defaultWidth}
        >
          {({ itemsWithSizes }) => (
            <MasonryComponent
              key={1}
              setRef={setMasonry}
              itemsWithSizes={itemsWithSizes}
            />
          )}
        </ImageMeasurer>
      )}
    </div>
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
