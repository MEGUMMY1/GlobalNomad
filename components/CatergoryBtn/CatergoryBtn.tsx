import { useState } from 'react';
import { CategoryBtnProps } from './CategoryBtn.types';
import { useRecoilState, useRecoilValue } from 'recoil';
import { mainPageKategorieState, mainPageState } from '@/states/mainPageState';

export default function CatergoryBtn({ categoryName }: CategoryBtnProps) {
  const [selectedKategorie, setSelectedKategorie] = useRecoilState(
    mainPageKategorieState
  );
  const [currentPage, setCurrentPage] = useRecoilState(mainPageState);

  const { KategorieName } = useRecoilValue(mainPageKategorieState);

  const handleClick = () => {
    if (categoryName === KategorieName) {
      setSelectedKategorie({ KategorieName: '' });
      setCurrentPage((prev) => ({
        ...prev,
        currentPage: 1,
      }));
    } else {
      setSelectedKategorie({ KategorieName: categoryName });
      setCurrentPage((prev) => ({
        ...prev,
        currentPage: 1,
      }));
    }
  };

  const isSelected = categoryName === KategorieName;
  const backgroundColor = isSelected
    ? 'bg-black dark:bg-var-gray6'
    : 'bg-white dark:bg-var-dark2';
  const textColor = isSelected
    ? 'text-white dark:text-var-gray2'
    : 'text-black dark:text-var-gray2';

  return (
    <button
      className={`flex items-center justify-center rounded-[15px] border-[1px] border-solid border-2 m:border-[1px] border-var-green2 dark:border-none w-[127px] h-[53px] t:min-w-[120px] m:min-w-[80px] m:h-[41px] ${backgroundColor}`}
      onClick={handleClick}
    >
      <p className={`text-[18px] p:font-[600] m:text-[14px] ${textColor}`}>
        {categoryName}
      </p>
    </button>
  );
}
