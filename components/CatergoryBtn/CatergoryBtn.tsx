import { useState } from 'react';
import { CategoryBtnProps } from './CategoryBtn.types';

export default function CatergoryBtn({ categoryName }: CategoryBtnProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <button
      className={`flex items-center justify-center rounded-[15px] border-[1px] border-solid border-var-green2 w-[127px] h-[53px] t:min-w-[120px] m:min-w-[80px] m:h-[41px] ${isActive ? 'bg-nomad-black' : 'bg-white'}`}
      onClick={handleClick}
    >
      <p
        className={`text-[18px] m:text-[14px] ${isActive ? 'text-white' : 'text-var-green2'}`}
      >
        {categoryName}
      </p>
    </button>
  );
}
