import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CardProps, PopoverButtonProps, PopoverProps } from './Card.types';
import { MeatballButton } from '../../Button/Button';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatNumberToFixed } from '@/utils/formatNumberToFixed';
import { usePopup } from '@/hooks/usePopup';
import useClickOutside from '@/hooks/useClickOutside';
import useDeleteActivity from '@/hooks/myActivity/useDeleteActivity';
import Link from 'next/link';

function PopoverButton({ children, onClick }: PopoverButtonProps) {
  return (
    <button
      className="rounded-[6px] w-full h-[57px] text-[18px] font-[500] hover:bg-var-gray2 dark:hover:text-var-dark2 m:text-sm"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Popover({ activityId, closePopover }: PopoverProps) {
  const popoverRef = useClickOutside<HTMLDivElement>(closePopover);
  const router = useRouter();
  const { openPopup } = usePopup();
  const { deleteMyActivityMutation } = useDeleteActivity();

  const handleClickEdit = () => {
    router.push({
      pathname: '/myactivity/edit',
      query: { activityId: activityId },
    });
  };
  const handleClickDelete = () => {
    openPopup({
      popupType: 'select',
      content: '체험을 삭제하시겠어요?',
      btnName: ['아니오', '삭제하기'],
      callBackFnc: () => {
        deleteMyActivityMutation.mutate(activityId);
      },
    });
  };

  return (
    <div
      className="flex flex-col absolute rounded-[6px] w-40 h-[114px] m:w-24 m:h-20 border border-solid border-var-gray3 dark:border-var-dark3 right-0 top-[50px] m:top-10 bg-white dark:bg-var-dark2 z-10 dark:text-var-gray2"
      ref={popoverRef}
    >
      <PopoverButton onClick={handleClickEdit}>수정하기</PopoverButton>
      <hr className="h-[1px] bg-var-gray3 dark:bg-var-dark3 border-none"></hr>
      <PopoverButton onClick={handleClickDelete}>삭제하기</PopoverButton>
    </div>
  );
}

function Card({
  activityId,
  activityImage,
  rating,
  reviewCount,
  title,
  price,
}: CardProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleClickMeatball = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };
  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };

  const formattedPrice = formatCurrency(price);

  return (
    <div className="flex rounded-[24px] shadow-card dark:shadow-none t:w-full m:w-full">
      <div className="min-w-[204px] h-[204px] relative t:min-w-[156px] t:h-[156px] m:min-w-[110px] m:h-[128px]">
        <Link
          href={`/activity-details/${activityId}`}
          className="text-[20px] font-bold mt-[8px] hover:underline"
        >
          <Image
            src={activityImage}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-l-[24px] hover:scale-110"
          />
        </Link>
      </div>
      <div className="w-full h-[204px] t:h-[156px] m:h-[128px] rounded-r-[24px] pl-[24px] pt-[24px] pb-[10px] pr-[10px] t:p-[12px] m:p-[9px] bg-white dark:bg-var-dark2 flex flex-col justify-between">
        <div className="flex flex-col gap-[6px]">
          <div className="flex gap-[6px] items-center">
            <Image
              src="/icon/icon_star_on.svg"
              alt="별점"
              width={19}
              height={19}
            />
            <div className="h-[21px] text-var-black m:text-[14px] dark:text-var-gray2">{`${formatNumberToFixed(rating)} (${reviewCount})`}</div>
          </div>
          <Link href={`/activity-details/${activityId}`}>
            <p className="text-[20px] mt-[8px] font-bold tracking-tight hover:underline t:text-[18px] t:mt-[0] m:text-[14px] m:mt-[0] m:py-[2px] line-clamp-2">
              {title}
            </p>
          </Link>
        </div>
        <div className="relative flex w-full justify-between items-center py-[5px] m:items-end">
          <div className="flex items-center gap-[8px]">
            <span className="font-medium text-[24px] t:text-[20px] m:text-[16px]">{`₩${formattedPrice}`}</span>
            <span className="font-[500] text-var-gray8 dark:text-var-gray6">
              /인
            </span>
          </div>
          <div className="m:w-[32px] m:h-[32px]">
            <MeatballButton onClick={handleClickMeatball} />
          </div>
          {isPopoverOpen ? (
            <Popover
              activityId={activityId}
              closePopover={handleClosePopover}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Card;
