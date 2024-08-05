import ReservationListCard from '@/components/ReservationListCard/ReservationListCard';
import ReservationFilter from '@/components/ReservationFilter/ReservationFilter';
import SideNavigation from '@/components/SideNavigation/SideNavigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useReservationList } from '@/hooks/useReservationList';
import {
  MyReservationProps,
  statusType,
} from '@/components/ReservationFilter/myReservationTypes.types';
import { useInView } from 'react-intersection-observer';
import SidenNavigationMobile from '@/components/SideNavigation/SideNavigationMobile';
import { useRecoilState } from 'recoil';
import { sideNavigationState } from '@/states/sideNavigationState';
import hamburgerIcon from '@/public/icon/hamburger_black.svg';
import hamburgerWhiteIcon from '@/public/icon/hamburger_white.svg';
import { darkModeState } from '@/states/themeState';
import { InitialPageMeta } from '@/components/MetaData/MetaData';
import { GetServerSideProps } from 'next';
import { SSRMetaProps } from '@/components/MetaData/MetaData.type';
import useAuthRedirect from '@/hooks/Auth/useAuthRedirect';

export const getServerSideProps: GetServerSideProps = async () => {
  const OGTitle = '예약내역 | GLOBALNOMAD';
  const OGUrl = 'https://globalnomad-5-8.netlify.app/reservation';
  return {
    props: {
      OGTitle,
      OGUrl,
    },
  };
};

export default function MyReservationPage({ OGTitle, OGUrl }: SSRMetaProps) {
  const [filterOption, setFilterOption] = useState<statusType | undefined>();
  const [reservationListByFilter, setReservationListByFilter] = useState<
    MyReservationProps[]
  >([]);
  const { ref, inView } = useInView();
  const { fetchNextPage, myReservationList, hasNextPage } =
    useReservationList(filterOption);
  const [isOpen, setIsOpen] = useRecoilState(sideNavigationState);
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);
  // 로그아웃 상태에서 페이지 접근시 로그인 페이지로 redirect
  useAuthRedirect();

  const openSideNavigation = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (myReservationList) {
      setReservationListByFilter(myReservationList);
    }
  }, [myReservationList]);

  return (
    <>
      <InitialPageMeta title={OGTitle} url={OGUrl} />
      <div className="flex justify-center w-full mt-[72px] gap-[24px] t:mt-[24px] t:gap-[16px] m:mt-[26px] m:w-full m:px-[16px]">
        <div className="m:hidden">
          <SideNavigation />
        </div>
        {isOpen && <SidenNavigationMobile />}
        <div className="flex flex-col w-[792px] gap-[24px] t:w-[430px] m:w-full">
          <div className="flex w-full justify-between items-center">
            <div className="flex m:gap-[15px]">
              <Image
                src={isDarkMode ? hamburgerWhiteIcon : hamburgerIcon}
                alt="햄버거 메뉴 아이콘"
                className="p:hidden t:hidden"
                onClick={() => openSideNavigation()}
              />
              <p className="text-[32px] font-bold">예약 내역 </p>
            </div>
            {reservationListByFilter && (
              <ReservationFilter
                setFilterOption={setFilterOption}
                filterOption={filterOption}
              />
            )}
          </div>
          {reservationListByFilter.length > 0 ? (
            <div className="flex flex-col animate-slideDown gap-[24px] overflow-auto scrollbar-hide pb-[20px] h-[calc(100vh-220px)] t:h-[calc(100vh-160px)] t:gap-[16px] m:h-[calc(100vh-100px)]">
              {reservationListByFilter.map(
                (reservationData: MyReservationProps) => {
                  return (
                    <div key={reservationData.id}>
                      <ReservationListCard reservationData={reservationData} />
                    </div>
                  );
                }
              )}
              {hasNextPage && (
                <div className="text-[35px] font-bold text-center" ref={ref}>
                  ...
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col h-[500px] items-center justify-center">
              <div>
                <Image
                  src="/icon/empty_reservation.svg"
                  alt="등록된 체험이 없어요"
                  width={240}
                  height={240}
                />
              </div>
              <span className="text-var-gray7 text-[24px]">
                등록된 체험이 없어요
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
