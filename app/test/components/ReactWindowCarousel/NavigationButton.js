import React from "react";

const NavigationButton = ({ nextSlideHandler, previousSlideHandler }) => {
  return (
    <>
      <div
        role="navigation"
        style={{
          position: "absolute",
          right: 0,
          background: "#000",
          top: "calc(50% - 20px)",
          height: 40,
          width: 110,
          cursor: "pointer"
        }}
        onClick={nextSlideHandler}
      >
        <span
          style={{
            color: "#fff",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          Next
        </span>
      </div>

      <div
        role="navigation"
        style={{
          position: "absolute",
          left: 0,
          background: "#000",
          top: "calc(50% - 20px)",
          height: 40,
          width: 110,
          cursor: "pointer"
        }}
        onClick={previousSlideHandler}
      >
        <span
          style={{
            color: "#fff",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          Previous
        </span>
      </div>
    </>
  );
};

export default NavigationButton;
