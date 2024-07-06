import Image from 'next/image';
import testImg from '@/public/image/VR 게임 마스터 하는 법.png';
import calendarIcon from '@/public/icon/calendar_check_outline.svg';
import settingIcon from '@/public/icon/cog_outline.svg';
import reservationIcon from '@/public/icon/text_box_check_outline.svg';
import myAccountIcon from '@/public/icon/account_check_outline.svg';
import grayCalendarIcon from '@/public/icon/gray-calendar-check-outline.svg';
import graySettingIcon from '@/public/icon/gray-cog-outline.svg';
import grayReservationIcon from '@/public/icon/gray-text-box-check-outline.svg';
import grayMyAccountIcon from '@/public/icon/gray-account-check-outline.svg';
import editProfileIcon from '@/public/image/btn.png';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { routePaths } from './SideNavigation.types';

export default function SidenNavigation() {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<string | null>('myAccount');

  const buttonPaths: routePaths = {
    reservation: '/reservation',
    setting: '/setting',
    calendar: '/calendar',
  };

  const handleBtnClick = (buttonName: string | null) => {
    setActiveButton((prevActiveButton) =>
      prevActiveButton === buttonName ? prevActiveButton : buttonName
    );

    if (buttonName && buttonPaths[buttonName]) {
      router.push(buttonPaths[buttonName]);
    }
  };

  const sideNavBtnStyle = `font-bold flex gap-[8px] h-[44px] w-fill items-center pl-[16px] text-[16px] `;

  return (
    <div className="w-[384px] h-[432px] p-[24px] flex flex-col rounded-[12px] border border-solid border-var-gray3 justify-center gap-[24px] t:w-[251px] m:w-[344px]">
      <div className="w-fill flex justify-center relative">
        <Image
          src={testImg}
          className="rounded-full w-[160px] h-[160px] "
          alt="유저 프로필 사진"
        />
        <Image
          src={editProfileIcon}
          className="w-[44px] h-[44px] absolute bottom-[-5px] right-[100px] t:right-[30px] m:right-[75px]"
          alt="유저 프로필 사진 수정"
        />
      </div>
      <div className="flex flex-col gap-[8px] justify-between">
        <button
          className={`${sideNavBtnStyle} ${
            activeButton === 'myAccount'
              ? 'bg-var-green1 rounded-[12px] text-var-black'
              : 'text-var-gray6'
          }`}
          onClick={() => handleBtnClick('myAccount')}
        >
          <Image
            src={
              activeButton === 'myAccount' ? myAccountIcon : grayMyAccountIcon
            }
            alt="내 정보 아이콘"
          />
          <p>내 정보</p>
        </button>
        <button
          className={`${sideNavBtnStyle} ${
            activeButton === 'reservation'
              ? 'bg-var-green1 rounded-[12px]  text-var-black'
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
            activeButton === 'setting'
              ? 'bg-var-green1 rounded-[12px] text-var-black'
              : 'text-var-gray6'
          }`}
          onClick={() => handleBtnClick('setting')}
        >
          <Image
            src={activeButton === 'setting' ? settingIcon : graySettingIcon}
            alt="내 체험 관리 아이콘"
          />
          <p>내 체험 관리</p>
        </button>
        <button
          className={`${sideNavBtnStyle} ${
            activeButton === 'calendar'
              ? 'bg-var-green1 rounded-[12px] text-var-black'
              : 'text-var-gray6'
          }`}
          onClick={() => handleBtnClick('calendar')}
        >
          <Image
            src={activeButton === 'calendar' ? calendarIcon : grayCalendarIcon}
            alt="예약 현황 아이콘"
          />
          <p>예약 현황</p>
        </button>
      </div>
    </div>
  );
}
