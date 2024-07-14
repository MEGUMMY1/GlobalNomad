import useLogout from '@/hooks/useLogout';
import Link from 'next/link';

export default function NavigationDropdown() {
  const logout = useLogout();

  return (
    <div
      className="z-30 absolute bottom-[-90px] flex w-[90px] animate-slideDown flex-col justify-center overflow-hidden rounded-md bg-var-gray1 border-var-gray2 border-solid border  
       shadow-lg "
    >
      <Link
        href="/mypage"
        className="block w-full rounded-[0.4rem] px-[16px] py-[10px] text-left text-[14px] hover:bg-var-green1"
      >
        내 정보
      </Link>
      <button
        type="button"
        className="border-t-block w-full rounded-[0.4rem] px-[16px] py-[10px] text-left text-[14px] hover:bg-var-green1"
        onClick={logout}
      >
        로그아웃
      </button>
    </div>
  );
}
