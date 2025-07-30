import React from "react";
import thankYouImage from "./assets/Yoby Joby - VECTOR (Sticker).png";

const ExitView = ({ setView }) => {
  const handleImageClick = () => {
    setView("main");
  };

  return (
    <div className="thank-you-screen">
      <h1 className="thank-you-text">Thank you for your order!</h1>
      <img
        src={thankYouImage}
        alt="Yoby Joby"
        className="thank-you-image"
        onClick={handleImageClick}
        style={{ marginTop: "20px", cursor: "pointer" }}
      />
    </div>
  );
};

export default ExitView;
