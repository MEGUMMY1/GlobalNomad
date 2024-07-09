import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Down from '@/public/icon/chevron_down.svg';
import Up from '@/public/icon/chevron_up.svg';
import CheckMark from '@/public/icon/Checkmark.svg';
import { KategorieDropdownProps } from './KategorieDropdown.type';
import { useRecoilState, useRecoilValue } from 'recoil';
import { KategoriedDropState } from '@/states/KategorieDropState';

const Kategories: { [key: string]: string } = {
  '문화 예술': '문화 예술',
  식음료: '식음료',
  스포츠: '스포츠',
  투어: '투어',
  관광: '관광',
  웰빙: '웰빙',
};

function Kategorie({ name, setIsOpen }: KategorieDropdownProps) {
  const [KategorieInfo, setKategorieInfo] = useRecoilState(KategoriedDropState);
  const changeKateogireInfo = (event: React.MouseEvent<HTMLLIElement>) => {
    setKategorieInfo({
      name: name,
    });
    setIsOpen(false);
  };

  const isSelected = KategorieInfo.name === name;
  const backgroundColor = isSelected ? 'bg-black' : 'bg-white'; // 조건부 배경색 설정
  const textColor = isSelected ? 'text-white' : 'text-black';
  return (
    <li
      className={`w-[784px] h-[40px] flex items-center pl-[36px] ${backgroundColor} ${textColor} relative rounded-md hover:bg-gray-100`}
      onClick={changeKateogireInfo}
      style={{ pointerEvents: isSelected ? 'none' : 'auto' }}
    >
      {name}
      {isSelected ? (
        <Image
          src={CheckMark}
          alt="체크 이미지"
          width={20}
          height={20}
          className="absolute left-2"
        ></Image>
      ) : (
        <div></div>
      )}
    </li>
  );
}

function KategorieDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const SelectedKateogorie = useRecoilValue(KategoriedDropState);
  const isSelected = SelectedKateogorie.name ? 'text-black' : 'text-var-gray6';
  const KateDropdownElement = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      KateDropdownElement.current &&
      !KateDropdownElement.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-[800px] h-[56px] relative" ref={KateDropdownElement}>
      <div
        className={`w-[800px] h-[56px] border-solid border border-var-gray7 rounded flex items-center pl-[16px] text-[16px] font-[400] font-sans ${isSelected} bg-white`}
        onClick={handleOpen}
      >
        {SelectedKateogorie.name ? SelectedKateogorie.name : '카테고리'}
        {isOpen ? (
          <Image
            src={Up}
            alt="위 화살표 이미지"
            width={24}
            height={24}
            className="absolute right-2 top-4"
          ></Image>
        ) : (
          <Image
            src={Down}
            alt="아래 화살표 이미지"
            width={24}
            height={24}
            className="absolute right-2 top-4"
          ></Image>
        )}
      </div>
      {isOpen ? (
        <ul className="w-[800px] h-[260px] rounded-md bg-white absolute animate-slideDown bottom-[-266px] flex flex-col items-center justify-center">

          {Object.values(Kategories).map((category) => (
            <Kategorie key={category} name={category} setIsOpen={setIsOpen} />
          ))}
        </ul>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default KategorieDropdown;
