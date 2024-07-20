import MyPageInput from '@/components/MyPageInput/MyPageInput';
import SidenNavigation from '@/components/SideNavigation/SideNavigation';
import SidenNavigationMobile from '@/components/SideNavigation/SideNavigationMobile';
import useLoginState from '@/hooks/useLoginState';
import { useSideNavigation } from '@/hooks/useSideNavigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MyPage() {
  const route = useRouter();
  const { isLoggedIn } = useLoginState();
  const { isOpen } = useSideNavigation();

  useEffect(() => {
    if (!isLoggedIn) {
      route.push('/login');
    }
  }, [isLoggedIn, route]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <div
        className={`flex justify-center w-full min-h-screen mt-[72px] gap-[24px] t:mt-[24px] t:gap-[16px] m:mt-[26px] ${isOpen ? 'fixed' : ''}`}
      >
        <div className="m:hidden">
          <SidenNavigation />
        </div>
        <MyPageInput />
      </div>
      <SidenNavigationMobile />
    </>
  );
}
