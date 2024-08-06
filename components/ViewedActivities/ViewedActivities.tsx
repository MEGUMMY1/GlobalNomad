import Image from 'next/image';
import { useState } from 'react';
import ViewedActivity from './ViewedActivity';
import useClickOutside from '@/hooks/useClickOutside';
import { useRecoilValue } from 'recoil';
import { ViewedActivitiesState } from '@/states/ViewedState';
import HistoryImg_black from '@/public/icon/History_black.svg';
import HistoryImg_white from '@/public/icon/History_white.svg';
import CloseImg_black from '@/public/icon/close_black.svg';
import CloseImg_white from '@/public/icon/close_white.svg';
import { darkModeState } from '@/states/themeState';

function ViewedActivities() {
  const [isOpen, setIsOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [faded, setFaded] = useState('');
  const ViewedActivitiesElement = useClickOutside<HTMLDivElement>(() =>
    setIsOpen(false)
  );
  const ViewedActivitiesVlue = useRecoilValue(ViewedActivitiesState);
  const isDarkMode = useRecoilValue(darkModeState);

  const openModal = () => {
    setAnimationClass('rotate-open');
    setFaded('animate-slideUp');
    setIsOpen(true);
  };
  const closeModal = () => {
    setAnimationClass('rotate-close');
    setFaded('animate-slideDown');
    setIsOpen(false);
  };

  return (
    <div ref={ViewedActivitiesElement}>
      <div className="fixed right-[32px] m:right-[14px] bottom-[90px] z-30 w-[40px] h-[40px] bg-gray-200 border-[1px] dark:border-[2px] dark:bg-var-dark2 border-solid dark:border-var-dark3 flex items-center justify-center rounded-xl cursor-pointer hover:bg-gray-300">
        {!isOpen ? (
          <Image
            src={isDarkMode ? HistoryImg_white : HistoryImg_black}
            alt="방문한 체험 표시 이미지"
            width={32}
            height={32}
            onClick={openModal}
            className={animationClass}
          />
        ) : (
          <Image
            src={isDarkMode ? CloseImg_white : CloseImg_black}
            alt="닫기 이미지"
            width={32}
            height={32}
            onClick={closeModal}
            className={animationClass}
          />
        )}
      </div>
      {isOpen && (
        <div
          className={`w-[180px] h-[300px] rounded-lg fixed right-[32px] m:right-[14px] bottom-[138px] z-30 bg-white border-solid border-4 border-gray-800 ${faded} flex flex-col items-center px-[10px] pt-[10px] gap-[10px] overflow-y-auto overflow-x-hidden pb-[10px] custom-scrollbar dark:border-gray-400 dark:bg-gray-900`}
        >
          <div className="font-sans text-[14px] font-[600]">
            최근 방문한 체험
          </div>
          <div className="flex flex-col gap-[10px]">
            {ViewedActivitiesVlue.map((activity) => (
              <ViewedActivity
                key={activity.id}
                id={activity.id}
                bannerImage={activity.bannerImage}
                title={activity.title}
              />
            ))}
          </div>
          {ViewedActivitiesVlue.length === 10 && (
            <div className="font-sans text-[10px] font-[600]">
              *최근 10개 정보까지 볼 수 있습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewedActivities;
