import React, { useState, useEffect } from "react";
import ImageMeasurer from "react-virtualized-image-measurer";
// import list from "./data";

import keyMapper from "../../helpers/keyMapper";

import {
  defaultHeight,
  defaultWidth,
  cache,
  cellPositioner,
  cellPositionerConfig,
} from "../../globals";

import MasonryComponent from "../../Components/MasonryComponent/MasonryComponent";
import NavBar from "../../Components/NavBar/NavBar";
import { Button, Alert } from "react-bootstrap";
import Loading from "../../Components/Loading/Loading";
import useFetch from "../../Hooks/useFetch";

const Album = () => {
  const [url, setUrl] = useState(
    `https://picsum.photos/v2/list?page=1&limit=10`
  );
  const { error, isPending, data } = useFetch(url);
  const [images, setImages] = useState([]);
  console.log("rendered");

  useEffect(() => {
    console.log("fetched");
    console.log(data);
    if (data !== null) {
      setImages([...images, ...data]);
    }
  }, [data]);

  let masonryRef = null;
  const [pageCount, setPageCount] = useState(2);
  // this shows how to significantly change the input array, if items will be only appended this recalculation is not needed
  const shorten = () => {
    cache.clearAll();
    cellPositioner.reset(cellPositionerConfig);
    masonryRef.clearCellPositions();
    // setImages([...images.slice(1)]);
    console.log(pageCount);
    setUrl(`https://picsum.photos/v2/list?page=${pageCount}&limit=10`);
    setPageCount(pageCount + 1);
  };

  const setMasonry = (node) => (masonryRef = node);
  return (
    <>
      <NavBar></NavBar>

      <div className="d-flex justify-content-center flex-column">
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
        )}{" "}
        <Button className="m-auto" onClick={shorten}>
          Load More
        </Button>
      </div>
    </>
  );
};

export default Album;
