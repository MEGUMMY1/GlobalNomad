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

export default function MyReservationPage() {
  const [filterOption, setFilterOption] = useState<statusType>();
  const [reservationListByFilter, setReservationListByFilter] = useState<
    MyReservationProps[]
  >([]);
  const { ref, inView } = useInView();
  const { fetchNextPage, myReservationList, hasNextPage } =
    useReservationList();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (myReservationList) {
      const reservationList = myReservationList;
      if (filterOption) {
        const filteredData = reservationList.filter(
          (card) => card.status === filterOption
        );
        setReservationListByFilter(filteredData);
      } else {
        setReservationListByFilter(reservationList);
      }
    }
  }, [myReservationList, filterOption]);

  return (
    <div className="flex justify-center w-full mt-[72px] gap-[24px] t:mt-[24px] t:gap-[16px]">
      <SideNavigation />
      <div className="flex flex-col w-[792px] gap-[24px] t:w-[429px] t:h-[556px] m:w-full m:h-[492px] m:pb-[210px]">
        <div className="flex w-full justify-between">
          <p className="text-[32px] font-bold">예약 내역 </p>
          {reservationListByFilter && (
            <ReservationFilter
              setFilterOption={setFilterOption}
              filterOption={filterOption}
            />
          )}
        </div>
        {reservationListByFilter.length > 0 ? (
          <div className="flex flex-col animate-slideDown gap-[24px] overflow-auto scrollbar-hide h-[calc(100vh-220px)] pr-[10px]">
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
