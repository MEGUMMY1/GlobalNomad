import { CircleCloseButton } from '@/components/Button/Button';
import MyPageInput from '@/components/MyPage/MyPageInput';
import SidenNavigation from '@/components/SideNavigation/SideNavigation';
import SidenNavigationMobile from '@/components/SideNavigation/SideNavigationMobile';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function MyPage() {
  const router = useRouter();
  const [screenSize, setScreenSize] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };
  const onCircleClick = () => {
    setActiveSection(null);
  };

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width <= 743) {
        setScreenSize('m');
      } else {
        setScreenSize('');
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenSize, activeSection]);
  return (
    <>
      {screenSize !== 'm' ? (
        <div className="flex justify-center w-full mt-[72px] gap-[24px] t:mt-[24px] t:gap-[16px]">
          <SidenNavigation />
          <MyPageInput />
        </div>
      ) : (
        <>
          {!activeSection && (
            <div className="flex justify-center w-full mt-[24px]">
              <SidenNavigationMobile onNavigate={handleNavigate} />
            </div>
          )}
          {activeSection === 'mypage' && (
            <div className="flex-col justify-center w-full my-[10px] ">
              <div className="flex justify-end mb-[10px]">
                <CircleCloseButton onClick={onCircleClick} />
              </div>
              <MyPageInput />
            </div>
          )}
        </>
      )}
    </>
  );
}
