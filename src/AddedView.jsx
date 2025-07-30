import React, { useEffect } from "react";

const AddedView = ({ setView }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setView("main");
    }, 3000);

    return () => clearTimeout(timer);
  }, [setView]);

  return (
    <div className="thank-you-screen">
      <h1 className="thank-you-text">Item added to cart!</h1>
    </div>
  );
};

export default AddedView;
