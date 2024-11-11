import { useState } from "react";

function ImageGallery() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ["https://picsum.photos/200", "https://picsum.photos/201"];

  const openFullScreen = (index) => {
    setCurrentIndex(index);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  return (
    <div>
      {/* Gallery display */}
      <div className="image-grid">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            onClick={() => openFullScreen(index)} // Open full screen on click
            style={{ cursor: "pointer", width: "150px", margin: "10px" }}
          />
        ))}
      </div>

      {/* Full-screen modal */}
      {isFullScreen && (
        <div className="fullscreen-modal" style={fullscreenStyles}>
          <button onClick={closeFullScreen} style={closeButtonStyles}>
            X
          </button>
          {/* <button onClick={prevImage} style={navButtonStyles}>
            ⟨
          </button> */}
          <img
            src={images[currentIndex]}
            alt={`Full-size ${currentIndex}`}
            style={{ maxHeight: "90vh", maxWidth: "90vw" }}
          />
          {/* <button onClick={nextImage} style={navButtonStyles}>
            ⟩
          </button> */}
        </div>
      )}
    </div>
  );
}

// Some basic inline styles for the modal and buttons
const fullscreenStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.9)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const closeButtonStyles = {
  position: "absolute",
  top: "20px",
  right: "20px",
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "2rem",
  cursor: "pointer",
};

// const navButtonStyles = {
//   background: "transparent",
//   border: "none",
//   color: "white",
//   fontSize: "2rem",
//   cursor: "pointer",
//   margin: "0 20px",
// };

export default ImageGallery;
