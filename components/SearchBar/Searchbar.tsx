import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Icon from '@/public/icon/icon_search.svg';
import { useRecoilState } from 'recoil';
import { mainSearchValueState } from '@/states/mainPageState';

/*
메인화면에서 보이는 검색 바 입니다.
*/

interface SearchBarProps {
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchBar({ setIsSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchresultsState, setSearchResultsState] =
    useRecoilState(mainSearchValueState);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue === '') {
      setIsSearch(false);
    } else {
      setSearchResultsState((prevState) => ({
        ...prevState,
        SearchValue: inputValue,
        currentPage: 1,
      }));
      setIsSearch(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleSubmit();
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [inputValue]);

  return (
    <div className="p:w-[1200px] t:w-[696px] m:w-[343px] p:h-[178px] t:h-[166px] flex flex-col p:gap-[32px] t:gap-[20px] m:gap-[15px] bg-white dark:bg-var-dark2 p-[32px_24px_32px_24px] m:p-[16px_24px_16px_24px] rounded-2xl shadow-xl dark:shadow-none">
      <span className="font-sans text-[20px] m:text-[16px] font-[700]">
        무엇을 체험하고 싶으신가요?
      </span>
      <div className="flex gap-[12px]">
        <div className="relative p:w-[1000px] h-[56px] t:w-[500px] m:w-[188px]">
          <input
            ref={inputRef}
            className=" border border-[#79747E] dark:bg-var-dark3 dark:border-none dark:text-var-gray1 outline-none border-solid p:w-[1000px] t:w-[500px] m:w-[188px] h-[56px] flex p-[4px_16px_4px_40px] items-center self-stretch rounded font-sans text-[16px] m:text-[14px] font-[400]"
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
            <div className="w-[124px] m:w-[118px] h-[26px] text-[16px] m:text-[14px] font-sans font-[400] text-var-gray6 absolute top-[-10px] left-10 bg-white dark:bg-var-dark3 text-center">
              내가 원하는 체험은
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <button
          className="w-[136px] m:w-[96px] h-[56px] flex items-center justify-center bg-nomad-black text-[white] font-sans font-[700] text-[16px] leading-7 rounded"
          onClick={handleSubmit}
        >
          검색하기
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
