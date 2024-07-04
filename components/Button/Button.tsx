import Image from 'next/image';
import closeImageWhite from '@/public/icon/x_white.svg';
import { PrimaryButtonProps, CircleCloseButtonProps } from './Button.types';

const primarySizeClasses = {
  small: 'px-5 py-2.5 text-lg',
  medium: 'w-36 h-12 px-3 py-2 text-base',
  large: 'w-full h-12 px-3 py-3 text-xl',
};

const primaryStyleClasses = {
  dark: 'bg-nomad-black text-white',
  bright: 'bg-white text-nomad-black border border-nomad-black',
  disabled: 'bg-var-gray6 text-white',
};

/* 기본 버튼 - 로그인하기, 신청 불가 등 기본적인 형태의 버튼

   size, style, onClick, children 필수 입력, disabled 선택 입력
   size 옵션 - small | medium | large - width 100%
   style 옵션 - dark-어두운 배경에 흰글씨 | bright - 흰 배경에 어두운 글씨 | disabled - 회색 배경에 흰 글씨
   사용 예시 <Button size="small" style="dark" onClick={handleClick}>로그인하기</Button> */

export function PrimaryButton({
  size,
  style,
  children,
  onClick,
  disabled,
}: PrimaryButtonProps) {
  return (
    <button
      className={`flex items-center justify-center rounded-md ${primarySizeClasses[size]} ${primaryStyleClasses[style]}`}
      onClick={onClick}
      disabled={disabled ?? false}
    >
      {children}
    </button>
  );
}

/* 원형 닫기 버튼 */
export function CircleCloseButton({ onClick }: CircleCloseButtonProps) {
  return (
    <button
      className="flex items-center justify-center w-10 h-10 rounded-full bg-nomad-black"
      onClick={onClick}
    >
      <Image src={closeImageWhite} alt="닫기" />
    </button>
  );
}
