import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/icon/logo_small.svg';
import notificationIcon from '@/public/icon/icon_notification.svg';
import { useUserData } from '@/hooks/useUserData';
import { useEffect, useState } from 'react';
import NavigationDropdown from '../NavigationDropdown/NavigationDropdown';
import useClickOutside from '@/hooks/useClickOutside';
import useGetNotification from '@/hooks/useGetNotification';
import NotificationDropdown from '../NavigationDropdown/NotificationDropdown';
import useLoginState from '@/hooks/useLoginState';
import Spinner from '../Spinner/Spinner';
import profileThumbnail from '@/public/image/profile-circle-icon-512x512-zxne30hp.png';

export default function NavigationBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is already enabled in the user's preference
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDark);
    if (isDark) {
      document.body.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  const { userData, isLoading } = useUserData();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { isLoggedIn } = useLoginState();
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const { data, isNotifyCountLoading } = useGetNotification({
    cursorId: 0,
    size: 2,
  });

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
    <div className="sticky top-0 flex h-[70px] z-30 justify-between pl-[369px] pr-[351px] t:px-[24px] m:px-[24px]  border-b bg-white border-var-gray3 border-solid ">
      <div className="flex items-center">
        <Link href="/">
          <Image src={Logo} alt="로고 아이콘" />
        </Link>
      </div>
      {isLoggedIn ? (
        <div className="flex items-center gap-[15px]">
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="h-10 w-10 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-300"
            >
              {isDarkMode ? (
                <svg
                  className="fill-yellow-500 block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="fill-violet-700 block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              )}
            </button>
          </div>
          <button onClick={toggleNotifyDropdown}>
            <div className="relative">
              <Image src={notificationIcon} alt="알림 아이콘" />
              {data?.totalCount !== undefined && data?.totalCount > 0 && (
                <span className="flex justify-center absolute -top-2 -right-2 bg-red-500 w-[15px] h-[15px] text-white text-xs rounded-full px-2">
                  {data.totalCount}
                </span>
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
            className="flex relative items-center gap-[10px] border-l-2 cursor-pointer border-var-gray3 border-solid pl-[25px] m:pl-[12px]"
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
                className="h-[32px] w-[32px] rounded-full bg-var-gray3"
                alt="유저 프로필사진"
              />
            )}
            <p className="text-[14px]">{userData.nickname}</p>
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
