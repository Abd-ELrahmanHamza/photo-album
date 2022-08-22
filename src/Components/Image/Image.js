// Import react-router-dom components
import { useParams } from "react-router-dom";

// Import components
import NavBar from "../NavBar/NavBar";

// Import bootstrap components
import { Container } from "react-bootstrap";

/**
 * Single image page
 *
 * @param {Array} images - Array of images
 *
 * @returns {React.Component} - Image component
 */
const Image = ({ images }) => {
  const { index } = useParams();
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <div className="d-flex">
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">Author : {images[index].author}</h1>
              <img
                src={images[index].download_url}
                alt={images[index].author}
                className="img-fluid"
              ></img>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Image;
