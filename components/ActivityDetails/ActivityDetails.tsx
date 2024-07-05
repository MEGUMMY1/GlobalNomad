import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  ActivityDetailsProps,
  Review,
  ReviewsData,
} from './ActivityDetails.types';
import { formatNumberToFixed } from '@/utils/formatNumberToFixed';
import ImageContainer from './ImageContainer/ImageContainer';
import Map from './Map/Map';
import reviewData from './review.json';
import { formatCurrency } from '@/utils/formatCurrency';
import Reservation from './Reservation/Reservation';

export default function ActivityDetails({ activity }: ActivityDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const data: ReviewsData = reviewData;
    setReviews(data.reviews);
    setAverageRating(data.averageRating);
  }, []);

  const getRatingText = (rating: number): string => {
    if (rating >= 4 && rating <= 5) {
      return '매우만족';
    } else if (rating >= 3 && rating < 4) {
      return '만족';
    } else if (rating >= 2 && rating < 3) {
      return '보통';
    } else if (rating >= 1 && rating < 2) {
      return '약간만족';
    } else {
      return '평가 없음';
    }
  };

  return (
    <div className="mt-16">
      <div className="relative flex justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-nomad-black">{activity.category}</p>
          <h1 className="text-[32px] text-nomad-black font-bold">
            {activity.title}
          </h1>
          <div className="flex gap-3">
            <div className="flex gap-1">
              <Image
                src="/icon/icon_star_on.svg"
                alt="별점 아이콘"
                width={16}
                height={16}
              />
              <p>{formatNumberToFixed(averageRating)}</p>
              <p>({formatCurrency(reviews.length)})</p>
            </div>
            <div className="flex gap-1">
              <Image
                src="/icon/location.svg"
                alt="위치 아이콘"
                width={18}
                height={18}
              />
              <p className="text-nomad-black">{activity.address}</p>
            </div>
          </div>
        </div>
        <button onClick={toggleMenu} className="relative">
          <Image
            src="/icon/kebab.svg"
            alt="케밥 아이콘"
            width={40}
            height={40}
          />
        </button>
        {isOpen && (
          <div
            ref={menuRef}
            className="absolute top-[70px] right-0 mt-2 w-40 h-[114px] bg-white border border-var-gray3 border-solid rounded-lg flex flex-col items-center justify-center text-lg z-10"
          >
            <button className="block w-full h-[57px] px-4 py-2 text-var-gray8 hover:bg-gray-100 rounded-t-lg border-b border-var-gray3 border-solid">
              수정하기
            </button>
            <button className="block w-full h-[57px] px-4 py-2 text-var-gray8 hover:bg-gray-100 rounded-b-lg">
              삭제하기
            </button>
          </div>
        )}
      </div>
      <ImageContainer
        bannerImageUrl={activity.bannerImageUrl}
        subImages={activity.subImages}
      />
      <div className="flex gap-4">
        <div className="w-[800px] mb-20">
          <div className="border-t-2 border-var-gray3 border-solid pt-10" />
          <div className="flex flex-col gap-4">
            <p className="text-nomad-black font-bold text-xl">체험 설명</p>
            <p className="text-nomad-black">{activity.description}</p>
          </div>
          <div className="border-t-2 border-var-gray3 border-solid my-10" />
          <Map address={activity.address} />
          <div className="flex gap-1 mt-2">
            <Image
              src="/icon/location.svg"
              alt="위치 아이콘"
              width={18}
              height={18}
            />
            <p className="text-nomad-black text-sm max-w-[700px] overflow-hidden whitespace-nowrap text-ellipsis">
              {activity.address}
            </p>
          </div>
          <div className="border-t-2 border-var-gray3 border-solid my-10" />

          <div className="flex flex-col gap-4">
            <p className="text-nomad-black font-bold text-xl">후기</p>
            <div className="flex gap-4 items-center">
              <p className="text-[50px] font-bold">
                {formatNumberToFixed(averageRating)}
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-lg text-nomad-black">
                  {getRatingText(averageRating)}
                </p>
                <div className="flex items-center gap-1">
                  <Image
                    src="/icon/icon_star_on.svg"
                    alt="별점 아이콘"
                    width={16}
                    height={16}
                  />
                  <p className="text-var-black text-sm">
                    {formatCurrency(reviews.length)}개 후기
                  </p>
                </div>
              </div>
            </div>
          </div>
          {reviews.map((review, i) => (
            <div
              key={review.id}
              className={`flex gap-4 py-6 items-start ${i === reviews.length - 1 ? '' : 'border-b-2 border-var-gray3 border-solid'}`}
            >
              <div className="flex-shrink-0">
                <Image
                  src={review.user.profileImageUrl}
                  alt={`${review.user.nickname}의 프로필 이미지`}
                  width={45}
                  height={45}
                  className="rounded-full object-cover border border-var-gray3 border-solid w-12 h-12"
                />
              </div>
              <div>
                <div className="flex mb-2">
                  <p className="font-bold max-w-[500px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {review.user.nickname}
                  </p>
                  <p className="mx-2">|</p>
                  <p className="text-sm text-var-gray6">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-nomad-black">{review.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Reservation activity={activity} />
        </div>
      </div>
    </div>
  );
}
