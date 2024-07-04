import { PrimaryButtonProps } from './Button.types';

const sizeClasses = {
  small: 'px-5 py-2.5 text-lg',
  medium: 'w-36 h-12 px-3 py-2 text-base',
  large: 'w-full h-12 px-3 py-3 text-xl',
};

const styleClasses = {
  dark: 'bg-brand-nomad-black text-white',
  bright: 'bg-white text-brand-nomad-black border border-brand-nomad-black',
  disabled: 'bg-var-gray6 text-white',
};

/* 기본 버튼 - 로그인하기, 신청 불가 등 기본적인 형태의 버튼

   size, style, onClick, children 필수 입력, disabled 선택 입력
   size 옵션 - (small | medium | large - width 100%)
   style 옵션 - (dark-어두운 배경에 흰글씨 | bright - 흰 배경에 어두운 글씨 | disabled - 회색 배경에 흰 글씨)
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
      className={`flex items-center justify-center rounded-md ${sizeClasses[size]} ${styleClasses[style]}`}
      onClick={onClick}
      disabled={disabled ?? false}
    >
      {children}
    </button>
  );
}
