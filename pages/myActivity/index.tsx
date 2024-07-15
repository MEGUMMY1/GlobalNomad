import { useRouter } from 'next/router';
import { PrimaryButton } from '@/components/Button/Button';
import Card from '@/components/MyActivity/Card';
import SidenNavigation from '@/components/SideNavigation/SideNavigation';
import { useInView } from 'react-intersection-observer';
import { useMyActivityList } from '@/hooks/myActivity/useMyActivityList';
import { useEffect } from 'react';

function MyActivity() {
  const router = useRouter();
  const { ref, inView } = useInView();
  const { fetchNextPage, myActivityList, hasNextPage } = useMyActivityList();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const handleClickAdd = () => {
    router.push('myActivity/register');
  };

  return (
    <div className="flex gap-[20px] py-[72px] m:gap-0">
      <div className="m:hidden">
        <SidenNavigation />
      </div>
      <div className="flex flex-col gap-[20px] t:w-full m:w-[calc(100vw-50px)] flex-shrink">
        <div className="flex justify-between">
          <h1 className="text-[32px] font-[700]">내 체험 관리</h1>
          <PrimaryButton size="small" style="dark" onClick={handleClickAdd}>
            체험 등록하기
          </PrimaryButton>
        </div>
        <div className="flex flex-col gap-[20px] overflow-y-auto">
          {myActivityList?.map((activity) => {
            return (
              <Card
                key={activity.id}
                activityId={activity.id}
                activityImage={activity.bannerImageUrl}
                rating={activity.rating}
                reviewCount={activity.reviewCount}
                title={activity.title}
                price={activity.price}
              />
            );
          })}
          {hasNextPage && (
            <div className="text-[35px] font-bold text-center" ref={ref}>
              ...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyActivity;
