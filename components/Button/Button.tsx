import Image from 'next/image';
import closeImageWhite from '@/public/icon/x_white.svg';
import closeImageNormal from '@/public/icon/btn_x_medium.svg';
import closeImageBold from '@/public/icon/btn_x_medium_bold.svg';
import closeImageBig from '@/public/icon/btn_x_big.svg';
import { PrimaryButtonProps, CloseButtonProps } from './Button.types';

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
   size 옵션 - small - width auto | medium - width 144px | large - width 100%
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
export function CircleCloseButton({ onClick }: CloseButtonProps) {
  return (
    <button
      className="flex items-center justify-center rounded-full bg-nomad-black bg-opacity-80 w-10 h-10 t:w-8 t:h-8 m:w-6 m:h-6"
      onClick={onClick}
    >
      <Image
        className="w-5 h-5 t:w-4 t:h-4 m:w-3 m:h-3"
        src={closeImageWhite}
        alt="닫기"
      />
    </button>
  );
}

/* 닫기 버튼 - 기본 버전  */
export function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button onClick={onClick}>
      <Image src={closeImageNormal} alt="닫기" />
    </button>
  );
}

/* 닫기 버튼 - bold 버전 */
export function CloseButtonBold({ onClick }: CloseButtonProps) {
  return (
    <button onClick={onClick}>
      <Image src={closeImageBold} alt="닫기" />
    </button>
  );
}

/* 닫기 버튼 - 큰 사이즈 버전 */
export function CloseButtonBig({ onClick }: CloseButtonProps) {
  return (
    <button onClick={onClick}>
      <Image src={closeImageBig} alt="닫기" />
    </button>
  );
}
