import React, { useState } from 'react';
import Image from 'next/image';
import { PrimaryButton } from '@/components/Button/Button';
import { formatCurrency } from '@/utils/formatCurrency';
import Rating from './Rating';
import { useMutation } from '@tanstack/react-query';
import {
  ReservationId,
  ReviewBody,
} from '@/pages/api/myReservations/apiMyReservations.types';
import { apiReview } from '@/pages/api/myReservations/apiMyReservations';
import { ReviewProps } from './Review.types';

export default function Review({ reservation, closeModal }: ReviewProps) {
  const [reviewContent, setReviewContent] = useState<string>('');
  const [rating, setRating] = useState<number>(1);

  const mutation = useMutation({
    mutationFn: (data: { id: ReservationId; body: ReviewBody }) =>
      apiReview(data.id, data.body),
    onSuccess: (result) => {
      console.log('후기 작성 완료: ', result);
      closeModal();
    },
    onError: (error) => {
      console.error('후기 작성 에러: ', error);
    },
  });

  const handleReviewSubmit = async () => {
    const body: ReviewBody = {
      rating,
      content: reviewContent,
    };
    mutation.mutate({
      id: { reservationId: reservation.id },
      body,
    });
  };

  return (
    <>
      <div className="flex gap-6 h-[125px] m:gap-4">
        <Image
          src={reservation.activity.bannerImageUrl}
          width={125}
          height={125}
          alt="체험 사진"
          className="object-cover rounded-xl m:w-[100px] m:h-[125px]"
        />
        <div className="text-nomad-black flex flex-col justify-between">
          <div>
            <p className="font-bold text-xl max-w-[270px] m:max-w-[220px] tracking-tight m:overflow-hidden m:whitespace-nowrap m:text-ellipsis dark:text-var-gray2">
              {reservation.activity.title}
            </p>
            <div className="flex gap-2 m:text-sm m:gap-1 dark:text-var-gray2">
              <p>{reservation.date}</p>
              <p>·</p>
              <p>
                {reservation.startTime} - {reservation.endTime}
              </p>
              <p>·</p>
              <p>{reservation.headCount}명</p>
            </div>
          </div>
          <div className="border border-solid border-var-gray2" />
          <p className="font-bold text-[32px] m:text-xl dark:text-var-gray2">
            ₩ {formatCurrency(reservation.totalPrice)}
          </p>
        </div>
      </div>
      <Rating
        onRatingChange={(rating) => setRating(rating)}
        currentRating={rating}
      />
      <div className="w-full h-[200px] m:h-1/2 p-4 rounded border border-solid border-var-gray2 dark:bg-var-dark2 dark:border-none">
        <textarea
          className="w-full h-full border-none outline-none text-base resize-none scrollbar-hide dark:bg-var-dark2"
          placeholder="후기를 작성해 주세요."
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <PrimaryButton size="large" style="dark" onClick={handleReviewSubmit}>
          작성하기
        </PrimaryButton>
      </div>
    </>
  );
}
