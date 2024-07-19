import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PrimaryButton } from '@/components/Button/Button';
import Card from '@/components/MyActivity/Card';
import SidenNavigation from '@/components/SideNavigation/SideNavigation';
import { useInView } from 'react-intersection-observer';
import { useMyActivityList } from '@/hooks/myActivity/useMyActivityList';
import Image from 'next/image';

function MyActivity() {
  const router = useRouter();
  const { ref, inView } = useInView();
  const { fetchNextPage, myActivityList, totalCount, hasNextPage } =
    useMyActivityList();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const handleClickAdd = () => {
    router.push('myactivity/register');
  };

  return (
    <div className="flex gap-[20px] py-[72px] min-h-[1080px] m:gap-0 m:px-[20px]">
      <div className="m:hidden">
        <SidenNavigation />
      </div>
      <div className="flex flex-col gap-[20px] w-full">
        <div className="flex justify-between">
          <h1 className="text-[32px] font-[700]">내 체험 관리</h1>
          <PrimaryButton size="small" style="dark" onClick={handleClickAdd}>
            체험 등록하기
          </PrimaryButton>
        </div>
        {totalCount !== 0 ? (
          <div className="flex flex-col gap-[20px] overflow-visible animate-slideDown">
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
        ) : (
          <div className="flex flex-col justify-center items-center mt-[50px]">
            <Image
              src="/icon/empty_reservation.svg"
              alt="예약 내역 없음"
              width={240}
              height={240}
              className="t:w-[200px] t:h-[200px] m:w-[200px] m:h-[200px]"
            />
            <p className="text-[24px] font-[500] text-var-gray7">
              아직 등록한 체험이 없어요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyActivity;
