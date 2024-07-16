import Image from 'next/image';
import filterIcon from '@/public/icon/filter_arrowdown.svg';
import React, { useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import { ReservationFilterProps, statusType } from './myReservationTypes.types';
import {
  Status,
  statusTitles,
} from '../ReservationListCard/reservationStatusInfo';

export default function ReservationFilter({
  setFilterOption,
  filterOption,
}: ReservationFilterProps) {
  const [showMenuList, setShowMenuList] = useState(false);

  const dropDownElement = useClickOutside<HTMLDivElement>(() =>
    setShowMenuList(false)
  );

  const handleOnClick = (status: statusType) => {
    setFilterOption(status);
    setShowMenuList(false);
  };

  const handleOnClickAll = () => {
    setShowMenuList(false);
    setFilterOption(undefined);
  };

  return (
    <div className="relative">
      <button
        className="flex justify-between items-center w-[160px] h-[53px] border-solid border-[1px] rounded-[15px] border-var-green2 px-[20px] bg-white m:w-[110px] m:h-[40px] m:px-[10px]"
        onClick={() => setShowMenuList((prev) => !prev)}
      >
        <p className="text-[18px] text-var-green2 m:text-[14px]">
          {filterOption ? statusTitles[filterOption] : '필터'}
        </p>
        <Image
          src={filterIcon}
          alt="가격 필터 화살표 아이콘"
          className={showMenuList ? 'rotate-180' : ''}
        />
      </button>

      {showMenuList && (
        <div className="absolute" ref={dropDownElement}>
          <div className="relative left-0 bottom-[-8px] z-50 bg-white flex w-[160px] flex-col rounded-lg animate-slideDown overflow-hidden border border-solid border-var-gray3 m:w-[110px]">
            {filterOption && (
              <button className={buttonStyle} onClick={handleOnClickAll}>
                ALL
              </button>
            )}
            {Status.map((status: statusType, index) => (
              <button
                className={buttonStyle}
                key={index}
                onClick={() => handleOnClick(status)}
              >
                {statusTitles[status]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const buttonStyle: string =
  'flex justify-center items-center border-b border-solid text-[18px] h-[58px] bg-white hover:bg-var-gray2 m:text-[14px] m:h-[40px]';
