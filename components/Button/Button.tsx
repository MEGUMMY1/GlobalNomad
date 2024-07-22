import Image from 'next/image';
import {
  PaginationButtonProps,
  PrimaryButtonProps,
  SimpleButtonProps,
} from './Button.types';
import { useRecoilValue } from 'recoil';
import { darkModeState } from '@/states/themeState';

const primarySizeClasses = {
  small: 'px-[20px] py-[10px] text-[14px]',
  medium: 'w-[144px] h-[48px] px-[12px] py-[8px] text-[16px]',
  large: 'w-full h-[48px] px-[12px] py-[12px] text-[16px]',
};

const primaryStyleClasses = {
  dark: 'bg-nomad-black text-white dark:bg-var-dark3 dark:text-var-gray2 dark:hover:bg-nomad-black',
  bright: 'bg-white text-nomad-black border border-nomad-black',
  disabled: 'bg-var-gray6 text-white',
  enabled: 'bg-nomad-black text-white',
};

/* 기본 버튼 - 로그인하기, 신청 불가 등 기본적인 형태의 버튼

   size, style 필수 입력 onClick, children, disabled 선택 입력
   size 옵션 - small - width auto | medium - width 144px | large - width 100%
   style 옵션 - dark-어두운 배경에 흰글씨 | bright - 흰 배경에 어두운 글씨 | disabled - 회색 배경에 흰 글씨
   사용 예시 <Button size="small" style="dark" onClick={handleClick}>로그인하기</Button> */
export function PrimaryButton({
  type = 'button',
  size,
  style,
  children,
  onClick = () => {},
  disabled,
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      className={`flex items-center justify-center rounded-md ${primarySizeClasses[size]} ${primaryStyleClasses[style]} ${disabled ? 'cursor' : ''}`}
      onClick={onClick}
      disabled={disabled ?? false}
    >
      {children}
    </button>
  );
}

/* 이미지 슬라이드 버튼 - 좌우 버튼(검정색)으로 슬라이드 하는 경우 
   사용 예시 - <PaginationButton direction="next" />,
              <PaginationButton direction="prev" /> */
export function PaginationButton({
  direction,
  onClick,
}: {
  direction: 'prev' | 'next';
  onClick?: () => void;
}) {
  const isPrev = direction === 'prev';
  const src = isPrev
    ? '/icon/btn_pagination_arrow_left.svg'
    : '/icon/btn_pagination_arrow_right.svg';
  const alt = isPrev ? '이전 페이지' : '다음 페이지';
  const leftOrRight = isPrev ? 'left-2' : 'right-2';

  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 z-10 ${leftOrRight}`}
    >
      <Image src={src} width={24} height={47} alt={alt} />
    </button>
  );
}

/* 페이지네이션 버튼 - 좌우 화살표 버튼으로 페이지네이션 하는 경우 
   onClickPrev, onClickNext, isFirstPage, isLastPage 필수 입력 
   사용 예시 - [이전] <PaginationArrowButton onClick={goToPrevPage} disabled={isFirstPage} direction="prev" />
              [다음] <PaginationArrowButton onClick={goToNextPage} disabled={isLastPage} direction="next" /> */
export function PaginationArrowButton({
  onClick,
  disabled,
  direction,
}: PaginationButtonProps) {
  const darkMode = useRecoilValue(darkModeState);

  const iconActiveSrc =
    direction === 'prev'
      ? '/icon/arrow_active_left.svg'
      : '/icon/arrow_active_right.svg';
  const iconInactiveSrc =
    direction === 'prev'
      ? '/icon/arrow_inactive_left.svg'
      : '/icon/arrow_inactive_right.svg';

  const darkModeActiveSrc =
    direction === 'prev'
      ? '/icon/arrow_inactive_left.svg'
      : '/icon/arrow_inactive_right.svg';
  const darkModeInactiveSrc =
    direction === 'prev'
      ? '/icon/arrow_active_left.svg'
      : '/icon/arrow_active_right.svg';

  const altText = direction === 'prev' ? '이전 페이지' : '다음 페이지';

  const iconSrc = darkMode
    ? disabled
      ? darkModeInactiveSrc
      : darkModeActiveSrc
    : disabled
      ? iconInactiveSrc
      : iconActiveSrc;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-[55px] h-[55px] flex items-center justify-center bg-white dark:bg-var-dark2 border border-solid ${
        disabled
          ? 'border-var-gray3 dark:border-var-gray8'
          : 'border-var-green2 dark:border-var-gray8'
      } rounded-2xl m:w-[40px] m:h-[40px]`}
    >
      <Image src={iconSrc} width={20} height={20} alt={altText} />
    </button>
  );
}

/* 원형 닫기 버튼 */
export function CircleCloseButton({ onClick }: SimpleButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center justify-center rounded-full bg-nomad-black dark:bg-var-dark3 bg-opacity-80 w-[40px] h-[40px] t:w-[32px] t:h-[32px] m:w-[24px] m:h-[24px]"
      onClick={onClick}
    >
      <Image
        className="w-[20px] h-[20px] t:w-[16px] t:h-[16px] m:w-[12px] m:h-[12px]"
        src="/icon/x_white.svg"
        width={20}
        height={20}
        alt="닫기"
      />
    </button>
  );
}

/* 닫기 버튼 - 기본 버전  */
export function CloseButton({ onClick }: SimpleButtonProps) {
  return (
    <button onClick={onClick} className="cursor-pointer">
      <Image src="/icon/btn_x_medium.svg" width={24} height={24} alt="닫기" />
    </button>
  );
}

/* 닫기 버튼 - bold 버전 */
export function CloseButtonBold({ onClick }: SimpleButtonProps) {
  return (
    <button onClick={onClick}>
      <Image
        src="/icon/btn_x_medium_bold.svg"
        width={24}
        height={24}
        alt="닫기"
      />
    </button>
  );
}

/* 닫기 버튼 - 큰 사이즈 버전 */
export function CloseButtonBig({ onClick }: SimpleButtonProps) {
  return (
    <button onClick={onClick}>
      <Image src="/icon/btn_x_big.svg" width={40} height={40} alt="닫기" />
    </button>
  );
}

/* 알림 버튼 */
export function NotificationButton({ onClick }: SimpleButtonProps) {
  return (
    <button onClick={onClick}>
      <Image
        src="/icon/icon_notification.svg"
        width={24}
        height={24}
        alt="알림"
      />
    </button>
  );
}

/* 더보기(미트볼) 버튼 */
export function MeatballButton({ onClick }: SimpleButtonProps) {
  return (
    <button onClick={onClick}>
      <Image
        src="/icon/icon_meatball.svg"
        width={40}
        height={40}
        alt="더보기"
      />
    </button>
  );
}

/* 추가하기 버튼 - 항목 추가 시 사용 */
export function PlusButton({ onClick }: SimpleButtonProps) {
  return (
    <button type="button" onClick={onClick} className="shrink-0">
      <Image src="/icon/btn_plus.svg" width={56} height={56} alt="추가하기" />
    </button>
  );
}

/* 제거하기 버튼 - 항목 제거 시 사용 */
export function MinusButton({ onClick }: SimpleButtonProps) {
  return (
    <button type="button" onClick={onClick} className="shrink-0">
      <Image src="/icon/btn_minus.svg" width={56} height={56} alt="제거하기" />
    </button>
  );
}

/* 원형 화살표 버튼 - 오른쪽 방향 */
export function ArrowCircleButton({ onClick }: SimpleButtonProps) {
  return (
    <button onClick={onClick}>
      <Image
        src="/icon/btn_arrow_circle.svg"
        width={32}
        height={32}
        alt="오른쪽 화살표"
      />
    </button>
  );
}

/* 이미지 등록하기 버튼 */
export function ImageUploadButton() {
  return (
    <div className="flex flex-col gap-[40px] items-center justify-center w-[180px] h-[180px] t:w-[206px] t:h-[206px] m:w-[167px] m:h-[167px] border border-dashed border-var-gray8 rounded-lg">
      <Image src="/icon/icon_plus.svg" width={30} height={30} alt="추가" />
      <p className="text-[24px]">이미지 등록</p>
    </div>
  );
}
