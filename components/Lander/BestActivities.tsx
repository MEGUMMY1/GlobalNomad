import Image from 'next/image';
import { PaginationArrowButton } from '../Button/Button';
import StarImg from '@/public/icon/Star.svg';
import { useEffect, useState } from 'react';
import { ActivityDetail, BestActivitiesProps, BestActivityProps } from './BestActivities.type';
import usePagination from '@/hooks/usePagination';

function BestActivity({title, price, rating, reviewCount}: BestActivityProps) {
  return (
    <div
      className="relative w-[384px] m:w-[186px] h-[384px] m:h-[186px] rounded-3xl border bg-gray-300 flex flex-col justify-center bg-[url('/image/Testimage.jpg')] cursor-pointer shrink-0 bg-cover bg-center"
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 33.33%, rgba(0, 0, 0, 0.80) 91.67%), url("/image/Testimage.jpg")',
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
          {rating} ({reviewCount})
        </span>
      </div>
      <div className="font-sans text-[30px] m:text-[18px] font-[700] absolute left-[20px] bottom-[74px] m:bottom-[50px] text-white">
        {title}
      </div>
      <div className="font-sans text-[20px] m:text-[16px] font-[700] absolute left-[20px] bottom-[39px] m:bottom-[24px] text-white">
        {price} / 인
      </div>
    </div>
  );
}

const fetchBestActivities = async (
  page: number
): Promise<BestActivitiesProps | null> => {
  try {
    const response = await fetch('/mockData/roadActivitiesData.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: BestActivitiesProps = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch mock data:', error);
    return { activities: [], totalCount: 0, cursorId: null };
  }
};

const ITESM_PER_PAGE = 3;


function BestActivities() {
  const {
    currentItems,
    items,
    currentPage,
    totalPages,
    isFirstPage,
    isLastPage,
    handlePrevClick,
    handleNextClick,
  } = usePagination({
    fetchData: fetchBestActivities,
    itemsPerPage: ITESM_PER_PAGE,
  });


  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="text-[36px] m:text-[18px] font-[700]">
          🔥 인기 체험
        </span>
        <div className="t:hidden m:hidden">
          <PaginationArrowButton onClickPrev={handlePrevClick} onClickNext={handleNextClick}/>
        </div>
      </div>
      {items && items.length > 0 ? (
          <div className="flex gap-[32px] m:gap-[16px] mt-[34px] overflow-auto scrollbar-hide">
            {currentItems.map((item: ActivityDetail) => (
              <BestActivity
                key={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                reviewCount={item.reviewCount}
              />
            ))}
          </div>
        ) : (
          <div>No activities found</div>
        )}
    </div>
  );
}

export default BestActivities;
