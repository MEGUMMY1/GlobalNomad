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
import hamburgerIcon from '@/public/icon/hamburger_icon.svg';

export default function MyReservationPage() {
  const [filterOption, setFilterOption] = useState<statusType | undefined>();
  const [reservationListByFilter, setReservationListByFilter] = useState<
    MyReservationProps[]
  >([]);
  const { ref, inView } = useInView();
  const { fetchNextPage, myReservationList, hasNextPage } =
    useReservationList(filterOption);
  const [isOpen, setIsOpen] = useRecoilState(sideNavigationState);

  const openSideNavigation = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (myReservationList) {
      setReservationListByFilter(myReservationList);
    }
  }, [myReservationList]);

  return (
    <div className="flex justify-center w-full mt-[72px] gap-[24px] t:mt-[24px] t:gap-[16px m:mt-[26px]">
      <div className="m:hidden">
        <SideNavigation />
      </div>
      {isOpen && <SidenNavigationMobile />}
      <div className="flex flex-col w-[792px] gap-[24px] t:w-[430px] m:w-[344px]">
        <div className="flex w-full justify-between items-center">
          <div className="flex m:gap-[15px]">
            <Image
              src={hamburgerIcon}
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
          <div className="flex flex-col animate-slideDown gap-[24px] overflow-auto scrollbar-hide pb-[20px] h-[calc(100vh-220px)] pr-[10px] t:h-[calc(100vh-160px)] t:gap-[16px] m:h-[calc(100vh-100px)]">
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
  );
}
