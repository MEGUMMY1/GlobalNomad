import React, { useState } from 'react';
import Image from 'next/image';
import Icon from '@/public/icon/icon_search.svg';

function SearchBar() {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-[32px]">
      <span className="font-sans text-[20px] font-[700]">
        무엇을 체험하고 싶으신가요?
      </span>
      <div className="flex gap-[12px]">
        <div className="relative w-[1000px] h-[56px]">
          <input
            className=" border border-[#79747E] border-solid w-[1000px] h-[56px] flex p-[4px_16px_4px_40px] items-center self-stretch rounded font-sans text-[16px] font-[400]"
            placeholder="내가 원하는 체험은"
            onChange={handleChange}
          ></input>
          <Image
            className="absolute left-0 top-2"
            src={Icon}
            width={40}
            height={40}
            alt="검색 아이콘"
          ></Image>
          {inputValue ? (
            <div className="w-[124px] h-[26px] text-[16px] font-sans font-[400] text-[#A4A1AA] absolute top-[-10px] left-10 bg-white text-center">
              내가 원하는 체험은
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <button className="w-[136px] h-[56px] flex items-center justify-center bg-[#121] text-[white] font-sans font-[700] text-[16px] leading-7 rounded">
          검색하기
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
