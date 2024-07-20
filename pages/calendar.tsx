import React, { useState } from 'react';
import ActivitySelector from '@/components/Calendar/ActivitySelector';
import Calendar from '@/components/Calendar/Calendar';
import SideNavigation from '@/components/SideNavigation/SideNavigation';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getMyActivityList } from '@/pages/api/myActivities/apimyActivities';
import { getMyActivityListResponse } from '@/pages/api/myActivities/apimyActivities.types';
import Spinner from '@/components/Spinner/Spinner';
import { sideNavigationState } from '@/states/sideNavigationState';
import { useRecoilState } from 'recoil';
import SidenNavigationMobile from '@/components/SideNavigation/SideNavigationMobile';
import hamburgerIcon from '@/public/icon/hamburger_black.svg';
import hamburgerWhiteIcon from '@/public/icon/hamburger_white.svg';
import { darkModeState } from '@/states/themeState';
import { InitialPageMeta } from '@/components/MetaData/MetaData';

export default function CalendarPage() {
  const [activityId, setActivityId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useRecoilState(sideNavigationState);
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);

  const openSideNavigation = () => {
    setIsOpen(!isOpen);
  };

  const { data, error, isLoading } = useQuery<getMyActivityListResponse, Error>(
    {
      queryKey: ['myActivityList'],
      queryFn: () => getMyActivityList({}),
    }
  );

  const handleSelectActivity = (selectedActivityId: number) => {
    setActivityId(selectedActivityId);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const hasActivities = data && data.activities.length > 0;

  return (
    <>
      <InitialPageMeta title="예약현황 - GlobalNomad" />
      <div className="flex justify-center w-full mt-[72px] mb-12 gap-[24px] t:mt-[24px] t:gap-[16px] m:mt-[26px] m:gap-0 min-h-screen">
        <div className="m:hidden">
          <SideNavigation />
        </div>
        <div className="p:hidden t:hidden">
          {isOpen && <SidenNavigationMobile />}
        </div>
        <div className="flex flex-col w-[792px] gap-[24px] t:w-[429px] t:h-full m:w-full m:h-full m:px-[15px]">
          <div className="flex m:gap-[15px]">
            <Image
              src={isDarkMode ? hamburgerWhiteIcon : hamburgerIcon}
              alt="햄버거 메뉴 아이콘"
              className="p:hidden t:hidden"
              onClick={() => openSideNavigation()}
            />
            <p className="text-[32px] font-bold">예약 현황</p>
          </div>
          {hasActivities ? (
            <>
              <ActivitySelector
                onSelectActivity={handleSelectActivity}
                selectedActivityId={activityId}
              />
              {activityId && (
                <div className="m:h-[800px]">
                  <Calendar activityId={activityId} />
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[500px]">
              <Image
                src="/icon/empty_reservation.svg"
                alt="등록된 체험이 없어요"
                width={240}
                height={240}
              />
              <span className="text-var-gray7 text-[24px] mt-4">
                등록된 체험이 없어요
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
