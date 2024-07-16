import React, { useState } from 'react';
import Image from 'next/image';
import Down from '@/public/icon/chevron_down.svg';
import Up from '@/public/icon/chevron_up.svg';
import CheckMark from '@/public/icon/Checkmark.svg';
import useClickOutside from '@/hooks/useClickOutside';
import { useQuery } from '@tanstack/react-query';
import { getMyActivityList } from '@/pages/api/myActivities/apimyActivities';
import { getMyActivityListResponse } from '@/pages/api/myActivities/apimyActivities.types';
import { ActivitySelectorProps } from './Calendar.types';
import Spinner from '../Spinner/Spinner';

export default function ActivitySelector({
  onSelectActivity,
  selectedActivityId,
}: ActivitySelectorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownElement = useClickOutside<HTMLDivElement>(() =>
    setIsOpen(false)
  );

  const { data, error, isLoading } = useQuery<getMyActivityListResponse, Error>(
    {
      queryKey: ['myActivityList'],
      queryFn: () => getMyActivityList({}),
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleOnClick = (activityId: number) => {
    onSelectActivity(activityId);
    setIsOpen(false);
  };

  const selectedActivity = selectedActivityId
    ? data?.activities.find((activity) => activity.id === selectedActivityId)
        ?.title
    : '체험 선택';

  return (
    <div className="relative w-full" ref={dropDownElement}>
      <div
        className={`w-full h-[56px] border-solid border border-var-gray7 rounded flex items-center px-[20px] text-[16px] font-[400] font-sans bg-white cursor-pointer ${selectedActivity ? 'text-black' : 'text-var-gray6'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedActivity}
        <Image
          src={isOpen ? Up : Down}
          alt="화살표 아이콘"
          width={24}
          height={24}
          className="absolute right-2 top-4"
        />
      </div>
      {isOpen && (
        <ul className="z-10 p-2 w-full absolute bg-white border border-solid border-var-gray3 rounded-md mt-1 shadow-lg animate-slideDown flex flex-col">
          {data?.activities.map((activity) => {
            const isSelected = selectedActivityId === activity.id;
            const backgroundColor = isSelected ? 'bg-nomad-black' : 'bg-white';
            const textColor = isSelected ? 'text-white' : 'text-nomad-black';

            return (
              <li
                key={activity.id}
                className={`p-2 h-[40px] hover:bg-var-gray2 ${backgroundColor} ${textColor} rounded-md cursor-pointer flex items-center`}
                onClick={() => handleOnClick(activity.id)}
              >
                {isSelected ? (
                  <Image
                    src={CheckMark}
                    alt="체크 마크 아이콘"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                ) : (
                  <div className="w-[20px] mr-2" />
                )}
                {activity.title}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
