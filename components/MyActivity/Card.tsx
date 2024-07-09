import Image from 'next/image';
import { CardProps } from './Card.types';
import { MeatballButton } from '../Button/Button';

function Card({ activityImage, rating, reviewCount, title, price }: CardProps) {
  const handleOnClick = () => {};

  return (
    <div className="flex rounded-[24px] w-[800px] h-[204px] bg-white shadow-card overflow-hidden">
      <Image src={activityImage} alt={title} width={210} height={204} />
      <div className="flex flex-col justify-between px-[24px] py-[21px]">
        <div className="flex flex-col gap-[6px]">
          <div className="flex gap-[6px] items-center">
            <Image
              src="/icon/icon_star_on.svg"
              alt="별점"
              width={19}
              height={19}
            />
            <div className="h-[21px] text-var-black">{`${rating} (${reviewCount})`}</div>
          </div>
          <div className="text-[20px] font-[700] text-nomad-black">{title}</div>
        </div>
        <div className="flex w-[548px] justify-between items-center py-[5px]">
          <div className="flex items-center gap-[8px]">
            <span className="text-[24px] font-[500] text-var-gray8">{`₩${price}`}</span>
            <span className="font-[500] text-var-gray8">/인</span>
          </div>
          <MeatballButton onClick={handleOnClick} />
        </div>
      </div>
    </div>
  );
}

export default Card;
