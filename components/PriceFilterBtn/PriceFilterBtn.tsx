import Image from 'next/image';
import filterIcon from '@/public/icon/filter_arrowdown.svg';
import React, { useEffect, useRef, useState } from 'react';

export default function PriceFilterBtn() {
  const [showMenuList, setShowMenuList] = useState(false);
  const dropDownElement = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropDownElement.current &&
      !dropDownElement.current.contains(e.target as Node)
    ) {
      setShowMenuList(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className='relative'>
      <button
        className="flex justify-between items-center w-[127px] h-[53px] border-solid border-[1px] rounded-[15px] t:w-[120px] m:w-[90px] m:h-[41px] border-var-green2 px-[20px] bg-white"
        ref={dropDownElement}
        onClick={() => setShowMenuList((prev) => !prev)}
      >
        <p className="text-[18px] text-var-green2">가격</p>
        <Image
          src={filterIcon}
          alt="가격 필터 화살표 아이콘"
          className={showMenuList ? 'rotate-180' : ''}
        />
      </button>

      {showMenuList && (
        <div className="absolute">
          <div className="relative left-0 bottom-[-8px] z-50 flex w-[127px] t:w-[120px] m:w-[90px] flex-col shadow-lg rounded-[8px] animate-slideDown">
            <button className="flex justify-center items-center text-[18px] m:text-[14px] border border-solid border-var-gray3 w-[127px] t:w-[120px] m:w-[90px] h-[58px] m:h-[41px] rounded-t-[8px] bg-white hover:bg-var-gray2 ">
              가격이 낮은 순
            </button>
            <button className="flex justify-center items-center text-[18px] m:text-[14px] border border-solid border-var-gray3 border-t-0  w-[127px] t:w-[120px] m:w-[90px] h-[58px] m:h-[41px] rounded-b-[8px] bg-white hover:bg-var-gray2">
              가격이 높은 순
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
