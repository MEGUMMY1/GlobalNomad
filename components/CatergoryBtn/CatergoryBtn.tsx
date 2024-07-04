import { useState } from 'react';
import { CategoryBtnProps } from './CategoryBtn.types';

export default function CatergoryBtn({ categoryName }: CategoryBtnProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <div
      className={`flex items-center justify-center rounded-[15px] border-[1px] border-solid border-var-green2 w-[127px] h-[53px] t:w-[120px]  m:w-[80px] m:h-[41px] ${isActive ? 'bg-nomad-black' : ''}`}
      onClick={handleClick}
    >
      <p
        className={`text-[18px] m:text-[14px] text-var-green2 ${isActive ? 'text-white' : ''}`}
      >
        {categoryName}
      </p>
    </div>
  );
}
