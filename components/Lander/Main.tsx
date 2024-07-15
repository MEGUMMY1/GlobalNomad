import SearchBar from '../SearchBar/Searchbar';
import BestActivities from './BestActivities';
import AllActivities from './AllActivities';
import { useQuery } from '@tanstack/react-query';
import {
  getActivityListParams,
  getActivityListResponse,
} from '@/pages/api/activities/apiactivities.types';
import { getActivityList } from '@/pages/api/activities/apiactivities';
import Spinner from '../Spinner/Spinner';
import { useState } from 'react';
import SearchResults from './SearchResults';
import { useRecoilValue } from 'recoil';
import { mainSearchValueState } from '@/states/mainPageState';

function Main() {
  const [isSearch, setIsSearch] = useState(false);
  const {SearchValue} = useRecoilValue(mainSearchValueState);
  const date = new Date();
  const month = date.getMonth() + 1;
  //const {id, title, bannerImageUrl} = useRecoilValue(BestOfmonth);

  const params: getActivityListParams = {
    method: 'offset',
    cursorId: null,
    category: null,
    keyword: null,
    sort: 'most_reviewed',
    page: 1,
    size: 1,
  };
  const {
    data: BestOfmonth,
    error,
    isLoading,
  } = useQuery<getActivityListResponse>({
    queryKey: ['BestActivities', params],
    queryFn: () => getActivityList(params),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="flex flex-col justift-center items-center h-auto">
      <section
        className="z-0 w-screen h-[550px] m:h-[240px] overflow-hidden absolute left-0 top-[70px] bg-cover bg-center bg-[url('/image/Testimage.jpg')] flex items-center "
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.40) 100%), url(${BestOfmonth?.activities[0].bannerImageUrl})`,
        }}
      ></section>
      <div className="z-10 t:w-[696px] m:w-[343px]">
        <div className=" mt-[160px] m:mt-[74px] flex flex-col gap-[20px]">
          <h1 className="w-[600px] t:w-[450px] m:w-[200px] text-white font-sans text-[68px] t:text-[54px] m:text-[24px] font-[700] leading-[1.2]">
            {BestOfmonth?.activities[0].title}
          </h1>
          <span className="text-white font-sans test-[24px] m:text-[14px] font-[700]">
            {month} 월의 인기 체험 BEST 🔥
          </span>
        </div>
        <div className="mt-[120px] m:mt-[14px] flex justify-center">
          <SearchBar setIsSearch={setIsSearch}></SearchBar>
        </div>
        {isSearch ? (
          <SearchResults SearchValue={SearchValue} />
        ) : (
          <div>
            <div className="mt-[40px]">
              <BestActivities></BestActivities>
            </div>
            <div className=" mt-[60px]">
              <AllActivities></AllActivities>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Main;
