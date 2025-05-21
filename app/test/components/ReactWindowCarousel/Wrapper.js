import React, { useEffect, useState, useCallback } from "react";
import useMoveLogic from "./useMoveLogic";

const Wrapper = (
  {
    children,
    carouselRef,
    initialSlide,
    activeSlide,
    slidesList,
    slideWidth,
    slideHeight
  },
  ref
) => {
  const [offset, forceOffset] = useMoveLogic(ref, carouselRef);
  const [initialOffset, setInitialOffset] = useState(0);
  const [initialOffsetDone, setInitialOffsetDone] = useState(false);

  useEffect(() => {
    setInitialOffsetDone(true);
  }, [initialSlide, activeSlide]);

  const moveWrapper = useCallback(
    (newOffset) => {
      ref.current.style.transform = `translateX(${newOffset}px)`;
    },
    [ref]
  );

  useEffect(() => {
    // useffect to move wrapper when offset change
    offset !== null && moveWrapper(offset);
  }, [offset, ref, moveWrapper]);

  useEffect(() => {
    /* initial slide */
    if (!initialOffsetDone) {
      const wrapperBounding = ref.current.getBoundingClientRect();
      const carouselBounding = carouselRef.current.getBoundingClientRect();

      let initialOffsetCalculated = initialSlide * slideWidth * -1;

      if (initialOffsetCalculated > 0) {
        initialOffsetCalculated = 0;
      } else if (
        initialOffsetCalculated + wrapperBounding.width <
        carouselBounding.right - carouselBounding.x
      ) {
        const right = initialOffsetCalculated + wrapperBounding.width;
        initialOffsetCalculated =
          initialOffsetCalculated +
          carouselBounding.right -
          carouselBounding.x -
          right;
      }

      setInitialOffset(initialOffsetCalculated);
      moveWrapper(initialOffsetCalculated, 0);
      forceOffset(initialOffsetCalculated);
    }
  }, [
    ref,
    initialOffsetDone,
    carouselRef,
    slideWidth,
    initialSlide,
    setInitialOffset,
    moveWrapper,
    forceOffset
  ]);

  const clickHandler = e => {
    // since device with touch can't handle
    // updaing dom while touch move
    // every slide has pointerEnvents none
    //then when clicked -> target is wrapper
    // we simulate a click after removing pointerevent
    e.target.querySelectorAll("div").forEach(item => {
      item.style.pointerEvents = "initial";
    });
    document.elementFromPoint(e.clientX, e.clientY).click();
    e.target.querySelectorAll("div").forEach(item => {
      item.style.pointerEvents = "none";
    });
  };

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: `${slidesList.length * slideWidth}px`,
        height: `${slideHeight}px`
      }}
      className="cursor-pointer"
      onClick={clickHandler}
    >
      {children(offset !== null ? offset : initialOffset)}
    </div>
  );
};

export default React.forwardRef(Wrapper);
