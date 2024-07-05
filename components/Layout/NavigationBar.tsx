import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/icon/logo_small.svg';
import notificationIcon from '@/public/icon/icon_notification.svg';

export default function NavigationBar() {
  const isLoggined = 'y';

  return (
    <div className="flex h-[70px] justify-between pl-[369px] pr-[351px] t:px-[24px] m:px-[24px] bg-[#fff] border-b border-var-gray3 border-solid ">
      <div className="flex items-center">
        <Link href="/">
          <Image src={Logo} alt="로고 아이콘" />
        </Link>
      </div>
      {isLoggined ? (
        <div className="flex items-center gap-[25px]">
          <button>
            <Image src={notificationIcon} alt="알림 아이콘" />
          </button>
          <div className="flex items-center gap-[10px] border-l-2 border-var-gray3 border-solid pl-[25px] m:pl-[12px]">
            <div className="h-[32px] w-[32px] rounded-full bg-var-gray3" />
            <p className="text-[14px]">테스트</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-[25px]">
          <Link href="/login" className="text-[14px]">
            로그인
          </Link>
          <Link href="/signup" className="text-[14px]">
            회원가입
          </Link>
        </div>
      )}
    </div>
  );
}
