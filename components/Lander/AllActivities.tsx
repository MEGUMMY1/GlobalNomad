import Image from 'next/image';
import StarImg from '@/public/icon/Star.svg';
import CatergoryBtn from '../CatergoryBtn/CatergoryBtn';
import PriceFilterBtn from '../PriceFilterBtn/PriceFilterBtn';
import { useState, useEffect } from 'react';
import { AllActivityProps } from './AllActivities.type';
import { getActivityList } from '@/pages/api/activities/apiactivities';
import { getActivityListResponse } from '@/pages/api/activities/apiactivities.types';
import { getActivityListParams } from '@/pages/api/activities/apiactivities.types';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Pagination from '../Pagination/Pagination';

const Kategories = ['문화 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

function AllActivity({
  title,
  backgroundImage,
  price,
  rating,
  reviewCount,
}: AllActivityProps) {
  return (
    <div>
      <div
        className="w-[286px] t:w-[223px] m:w-[170px] h-[286px] t:h-[223px] m:h-[170px] rounded-xl bg-[url('/image/Testimage.jpg')]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.10) 20.33%, rgba(0, 0, 0, 0.60) 100%),url(${backgroundImage})`,
        }}
      ></div>
      <div>
        <div className="flex items-center mt-[16.5px]">
          <Image
            src={StarImg}
            alt="별점 표시 이미지"
            width={20}
            height={20}
          ></Image>
          <div className="font-sans text-[16px] font-[500] ml-[5px]">
            {rating ? rating : 0}{' '}
            <span className="font-sans text-[16px] text-[#A1A1A1] font-[500] ">
              ({reviewCount ? reviewCount : 0})
            </span>
          </div>
        </div>
        <div className="t:h-[50px] m:h-[30px] m:w-[160px] font-sans text-[24px] m:text-[18px] font-[600] mt-[10px]">
          {title}
        </div>
        <div className="font-sans text-[28px] text-[20px] font-[700] mt-[15px]">
          ₩ {price}
          <span className="font-sans text-[20px] text-[16px] font-[400]">
            / 인
          </span>
        </div>
      </div>
    </div>
  );
}

interface ActivityDetail {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface MockData {
  activities: ActivityDetail[];
  totalCount: number;
  cursorId: number | null;
}

function AllActivities() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(
    router.query.page ? parseInt(router.query.page as string, 10) : 1
  );

  const items_per_page = 8;  

  const params: getActivityListParams = {
    method: 'offset',
    cursorId: null, // 처음에는 null로 설정
    category: null,
    keyword: null,
    sort: null,
    page: currentPage,
    size: 8, // 최대 9개만 가져오기
  };

  const { data: allActivitiesData, error, isLoading } = useQuery<getActivityListResponse>(
    {queryKey : ['AllActivities', currentPage],
    queryFn :() => getActivityList(params)}
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    //router.push(`/?page=${page}`);
  };

  useEffect(() => {
    const params: getActivityListParams = {
      method: 'offset',
      cursorId: null,
      category: null,
      keyword: null,
      sort: null,
      page: currentPage,
      size: items_per_page,
    };
  }, [currentPage]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="relative t:w-[520px] m:w-[230px]">
          <div className="flex gap-[24px] t:gap-[14px] m:gap-[8px] t:w-[520px] m:w-[230px] overflow-auto scrollbar-hide">
            {Kategories.map((Kategorie) => (
              <CatergoryBtn categoryName={Kategorie} />
            ))}
          </div>
          <div className="p:hidden absolute top-0 right-0 w-20 m:w-3 h-full pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>
        <PriceFilterBtn />
      </div>
      <div className="font-sans text-[36px] font-[700] mt-[40px]">
        🛼 모든 체험
      </div>
      <div className="grid grid-cols-4 t:grid-cols-3 m:grid-cols-2 grid-rows-2 gap-[20px] t:gap-[14px] m:gap-[6px] gap-y-[48px] mb-[40px] overflow-auto scrollbar-hide">
        {/* <AllActivity></AllActivity>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity> */}
        {allActivitiesData?.activities.map((data) => (
          <AllActivity
            key={data.id}
            title={data.title}
            backgroundImage={data.bannerImageUrl}
            price={data.price}
            rating={data.rating}
            reviewCount={data.reviewCount}
          />
        ))}
      </div>
      <div className="text-[30px] font-[700] flex justify-center mb-[342px] mt-[70px]">
        {allActivitiesData && allActivitiesData.totalCount > 0 && (<Pagination totalItems={allActivitiesData?.totalCount} itemsPerPage={items_per_page} currentPage={currentPage} onPageChange={handlePageChange}/>)}
      </div>
    </div>
  );
}

export default AllActivities;
