import ReservatioListCard from '@/components/ReservationListCard/ReservationListCard';
import ReservationFilter from '@/components/ReservationFilter/ReservationFilter';
import { statusType } from '@/components/ReservationFilter/ReservationFilter.types';
import SideNavigation from '@/components/SideNavigation/SideNavigation'; // Corrected import name
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { mockData } from '@/components/ReservationListCard/mockData';
import { useQuery } from '@tanstack/react-query';
import { useUserData } from '@/hooks/useUserData';

export default function Reservation() {
  const [filterOption, setFilterOption] = useState<statusType>();
  const userData = useUserData();
  const [data, setData] = useState(mockData);

  useEffect(() => {
    if (filterOption) {
      const filteredData = mockData.filter(
        (card) => card.status === filterOption
      );
      setData(filteredData);
    } else {
      setData(mockData);
    }
  }, [filterOption]);

  return (
    <div className="flex justify-center w-full mt-[72px] gap-[24px] t:mt-[24px] t:gap-[16px]">
      <SideNavigation />
      <div className="flex flex-col w-[792px] gap-[24px] h-[564px] t:w-[429px] t:h-[556px] m:w-full m:h-[492px] m:pb-[210px]">
        <div className="flex w-full justify-between">
          <p className="text-[32px] font-bold">예약 내역 </p>
          {data && (
            <ReservationFilter
              setFilterOption={setFilterOption}
              filterOption={filterOption}
            />
          )}
        </div>
        <div className="animate-slideDown">
          {data ? (
            data.map((cardData, index) => {
              return <ReservatioListCard key={index} mockData={cardData} />;
            })
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
    </div>
  );
}
