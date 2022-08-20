import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

import { Container } from "react-bootstrap";

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
                class="img-fluid"
                alt="Responsive image"
              ></img>
              {/* <img
                src={images[index].download_url}
                alt={images[index].author}
              ></img> */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Image;
