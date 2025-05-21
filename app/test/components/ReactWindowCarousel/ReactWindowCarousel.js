import React, { useRef, useState } from "react";
import Wrapper from "./Wrapper";
import Portion from "./Portion";
import NavigationButton from "./NavigationButton";

const ReactWindowCarousel = ({
  slidesList,
  initialSlide,
  slideWidth,
  slideHeight,
  slideBy = 1
}) => {
  const carouselRef = useRef();
  const wrapperRef = useRef();

  const [activeSlide, setActiveSlide] = useState(initialSlide || 0);
  //  console.log(activeSlide)
  const nextSlideHandler = () => {
    setActiveSlide(activeSlide + slideBy);
  };
  const previousSlideHandler = () => {
    setActiveSlide(activeSlide - slideBy);
  };

  return (
    <div
      ref={carouselRef}
      style={{ position: "relative", maxWidth: "100%", overflow: "hidden" }}
    >
      <Wrapper
        ref={wrapperRef}
        {...{
          carouselRef,
          initialSlide,
          activeSlide,
          slidesList,
          slideWidth,
          slideHeight
        }}
      >
        {offset => (
          <Portion
            {...{ offset, carouselRef, wrapperRef, slidesList, slideWidth }}
          />
        )}
      </Wrapper>

      <NavigationButton {...{ nextSlideHandler, previousSlideHandler }} />
    </div>
  );
};

export default React.memo(ReactWindowCarousel);
