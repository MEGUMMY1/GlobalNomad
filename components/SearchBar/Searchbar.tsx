import React, { useState } from 'react';
import Image from 'next/image';
import Icon from '@/public/icon/icon_search.svg';

/*
메인화면에서 보이는 검색 바 입니다.
*/

function SearchBar() {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="p:w-[1200px] t:w-[696px] m:w-[343px] p:h-[178px] t:h-[166px] m:p-[130px] flex flex-col p:gap-[32px] t:gap-[20px] m:gap-[15px] bg-white p-[32px_24px_32px_24px] m:p-[16px_24px_16px_24px] rounded-2xl">
      <span className="font-sans text-[20px] m:text-[16px] font-[700]">
        무엇을 체험하고 싶으신가요?
      </span>
      <div className="flex gap-[12px]">
        <div className="relative p:w-[1000px] h-[56px] t:w-[500px] m:w-[188px]">
          <input
            className=" border border-[#79747E] border-solid p:w-[1000px] t:w-[500px] m:w-[188px] h-[56px] flex p-[4px_16px_4px_40px] items-center self-stretch rounded font-sans text-[16px] m:text-[14px] font-[400]"
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
            <div className="w-[124px] m:w-[118px] h-[26px] text-[16px] m:text-[14px] font-sans font-[400] text-var-gray6 absolute top-[-10px] left-10 bg-white text-center">
              내가 원하는 체험은
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <button className="w-[136px] m:w-[96px] h-[56px] flex items-center justify-center bg-nomad-black text-[white] font-sans font-[700] text-[16px] leading-7 rounded">
          검색하기
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
