import Image from 'next/image';
import calendarIcon from '@/public/icon/calendar_check_outline.svg';
import settingIcon from '@/public/icon/cog_outline.svg';
import reservationIcon from '@/public/icon/text_box_check_outline.svg';
import myAccountIcon from '@/public/icon/account_check_outline.svg';
import grayCalendarIcon from '@/public/icon/gray-calendar-check-outline.svg';
import graySettingIcon from '@/public/icon/gray-cog-outline.svg';
import grayReservationIcon from '@/public/icon/gray-text-box-check-outline.svg';
import grayMyAccountIcon from '@/public/icon/gray-account-check-outline.svg';
import editProfileIcon from '@/public/image/btn.png';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { routePaths } from './SideNavigation.types';
import profileThumbnail from '@/public/image/profile-circle-icon-512x512-zxne30hp.png';
import useUploadProfile from '@/hooks/useUploadProfile';
import useEditMyInfo from '@/hooks/useEditMyInfo';
import { ProfileImageResponse } from '@/pages/api/users/apiUser.types';
import { useUserData } from '@/hooks/useUserData';
import Spinner from '../Spinner/Spinner';

export default function SidenNavigation() {
  const router = useRouter();
  const { userData, isLoading } = useUserData();
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(
    userData?.profileImageUrl
  );
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
  const { postProfileImgMutation } = useUploadProfile();
  const { postMyInfoMutation } = useEditMyInfo();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      postProfileImgMutation.mutate(formData, {
        onSuccess: (response: ProfileImageResponse) => {
          setProfileImageUrl(response.profileImageUrl);
          postMyInfoMutation.mutate({
            profileImageUrl: response.profileImageUrl,
          });
        },
        onError: (error) => {
          console.error('데이터를 불러오는데 실패했습니다.', error);
        },
      });
    }
  };

  useEffect(() => {
    if (userData?.profileImageUrl) {
      setProfileImageUrl(userData.profileImageUrl);
    }
  }, [userData?.profileImageUrl]);

  const handleBtnClick = (buttonName: string | null) => {
    setActiveButton((prevActiveButton) =>
      prevActiveButton === buttonName ? prevActiveButton : buttonName
    );

    if (buttonName && buttonPaths[buttonName]) {
      router.push(buttonPaths[buttonName]);
    }
  };

  const sideNavBtnStyle = `font-bold flex gap-[8px] h-[44px] w-fill items-center pl-[16px] text-[16px] `;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-[384px] h-[432px] p-[24px] flex flex-col rounded-[12px] border border-solid border-var-gray3 bg-white justify-center gap-[24px] t:w-[251px]">
      <div className="w-fill flex justify-center relative">
        <label htmlFor="upload-image" className="cursor-pointer">
          <Image
            src={profileImageUrl ? profileImageUrl : profileThumbnail}
            width={160}
            height={160}
            className="rounded-full w-[160px] h-[160px] "
            alt="유저 프로필 사진"
          />
          <Image
            src={editProfileIcon}
            className="w-[44px] h-[44px] absolute bottom-[-5px] right-[100px] t:right-[30px] "
            alt="유저 프로필 사진 수정"
          />
          <input
            id="upload-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="flex flex-col gap-[8px]  justify-between">
        <button
          className={`${sideNavBtnStyle} ${
            activeButton === 'mypage'
              ? 'bg-var-green1  rounded-[12px] text-var-black'
              : 'text-var-gray6'
          }`}
          onClick={() => handleBtnClick('mypage')}
        >
          <Image
            src={activeButton === 'mypage' ? myAccountIcon : grayMyAccountIcon}
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
            activeButton === 'myactivity'
              ? 'bg-var-green1 rounded-[12px] text-var-black'
              : 'text-var-gray6'
          }`}
          onClick={() => handleBtnClick('myactivity')}
        >
          <Image
            src={activeButton === 'myactivity' ? settingIcon : graySettingIcon}
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
