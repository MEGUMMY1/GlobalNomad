import Image from 'next/image';
import calendarIcon from '@/public/icon/calendar_check_outline.svg';
import settingIcon from '@/public/icon/cog_outline.svg';
import reservationIcon from '@/public/icon/text_box_check_outline.svg';
import myAccountIcon from '@/public/icon/account_check_outline.svg';
import grayCalendarIcon from '@/public/icon/gray-calendar-check-outline.svg';
import graySettingIcon from '@/public/icon/gray-cog-outline.svg';
import grayReservationIcon from '@/public/icon/gray-text-box-check-outline.svg';
import grayMyAccountIcon from '@/public/icon/gray-account-check-outline.svg';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { routePaths } from './SideNavigation.types';
import profileThumbnail from '@/public/image/profile-circle-icon-512x512-zxne30hp.png';
import { useUserData } from '@/hooks/useUserData';
import { useRecoilState } from 'recoil';
import { sideNavigationState } from '@/states/sideNavigationState';
import { CloseButton } from '../Button/Button';
import Spinner from '../Spinner/Spinner';

export default function SidenNavigationMobile() {
  const router = useRouter();
  const { userData, isLoading } = useUserData();
  const [isOpen, setIsOpen] = useRecoilState(sideNavigationState);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  useEffect(() => {
    switch (router.pathname) {
      case '/reservation':
        setActiveButton('reservation');
        break;
      case '/myactivity':
        setActiveButton('myactivity');
        break;
      case '/calendar':
        setActiveButton('calendar');
        break;
      case '/mypage':
        setActiveButton('mypage');
        break;
    }
  }, [router.pathname]);

  const buttonPaths: routePaths = {
    mypage: '/mypage',
    reservation: '/reservation',
    myactivity: '/myactivity',
    calendar: '/calendar',
  };

  const handleCloseSideNav = () => {
    setIsOpen(false);
  };
  const handleBtnClick = (buttonName: string | null) => {
    setActiveButton((prevActiveButton) =>
      prevActiveButton === buttonName ? prevActiveButton : buttonName
    );
    setIsOpen(false);

    if (buttonName && buttonPaths[buttonName]) {
      router.push(buttonPaths[buttonName]);
    }
  };

  const sideNavBtnStyle = `font-bold flex gap-[8px] h-[44px] w-fill items-center pl-[16px] text-[16px] `;

  if (isLoading) {
    return <Spinner />;
  }
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-70 mt-[70px] overflow-hidden p:hidden t:hidden">
        <div className="fixed left-0 top-0 z-20 w-4/5 h-full p-[24px] flex flex-col mt-[70px] gap-[24px] bg-white dark:bg-var-dark2 animate-slideRight">
          <div className="flex justify-end">
            <CloseButton onClick={handleCloseSideNav} />
          </div>
          <div className="flex flex-col items-center gap-[25px]">
            <Image
              src={
                userData.profileImageUrl
                  ? userData.profileImageUrl
                  : profileThumbnail
              }
              width={160}
              height={160}
              className="rounded-full w-[160px] h-[160px] object-cover"
              alt="유저 프로필 사진"
            />
            <p className="font-bold text-[24px]">{userData.nickname}</p>
          </div>
          <div className="flex flex-col gap-[8px]  justify-between">
            <button
              className={`${sideNavBtnStyle} ${
                activeButton === 'mypage'
                  ? 'bg-var-green1  rounded-[12px] text-var-black dark:bg-var-dark4'
                  : 'text-var-gray6'
              }`}
              onClick={() => handleBtnClick('mypage')}
            >
              <Image
                src={
                  activeButton === 'mypage' ? myAccountIcon : grayMyAccountIcon
                }
                alt="내 정보 아이콘"
              />
              <p>내 정보</p>
            </button>
            <button
              className={`${sideNavBtnStyle} ${
                activeButton === 'reservation'
                  ? 'bg-var-green1 rounded-[12px]  text-var-black dark:bg-var-dark4'
                  : 'text-var-gray6'
              }`}
              onClick={() => handleBtnClick('reservation')}
            >
              <Image
                src={
                  activeButton === 'reservation'
                    ? reservationIcon
                    : grayReservationIcon
                }
                alt="예약 내역 아이콘"
              />
              <p>예약 내역</p>
            </button>
            <button
              className={`${sideNavBtnStyle} ${
                activeButton === 'myactivity'
                  ? 'bg-var-green1 rounded-[12px] text-var-black dark:bg-var-dark4'
                  : 'text-var-gray6'
              }`}
              onClick={() => handleBtnClick('myactivity')}
            >
              <Image
                src={
                  activeButton === 'myactivity' ? settingIcon : graySettingIcon
                }
                alt="내 체험 관리 아이콘"
              />
              <p>내 체험 관리</p>
            </button>
            <button
              className={`${sideNavBtnStyle} ${
                activeButton === 'calendar'
                  ? 'bg-var-green1 rounded-[12px] text-var-black dark:bg-var-dark4'
                  : 'text-var-gray6'
              }`}
              onClick={() => handleBtnClick('calendar')}
            >
              <Image
                src={
                  activeButton === 'calendar' ? calendarIcon : grayCalendarIcon
                }
                alt="예약 현황 아이콘"
              />
              <p>예약 현황</p>
            </button>
          </div>
        </div>
      </div>
    )
  );
}
