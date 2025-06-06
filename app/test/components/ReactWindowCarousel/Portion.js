import React, { useState, useEffect } from "react";

const Portion = ({
  offset,
  carouselRef,
  wrapperRef,
  slidesList,
  slideWidth
}) => {
  const [portion, setPortion] = useState();
  const [identifier, setIdentifier] = useState();

  useEffect(() => {
    setIdentifier(Math.floor(Math.random() * 1000));
  }, []);

  useEffect(() => {
    if (wrapperRef.current && carouselRef.current) {
      const carouselBounding = carouselRef.current.getBoundingClientRect();

      const diff = offset - carouselBounding.x;

      setPortion({
        x: diff < 0 ? diff * -1 : 0,
        right: carouselBounding.right,
        width: carouselBounding.width
      });
    }
  }, [setPortion, carouselRef, wrapperRef, offset]);

  if (!portion) {
    return "loading";
  }

  let indexFirstItem = parseInt(portion.x / slideWidth, 0) - 10;
  indexFirstItem = indexFirstItem < 0 ? 0 : indexFirstItem;
  const countItems = parseInt(portion.width / slideWidth, 0) + 20;

  const items = slidesList.slice(indexFirstItem, indexFirstItem + countItems);

  // const items = slidesList;
  return items.map((item, index) => {
    const key = identifier + "-carousel-slide-" + (indexFirstItem + index);
    return (
      <div
        key={key}
        id={key}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: slideWidth,
          transform: `translateX(${(indexFirstItem + index) * slideWidth}px)`,
          pointerEvents: "none",
        }}
      >
        {item}
      </div>
    );
  });
};

export default Portion;
