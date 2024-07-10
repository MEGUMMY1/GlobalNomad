import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavigationDropdown() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  return (
    <div
      className="z-99 absolute bottom-[-90px] flex w-[90px] animate-slideDown flex-col justify-center overflow-hidden rounded-md bg-var-gray1 border-var-gray5 border-solid  
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
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
}
