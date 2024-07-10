import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CardProps, PopoverButtonProps, PopoverProps } from './Card.types';
import { MeatballButton } from '../Button/Button';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatNumberToFixed } from '@/utils/formatNumberToFixed';
import { usePopup } from '@/hooks/usePopup';
import useClickOutside from '@/hooks/useClickOutside';

function PopoverButton({ children, onClick }: PopoverButtonProps) {
  return (
    <button
      className="px-[46px] py-[18px] w-[160px] text-[18px] font-[500]"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Popover({ closePopover }: PopoverProps) {
  const popoverRef = useClickOutside<HTMLDivElement>(closePopover);
  const router = useRouter();
  const { openPopup } = usePopup();

  const handleClickEdit = () => {
    router.push('/myActivity/edit');
  };
  const handleClickDelete = () => {
    openPopup({
      popupType: 'select',
      content: '체험을 삭제하시겠어요?',
      btnName: ['아니오', '삭제하기'],
      callBackFnc: () => alert('체험 삭제 테스트'),
    });
  };

  return (
    <div
      className="flex flex-col absolute rounded-[6px] border border-solid border-var-gray3 right-0 top-[50px] bg-white"
      ref={popoverRef}
    >
      <PopoverButton onClick={handleClickEdit}>수정하기</PopoverButton>
      <hr className="bg-var-gray3"></hr>
      <PopoverButton onClick={handleClickDelete}>삭제하기</PopoverButton>
    </div>
  );
}

function Card({ activityImage, rating, reviewCount, title, price }: CardProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleClickMeatball = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };
  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };

  const formattedPrice = formatCurrency(price);

  return (
    <div className="flex rounded-[24px] w-[800px] h-[204px] bg-white shadow-card t:w-full m:w-[calc(100vw-50px)]">
      <Image
        className="rounded-l-[24px]"
        src={activityImage}
        alt={title}
        width={210}
        height={204}
      />
      <div className="flex flex-col w-full justify-between px-[24px] py-[21px]">
        <div className="flex flex-col gap-[6px]">
          <div className="flex gap-[6px] items-center">
            <Image
              src="/icon/icon_star_on.svg"
              alt="별점"
              width={19}
              height={19}
            />
            <div className="h-[21px] text-var-black">{`${formatNumberToFixed(rating)} (${reviewCount})`}</div>
          </div>
          <div className="text-[20px] font-[700] text-nomad-black">{title}</div>
        </div>
        <div className="relative flex w-full justify-between items-center py-[5px]">
          <div className="flex items-center gap-[8px]">
            <span className="text-[24px] font-[500] text-var-gray8">{`₩${formattedPrice}`}</span>
            <span className="font-[500] text-var-gray8">/인</span>
          </div>
          <MeatballButton onClick={handleClickMeatball} />
          {isPopoverOpen ? <Popover closePopover={handleClosePopover} /> : null}
        </div>
      </div>
    </div>
  );
}

export default Card;
