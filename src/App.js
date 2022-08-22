// ts-check

// Import CSS
import "./App.css";

// Import Components
import Album from "./Components/Album/Album";
import Image from "./Components/Image/Image";

// Import react router dom
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import hooks
import { useState } from "react";

/**
 * This is the main component of the app
 *
 * @component
 * @returns {React.ReactElement}  <App>  App  component
 */
const App = () => {
  //   A state to store all fetched images
  const [images, setImages] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Album images={images} setImages={setImages} />}
        ></Route>
        <Route path="/Image/:index" element={<Image images={images} />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
