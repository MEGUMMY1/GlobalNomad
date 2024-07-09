import Image from 'next/image';
import grayCalendarIcon from '@/public/icon/gray-calendar-check-outline.svg';
import graySettingIcon from '@/public/icon/gray-cog-outline.svg';
import grayReservationIcon from '@/public/icon/gray-text-box-check-outline.svg';
import grayMyAccountIcon from '@/public/icon/gray-account-check-outline.svg';
import editProfileIcon from '@/public/image/btn.png';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { routePaths } from './SideNavigation.types';
import { apiMyInfo } from '@/pages/api/users/apiUsers';
import profileThumbnail from '@/public/image/profile-circle-icon-512x512-zxne30hp.png';
import useUploadProfile from '@/hooks/useUploadProfile';
import useEditMyInfo from '@/hooks/useEditMyInfo';
import { ProfileImageResponse } from '@/pages/api/users/apiUser.types';

interface SidenNavigationMobileProps {
  onNavigate: (section: string) => void;
}

export default function SidenNavigationMobile({
  onNavigate,
}: SidenNavigationMobileProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const buttonPaths: routePaths = {
    mypage: '/mypage',
    reservation: '/reservation',
    setting: '/setting',
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
    apiMyInfo()
      .then((response) => {
        setProfileImageUrl(response.profileImageUrl);
      })
      .catch((error) => {
        console.error('데이터를 불러오는데 실패하였습니다.:', error);
      });
  }, []);

  const handleBtnClick = (section: string) => {
    setActiveSection(section);
    onNavigate(section);
  };

  const sideNavBtnStyle = `font-bold flex gap-[8px] h-[44px] w-fill items-center pl-[16px] text-[16px] text-var-gray6 `;

  return (
    <div className="w-[344px] h-[432px] p-[24px] flex flex-col rounded-[12px] border border-solid border-var-gray3 justify-center gap-[24px]  ">
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
            className="w-[44px] h-[44px] absolute bottom-[-5px] right-[75px]"
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
          className={sideNavBtnStyle}
          onClick={() => handleBtnClick('mypage')}
        >
          <Image src={grayMyAccountIcon} alt="내 정보 아이콘" />
          <p>내 정보</p>
        </button>
        <button
          className={sideNavBtnStyle}
          onClick={() => handleBtnClick('reservation')}
        >
          <Image src={grayReservationIcon} alt="예약 내역 아이콘" />
          <p>예약 내역</p>
        </button>
        <button
          className={sideNavBtnStyle}
          onClick={() => handleBtnClick('setting')}
        >
          <Image src={graySettingIcon} alt="내 체험 관리 아이콘" />
          <p>내 체험 관리</p>
        </button>
        <button
          className={sideNavBtnStyle}
          onClick={() => handleBtnClick('calendar')}
        >
          <Image src={grayCalendarIcon} alt="예약 현황 아이콘" />
          <p>예약 현황</p>
        </button>
      </div>
    </div>
  );
}
