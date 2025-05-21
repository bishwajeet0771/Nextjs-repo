/* eslint-disable no-unused-vars */
import React, { useState } from "react";

interface RatingProps {
  maxStars?: number;
  initialRating?: number;
  onRatingChange?: (newRating: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  maxStars = 5,
  initialRating = 0,
  onRatingChange,
}) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (clickedRating: number) => {
    setRating(clickedRating);
    if (onRatingChange) {
      onRatingChange(clickedRating);
    }
  };

  return (
    <div className="flex justify-center items-center pr-5">
      {[...Array(maxStars)].map((_, index) => (
        <span
          className="text-5xl "
          key={"ratings" + _}
          onClick={() => handleStarClick(index + 1)}
          style={{
            cursor: "pointer",
            color: index < rating ? "gold" : "gray",
          }}
        >
          &#9733; {/* Star character */}
        </span>
      ))}
    </div>
  );
};

export default Rating;
{
  [...Array(10)].map((_, i) => (
    <div
      key={_}
      className="flex items-center rounded-[10px] shadow-md border-solid border-[1px] border-[#a5bfd8] px-2.5 py-0.5 w-fit text-[#001F35] font-[500] text-[18px] lg:text-[20px] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#FFF] text-secondary-foreground hover:bg-gray-100/80"
    >
      Unit
    </div>
  ));
}
