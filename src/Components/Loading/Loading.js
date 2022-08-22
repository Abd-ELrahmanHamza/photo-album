// Import bootstrap components
import Spinner from "react-bootstrap/Spinner";

/**
 * Loading component
 *
 * @returns {React.Component} - Loading component
 */
function Loading() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loading;
