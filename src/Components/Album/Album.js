// Import Hooks
import React, { useState, useEffect } from "react";

// Import react-virtualized Components
import ImageMeasurer from "react-virtualized-image-measurer";

// Import helpers
import keyMapper from "../../helpers/keyMapper";

// Import globals
import {
  defaultHeight,
  defaultWidth,
  cache,
  cellPositioner,
  cellPositionerConfig,
} from "../../globals";

// Import Components
import MasonryComponent from "../../Components/MasonryComponent/MasonryComponent";
import NavBar from "../../Components/NavBar/NavBar";
import Loading from "../../Components/Loading/Loading";

// Import bootstrap components
import { Button, Alert } from "react-bootstrap";

// Import custom hooks
import useFetch from "../../Hooks/useFetch";

const Album = () => {
  //   A state that store the url to fetch data from
  const [url, setUrl] = useState(
    `https://picsum.photos/v2/list?page=1&limit=10`
  );

  //   A state to store all fetched images
  const [images, setImages] = useState([]);

  //   useFetch is a custom hook used to fetch images
  const { error, isPending, data } = useFetch(url);

  //   A state that store the index of next page to be fetched
  const [pageCount, setPageCount] = useState(2);

  useEffect(() => {
    // Every change on data append it to images state
    if (data !== null) {
      setImages([...images, ...data]);
    }
  }, [data]);

  let masonryRef = null;

  // this shows how to significantly change the input array, if items will be only appended this recalculation is not needed
  const shorten = () => {
    cache.clearAll();
    cellPositioner.reset(cellPositionerConfig);
    masonryRef.clearCellPositions();
    console.log(pageCount);
    setUrl(`https://picsum.photos/v2/list?page=${pageCount}&limit=10`);
    setPageCount(pageCount + 1);
  };

  const setMasonry = (node) => (masonryRef = node);

  return (
    <>
      {/* Nav bar */}
      <NavBar></NavBar>

      {/* Album */}
      <div className="d-flex justify-content-center flex-column">
        {/* If data still not fetched show spinner */}
        {isPending && (
          <div className="m-auto">
            <Loading></Loading>
          </div>
        )}
        {/* If there is an error in fetch show it */}
        {error && (
          <Alert key={"danger"} variant={"danger"}>
            {error}
          </Alert>
        )}
        {/* If data fetched show album */}
        {images && (
          <div style={{ width: "fit-content" }} className="m-auto">
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
                  pageCount={pageCount}
                  itemsWithSizes={itemsWithSizes}
                />
              )}
            </ImageMeasurer>
          </div>
        )}
        {/* Load more button */}
        <Button className="m-auto" onClick={shorten}>
          Load More
        </Button>
      </div>
    </>
  );
};

export default Album;
