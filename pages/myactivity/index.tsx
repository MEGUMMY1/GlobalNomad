import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PrimaryButton } from '@/components/Button/Button';
import Card from '@/components/MyActivity/Card';
import { useInView } from 'react-intersection-observer';
import { useMyActivityList } from '@/hooks/myActivity/useMyActivityList';
import Image from 'next/image';
import hamburgerIcon from '@/public/icon/hamburger_black.svg';
import hamburgerWhiteIcon from '@/public/icon/hamburger_white.svg';
import SideNavigation from '@/components/SideNavigation/SideNavigation';
import SidenNavigationMobile from '@/components/SideNavigation/SideNavigationMobile';
import { useRecoilState } from 'recoil';
import { sideNavigationState } from '@/states/sideNavigationState';
import { darkModeState } from '@/states/themeState';

function MyActivity() {
  const router = useRouter();
  const { ref, inView } = useInView();
  const { fetchNextPage, myActivityList, totalCount, hasNextPage } =
    useMyActivityList();
  const [isOpen, setIsOpen] = useRecoilState(sideNavigationState);
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);

  const openSideNavigation = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const handleClickAdd = () => {
    router.push('myactivity/register');
  };

  return (
    <div className="flex justify-center w-full min-h-screen mt-[72px] mb-12 gap-[24px] t:mt-[24px] t:gap-[16px] m:mt-[26px] m:gap-0">
      <div className="m:hidden">
        <SideNavigation />
      </div>
      <div className="p:hidden t:hidden">
        {isOpen && <SidenNavigationMobile />}
      </div>
      <div className="flex flex-col w-[792px] gap-[24px] t:w-[429px] t:h-full m:w-full m:h-full m:px-[15px]">
        <div className="flex justify-between items-center">
          <div className="flex m:gap-[15px]">
            <Image
              src={isDarkMode ? hamburgerWhiteIcon : hamburgerIcon}
              alt="햄버거 메뉴 아이콘"
              className="p:hidden t:hidden"
              onClick={() => openSideNavigation()}
            />
            <h1 className="text-[32px] font-[700]">내 체험 관리</h1>
          </div>
          <PrimaryButton size="small" style="dark" onClick={handleClickAdd}>
            체험 등록하기
          </PrimaryButton>
        </div>
        {totalCount !== 0 ? (
          <div className="flex flex-col gap-[20px] overflow-visible animate-slideDown scrollbar-hide pb-[20px] t:h-[calc(100vh-160px)] t:gap-[16px] m:h-[calc(100vh-100px)]">
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
