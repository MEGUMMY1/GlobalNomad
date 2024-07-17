import Image from 'next/image';
import filterIcon from '@/public/icon/filter_arrowdown.svg';
import React, { useState, useEffect } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import { useRecoilState, useRecoilValue } from 'recoil';
import { mainPageState } from '@/states/mainPageState';

export default function PriceFilterBtn() {
  const [showMenuList, setShowMenuList] = useState(false);
  const dropDownElement = useClickOutside<HTMLDivElement>(() =>
    setShowMenuList(false)
  );
  const [isClient, setIsClient] = useState(false);

  const [MainPageState, setMainPageState] = useRecoilState(mainPageState);
  const { selectedSorted: selectedPriceSorted, sortedName } =
    useRecoilValue(mainPageState);
  const changeSelectedSort = (sorted: string, sortedName: string): void => {
    setMainPageState((prevState) => ({
      ...prevState,
      selectedSorted: sorted,
      sortedName: sortedName,
    }));
    setShowMenuList(false);
  };

  useEffect(() => {
    setIsClient(true);
  }, [sortedName]);

  return (
    <div className="relative" ref={dropDownElement}>
      <button
        className="flex justify-between items-center w-[147px] h-[53px] border-solid border-[1px] rounded-[15px] t:w-[120px] m:w-[90px] m:h-[41px] border-var-green2 px-[20px] m:px-[10px] bg-white"
        onClick={() => setShowMenuList((prev) => !prev)}
      >
        <p className="text-[18px] t:text-[12px] m:text-[10px] text-var-green2">
          {isClient ? sortedName : '정렬'}
        </p>
        <Image
          src={filterIcon}
          alt="가격 필터 화살표 아이콘"
          className={showMenuList ? 'rotate-180' : ''}
        />
      </button>

      {showMenuList && (
        <div className="absolute">
          <div className="relative left-0 bottom-[-8px] z-50 flex w-[147px] t:w-[120px] m:w-[90px] flex-col shadow-lg rounded-[8px] animate-slideDown">
            <button
              className="flex justify-center items-center text-[18px] m:text-[14px] border border-solid border-var-gray3 w-[147px] t:w-[120px] m:w-[90px] h-[58px] m:h-[41px] rounded-t-[8px] bg-white hover:bg-var-gray2"
              onClick={() => changeSelectedSort('', '기본 정렬')}
            >
              기본 정렬
            </button>
            <button
              className="flex justify-center items-center text-[18px] m:text-[14px] border border-solid border-var-gray3 w-[147px] t:w-[120px] m:w-[90px] h-[58px] m:h-[41px] bg-white hover:bg-var-gray2"
              onClick={() => changeSelectedSort('price_asc', '가격 낮은 순')}
            >
              가격이 낮은 순
            </button>
            <button
              className="flex justify-center items-center text-[18px] m:text-[14px] border border-solid border-var-gray3 border-t-0 w-[147px] t:w-[120px] m:w-[90px] h-[58px] m:h-[41px] bg-white hover:bg-var-gray2"
              onClick={() => changeSelectedSort('price_desc', '가격 높은 순')}
            >
              가격이 높은 순
            </button>
            <button
              className="flex justify-center items-center text-[18px] m:text-[14px] border border-solid border-var-gray3 border-t-0 w-[147px] t:w-[120px] m:w-[90px] h-[58px] m:h-[41px] rounded-b-[8px] bg-white hover:bg-var-gray2"
              onClick={() =>
                changeSelectedSort('most_reviewed', '리뷰 많은 순')
              }
            >
              리뷰 많은 순
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
