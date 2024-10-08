import Image from 'next/image';
import { PaginationArrowButton } from '../Button/Button';
import StarImg from '@/public/icon/Star.svg';
import { useEffect, useState } from 'react';
import { ActivityDetail, BestActivityProps } from './BestActivities.type';
import usePagination from '@/hooks/usePagination';
import {
  getActivityListParams,
  getActivityListResponse,
} from '@/pages/api/activities/apiactivities.types';
import { useQuery } from '@tanstack/react-query';
import { getActivityList } from '@/pages/api/activities/apiactivities';
import { useRouter } from 'next/router';
import { ShareButton } from '../ShareButton/ShareButton';
import { BestsSlide, BestsSlideTsize } from './BestActivitiesSlide';

function BestActivity({
  title,
  price,
  rating,
  reviewCount,
  bannerImageUrl,
  description,
  id,
}: BestActivityProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/activity-details/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-[384px] m:w-[186px] h-[384px] m:h-[186px] rounded-3xl border bg-gray-300 flex flex-col justify-center bg-[url('/image/Testimage.jpg')] cursor-pointer shrink-0 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 33.33%, rgba(0, 0, 0, 0.80) 91.67%), url(${bannerImageUrl})`,
      }}
    >
      <div className="flex gap-[5px] absolute left-[20px] bottom-[166px] m:bottom-[98px]">
        <Image
          src={StarImg}
          alt="별점 표시 이미지"
          width={18}
          height={18}
        ></Image>
        <span className="font-sans text-[14px] font-[600] text-white">
          {rating.toFixed(1)} ({reviewCount})
        </span>
      </div>
      <ShareButton
        type="initial"
        title={title}
        bannerImageUrl={bannerImageUrl}
        description={description}
        activityId={id}
      />
      <div className="font-sans w-[320px] h-[80px] m:w-[140px] m:h-[40px] text-[30px] m:text-[16px] font-[700] absolute left-[20px] bottom-[84px] m:bottom-[50px] text-white text-ellipsis overflow-hidden leading-normal m:truncate ...">
        {title}
      </div>
      <div className="font-sans text-[20px] m:text-[16px] font-[700] absolute left-[20px] bottom-[39px] m:bottom-[24px] text-white">
        ₩ {price.toLocaleString()} / 인
      </div>
    </div>
  );
}

function BestActivities() {
  const paramsNotPc: getActivityListParams = {
    method: 'offset',
    cursorId: null,
    category: null,
    keyword: null,
    sort: 'most_reviewed',
    page: 1,
    size: 9,
  };

  const {
    data: bestActivitiesDataNotPc,
    error: errorNotPc,
    isLoading: isLoadingNotPc,
  } = useQuery<getActivityListResponse>({
    queryKey: ['BestActivitiesNotPc', paramsNotPc],
    queryFn: () => getActivityList(paramsNotPc),
  });

  useEffect(() => {
    const scrollableArea = document.querySelector(
      '.scrollable-area'
    ) as HTMLElement;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (scrollableArea) {
        scrollableArea.scrollLeft += event.deltaY;
      }
    };

    if (scrollableArea) {
      scrollableArea.addEventListener('wheel', handleWheel);
    }
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="text-[36px] m:text-[18px] font-[700]">
          🔥 인기 체험
        </span>
      </div>
      <div className="w-[1200px] t:hidden m:hidden mt-[34px]">
        <BestsSlide />
      </div>
      {bestActivitiesDataNotPc?.activities &&
      bestActivitiesDataNotPc.activities.length > 0 ? (
        <div className="flex gap-[32px] m:gap-[16px] mt-[34px] overflow-auto scrollbar-hide p:hidden t:hidden">
          {bestActivitiesDataNotPc.activities.map((item: ActivityDetail) => (
            <BestActivity
              key={item.id}
              title={item.title}
              price={item.price}
              rating={item.rating}
              reviewCount={item.reviewCount}
              description={item.description}
              id={item.id}
              bannerImageUrl={item.bannerImageUrl}
            />
          ))}
        </div>
      ) : (
        <div>No activities found</div>
      )}
      <div className="hidden t:block ml-[-10px]m mt-[30px]">
        <BestsSlideTsize />
      </div>
    </div>
  );
}

export default BestActivities;
