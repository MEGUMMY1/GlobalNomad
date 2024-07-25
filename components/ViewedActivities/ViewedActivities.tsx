import RecordImg from '@/public/icon/Record.svg';
import Ximg from '@/public/icon/btn_x_big.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ViewedActivity from './ViewedActivity';
import useClickOutside from '@/hooks/useClickOutside';

function ViewedActivities() {
  const [isOpen, setIsOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [faded, setFaded] = useState('');
  const ViewedActivitiesElement = useClickOutside<HTMLDivElement>(() =>
    setIsOpen(false)
  );

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
    <div ref={ViewedActivitiesElement}
    >
      <div className="fixed right-[32px] bottom-[90px] z-30 w-[40px] h-[40px] bg-gray-200 flex items-center justify-center rounded-xl cursor-pointer hover:bg-gray-300">
        {!isOpen ? (
          <Image
            src={RecordImg}
            alt="방문한 체험 표시 이미지"
            width={32}
            height={32}
            onClick={openModal}
            className={animationClass}
          />
        ) : (
          <Image
            src={Ximg}
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
          className={`w-[180px] h-[300px] rounded-xl fixed right-[32px] bottom-[138px] z-30 bg-white border-solid border-4 border-gray-500 ${faded} flex flex-col items-center px-[10px] pt-[10px] gap-[10px]`}
        >
          <ViewedActivity />
          <ViewedActivity />
          <ViewedActivity />
          <ViewedActivity />
        </div>
      )}
    </div>
  );
}

export default ViewedActivities;
