const Image = ({ src, author }) => {
  return (
    <div className="bg-dark">
      <img src={src} alt={author}></img>
    </div>
  );
};

export default Image;
