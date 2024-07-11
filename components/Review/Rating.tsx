import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { RatingProps } from './Review.types';

export default function Rating({ currentRating, onRatingChange }: RatingProps) {
  const [rating, setRating] = useState(currentRating);
  const [hoverRating, setHoverRating] = useState<number>(1);
  const totalStars = 5;

  useEffect(() => {
    setRating(currentRating);
  }, [currentRating]);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    setRating(index);
    onRatingChange(index);
  };

  return (
    <div className="flex gap-1 w-full h-[100px] items-center justify-center">
      {Array.from({ length: totalStars }, (_, index) => (
        <Image
          key={index}
          src={
            index < (hoverRating || rating)
              ? '/icon/icon_star_on.svg'
              : '/icon/icon_star_off.svg'
          }
          width={50}
          height={50}
          alt={index < (hoverRating || rating) ? '채워진 별점' : '빈 별점'}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
          className="cursor-pointer"
        />
      ))}
    </div>
  );
}
