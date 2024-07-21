import { ActivityDetail, BestActivityProps } from './BestActivities.type';
import Image from 'next/image';
import StarImg from "@/public/icon/Star.svg";
import { ShareButton } from '../ ShareButton/ShareButton';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getActivityListParams, getActivityListResponse } from '@/pages/api/activities/apiactivities.types';
import { useQuery } from '@tanstack/react-query';
import { getActivityList } from '@/pages/api/activities/apiactivities';
import Slider from 'react-slick';
import usePagination from '@/hooks/usePagination';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spinner from '../Spinner/Spinner';

interface ArrowProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="slick-next"
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      background: 'gray',
      borderRadius: '50%',
      position: 'absolute',
      right: '-50px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
      cursor: 'pointer',
    }}
  >
  </div>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="slick-prev"
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      background: 'gray',
      borderRadius: '50%',
      position: 'absolute',
      left: '-50px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
      cursor: 'pointer',
    }}
  >

  </div>
);

function BestActivitytest({
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
      className="relative w-[384px] m:w-[186px] h-[384px] m:h-[186px] rounded-3xl border bg-gray-300 flex flex-col justify-center bg-[url('/image/Testimage.jpg')] cursor-pointer shrink-0 bg-cover bg-center mr-[20px]"
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

function Test() {
  const [bestCurrentPage, setBestCurrentPage] = useState(1);

  const params: getActivityListParams = {
    method: 'offset',
    cursorId: null,
    category: null,
    keyword: null,
    sort: 'most_reviewed',
    page: bestCurrentPage,
    size: 9,
  };

  const {
    data: bestActivitiesData,
    error,
    isLoading,
  } = useQuery<getActivityListResponse>({
    queryKey: ['BestActivities', params],
    queryFn: () => getActivityList(params),
  });

  const {
    items,
    currentPage,
    isFirstPage,
    isLastPage,
    handlePrevClick,
    handleNextClick,
  } = usePagination({
    data: bestActivitiesData,
    itemsPerPage: 3,
  });

  const settings = {
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    centerPadding: '0px',
  };

  return (
    <div>
      <Slider {...settings}>
        {bestActivitiesData && bestActivitiesData.activities.length > 0 ? (
          bestActivitiesData.activities.map((item: ActivityDetail) => (
            <div key={item.id} className="px-2">
              <BestActivitytest
                key={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                description={item.description}
                reviewCount={item.reviewCount}
                id={item.id}
                bannerImageUrl={item.bannerImageUrl}
              />
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </Slider>
    </div>
  );
}

export default Test;
