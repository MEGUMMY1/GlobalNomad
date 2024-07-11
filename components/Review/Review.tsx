import React, { useState } from 'react';
import { useModal } from '@/hooks/useModal';
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

export default function Review({ reservationId }: ReservationId) {
  const { openModal } = useModal();
  const [reviewContent, setReviewContent] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  const mutation = useMutation({
    mutationFn: (data: { id: ReservationId; body: ReviewBody }) =>
      apiReview(data.id, data.body),
    onSuccess: (result) => {
      console.log('후기 작성 완료: ', result);
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
      id: { reservationId },
      body,
    });
  };

  return (
    <>
      <PrimaryButton
        size="small"
        style="dark"
        onClick={() =>
          openModal({
            title: '후기 작성',
            hasButton: true,
            callBackFnc: handleReviewSubmit,
            buttonChildren: '작성하기',
            content: (
              <>
                <div className="flex gap-6 m:gap-4">
                  <Image
                    src="https://i.pinimg.com/236x/11/77/23/117723c9b6841f44f96e348c452bb1da.jpg"
                    width={125}
                    height={125}
                    alt="체험 사진"
                    className="object-cover rounded-xl m:w-[100px] m:h-[100px]"
                  />
                  <div className="text-nomad-black flex flex-col justify-between">
                    <p className="font-bold text-xl m:text-base max-w-[290px] m:max-w-[220px] overflow-hidden whitespace-nowrap text-ellipsis">
                      함께 배우면 즐거운 스트릿 댄스
                    </p>
                    <div className="flex gap-2 m:text-sm m:gap-1">
                      <p>2023. 2. 14</p>
                      <p>·</p>
                      <p>11:00 - 12:30</p>
                      <p>·</p>
                      <p>10명</p>
                    </div>
                    <div className="border border-solid border-var-gray2" />
                    <p className="font-bold text-[32px] m:text-xl">
                      ₩ {formatCurrency(10000)}
                    </p>
                  </div>
                </div>
                <Rating
                  onRatingChange={(rating) => setRating(rating)}
                  currentRating={rating}
                />
                <div className="w-full h-[200px] m:h-1/2 p-4 rounded border border-solid border-var-gray2">
                  <textarea
                    className="w-full h-full border-none outline-none text-base resize-none scrollbar-hide"
                    placeholder="후기를 작성해 주세요."
                    onChange={(e) => setReviewContent(e.target.value)}
                  />
                </div>
              </>
            ),
          })
        }
      >
        후기작성
      </PrimaryButton>
    </>
  );
}
