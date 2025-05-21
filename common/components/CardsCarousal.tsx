import { CarouselScrollButton } from "@/app/images/commonSvgs";
import React, { useRef } from "react";
import styles from "@/app/styles/Carousel.module.css";
import { useMediaQuery } from "@mantine/hooks";

type Props = {
  allCards: any;
  dataLength: number;
  containerClass?: string;
  scrollSize?: number;
  gap?: number;
};

function CardsCarousal({
  allCards,
  dataLength,
  containerClass,
  scrollSize = 3000,
  gap = 16,
}: Props) {
  const isMobile = useMediaQuery("(max-width: 601px)");

  const containerRef = useRef<HTMLDivElement>(null);
  const onScrollingLeftAndRight = (direction: string) => {
    const ele = containerRef.current;
    if (ele)
      direction == "L"
        ? (ele.scrollLeft -= scrollSize + gap)
        : (ele.scrollLeft += scrollSize + gap);
  };

  return (
    <div
      className={`${styles.cardCarouselMainCon} ${
        containerClass ? containerClass : ""
      }`}
    >
      {!isMobile &&
        dataLength != undefined &&
        dataLength != null &&
        dataLength >= 2 && (
          <button
            className={`${styles.srcollButton} ${styles.srcollButtonLeft}`}
            onClick={() => onScrollingLeftAndRight("L")}
             aria-label="Scroll carousel left"
          >
            <CarouselScrollButton className={styles.srcollButtonIcons} />
          </button>
        )}

      <div ref={containerRef} className={styles.cardsHoldingContainer}>
        <div
          className={styles.cardsHoldingInnerContainer}
          style={{ gap: `${gap}px` }}
        >
          {allCards}
        </div>
      </div>

      {!isMobile &&
        dataLength != undefined &&
        dataLength != null &&
        dataLength >= 2 && (
          <button
            className={`${styles.srcollButton} ${styles.srcollButtonRight}`}
            onClick={() => onScrollingLeftAndRight("R")}
             aria-label="Scroll carousel Right"
          >
            <CarouselScrollButton className={styles.srcollButtonIcons} />
          </button>
        )}
    </div>
  );
}

export default CardsCarousal;
