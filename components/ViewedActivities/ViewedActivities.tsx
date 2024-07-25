import RecordImg from '@/public/icon/Record.svg';
import Ximg from '@/public/icon/btn_x_big.svg';
import Image from 'next/image';
import { useState } from 'react';

function ViewedActivities() {
  const [isOpen, setIsOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  const openModal = () => {
    setAnimationClass('rotate-open');
    setIsOpen(true);
  };
  const closeModal = () => {
    setAnimationClass('rotate-close');
    setIsOpen(false);
  };

  return (
    <div>
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
    </div>
  );
}

export default ViewedActivities;
