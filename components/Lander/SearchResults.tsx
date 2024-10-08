import { useRecoilState, useRecoilValue } from 'recoil';
import { SearchResultsProps } from './SearchResults.type';
import { mainSearchValueState } from '@/states/mainPageState';
import { useEffect, useCallback, useRef } from 'react';
import {
  getActivityListParams,
  getActivityListResponse,
} from '@/pages/api/activities/apiactivities.types';
import { useQuery } from '@tanstack/react-query';
import { getActivityList } from '@/pages/api/activities/apiactivities';
import { AllActivity } from './AllActivities';
import Pagination from '../Pagination/Pagination';
import Spinner from '../Spinner/Spinner';

function SearchResults({ SearchValue }: SearchResultsProps) {
  const [searchresultsState, setSearchResultsState] =
    useRecoilState(mainSearchValueState);
  const PaginationScrollRef = useRef<HTMLDivElement | null>(null);

  const {
    SearchValue: resultsValue,
    currentPage,
    itemsPerPage,
  } = useRecoilValue(mainSearchValueState);

  const setItemsPerPage = useCallback(() => {
    if (typeof window !== 'undefined') {
      // 브라우저 환경에서만 실행
      const width = window.innerWidth;

      let itemsPerPage;
      if (width >= 1281) {
        itemsPerPage = 16;
      } else if (width > 744) {
        itemsPerPage = 9;
      } else {
        itemsPerPage = 6;
      }

      setSearchResultsState((prevState) => ({
        ...prevState,
        itemsPerPage,
        currentPage: 1,
      }));
    }
  }, [setSearchResultsState]);

  useEffect(() => {
    setItemsPerPage();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', setItemsPerPage);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', setItemsPerPage);
      }
    };
  }, [setItemsPerPage]);

  useEffect(() => {
    setSearchResultsState((prevState) => ({
      ...prevState,
      SearchValue,
    }));
  }, [SearchValue, setSearchResultsState]);

  const params: getActivityListParams = {
    method: 'offset',
    cursorId: null,
    category: null,
    keyword: resultsValue,
    sort: '',
    page: currentPage,
    size: itemsPerPage,
  };

  const {
    data: SearchResultsData,
    error,
    isLoading,
  } = useQuery<getActivityListResponse>({
    queryKey: ['AllActivities', params],
    queryFn: () => getActivityList(params),
  });

  const handlePageChange = (page: number) => {
    setSearchResultsState((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
    PaginationScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mt-[40px]" ref={PaginationScrollRef}>
      <div className="font-sans text-[32px] font-[400] mb-[12px]">
        <span className="font-sans text-[32px] font-[700]">
          {`"${resultsValue}"`}
        </span>
        으로 검색한 결과입니다.
      </div>
      <div className="font-sans text-[16px] font-[400] mb-[24px]">
        총 {SearchResultsData?.totalCount}개의 결과
      </div>
      {isLoading ? (
        <div className="mt-[-300px]">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-4 t:grid-cols-3 m:grid-cols-2 grid-rows-2 gap-[20px] t:gap-[14px] m:gap-[8px] gap-y-[48px] mb-[40px] overflow-auto scrollbar-hide px-[20px] pt-[20px]">
          {SearchResultsData?.activities.map((data) => (
            <AllActivity
              key={data.id}
              title={data.title}
              backgroundImage={data.bannerImageUrl}
              price={data.price}
              rating={data.rating}
              reviewCount={data.reviewCount}
              id={data.id}
            />
          ))}
        </div>
      )}
      <div className="text-[30px] font-[700] flex justify-center mb-[342px] mt-[70px]">
        {SearchResultsData && SearchResultsData.totalCount > 0 && (
          <Pagination
            totalItems={SearchResultsData?.totalCount}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default SearchResults;
