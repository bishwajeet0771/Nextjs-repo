import React, { Fragment, useState } from "react";
import styles from "@/app/styles/Rating.module.css";

interface StarRatingProps {
  onChange?: (rating: number) => void;
  initialRating?: number;
}

const RatingStars: React.FC<StarRatingProps> = ({
  onChange,
  initialRating = 0,
}) => {
  const [rating, setRating] = useState(initialRating);

  const handleChange = (value: number) => {
    setRating(value);
    if (onChange) onChange(value);
  };

  return (
    <div className={styles.starRating}>
      {[5, 4, 3, 2, 1].map((star) => (
        <Fragment key={star}>
          <input
            type="radio"
            id={`star${star}`}
            name="rating"
            value={star}
            checked={rating === star}
            onChange={() => handleChange(star)}
          />
          <label htmlFor={`star${star}`}>&#9733;</label>
        </Fragment>
      ))}
    </div>
  );
};

export default RatingStars;
