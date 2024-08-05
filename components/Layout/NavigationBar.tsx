import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/icon/logo_small.svg';
import darkLogo from '@/public/icon/dark_logo_small.svg';
import notificationIcon from '@/public/icon/icon_notification.svg';
import { useUserData } from '@/hooks/useUserData';
import { useState } from 'react';
import NavigationDropdown from '../NavigationDropdown/NavigationDropdown';
import useClickOutside from '@/hooks/useClickOutside';
import useGetNotification from '@/hooks/useGetNotification';
import NotificationDropdown from '../NavigationDropdown/NotificationDropdown';
import useLoginState from '@/hooks/Auth/useLoginState';
import Spinner from '../Spinner/Spinner';
import profileThumbnail from '@/public/image/profile-circle-icon-512x512-zxne30hp.png';
import { useRecoilState } from 'recoil';
import { darkModeState } from '@/states/themeState';

export default function NavigationBar() {
  const { userData, isLoading } = useUserData();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { isLoggedIn } = useLoginState();
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const { data, isNotifyCountLoading } = useGetNotification({
    cursorId: 0,
    size: 2,
  });
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleNotifyDropdown = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };
  const closeProfileDropdown = () => {
    setIsDropdownOpen(false);
  };
  const closeNotificationDropdown = () => {
    setIsNotificationOpen(false);
  };

  const profiledropdownRef =
    useClickOutside<HTMLDivElement>(closeProfileDropdown);
  const notificationdropdownRef = useClickOutside<HTMLDivElement>(
    closeNotificationDropdown
  );

  if (isLoading || isNotifyCountLoading) {
    return <Spinner />;
  }

  return (
    <div className="sticky top-0 flex h-[70px] justify-center items-center z-50 px-[24px] t:px-[24px] m:px-[24px] border-b border-solid border-var-gray3 bg-var-gray1 dark:bg-var-dark1 dark:border-var-dark1">
      <div className="w-[1200px] flex justify-between items-center ">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={darkMode ? darkLogo : Logo}
              alt="로고 아이콘"
              className="m:w-[120px]"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            name="checkbox"
            className="switch"
            onChange={handleDarkModeChange}
            checked={darkMode}
          />
          {isLoggedIn ? (
            <div className="flex items-center justify-center gap-2">
              <button onClick={toggleNotifyDropdown} className="relative">
                <Image
                  src={notificationIcon}
                  width={25}
                  height={25}
                  alt="알림 아이콘"
                />
                <div>
                  {data?.totalCount !== undefined && data?.totalCount > 0 && (
                    <div className="absolute top-[-7px] right-[-5px] flex items-center justify-center  bg-red-500 w-[15px] h-[15px] text-white text-[12px] rounded-full">
                      <p className="dark:translate-x-[-0.2px] dark:translate-y-[-0.6px]">
                        {data.totalCount}
                      </p>
                    </div>
                  )}
                </div>
              </button>
              <div ref={notificationdropdownRef}>
                {isNotificationOpen && (
                  <NotificationDropdown
                    data={data}
                    onClick={toggleNotifyDropdown}
                  />
                )}
              </div>
              <div
                className="flex relative items-center gap-4 m:gap-1 border-l-2 cursor-pointer border-var-gray3 border-solid pl-4 m:pl-2"
                ref={profiledropdownRef}
                onClick={toggleDropdown}
              >
                {isDropdownOpen && <NavigationDropdown />}
                {userData && (
                  <Image
                    src={
                      userData.profileImageUrl
                        ? userData.profileImageUrl
                        : profileThumbnail
                    }
                    width={32}
                    height={32}
                    className="h-[32px] w-[32px] rounded-full bg-var-gray3 object-cover"
                    alt="유저 프로필사진"
                  />
                )}
                <p className="text-[14px]">{userData.nickname}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-[14px]">
                로그인
              </Link>
              <Link href="/signup" className="text-[14px]">
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
