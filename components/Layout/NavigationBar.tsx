import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/icon/logo_small.svg';
import notificationIcon from '@/public/icon/icon_notification.svg';
import { useUserData } from '@/hooks/useUserData';
import { useState } from 'react';
import NavigationDropdown from '../NavigationDropdown/NavigationDropdown';
import useClickOutside from '@/hooks/useClickOutside';
import useGetNotification from '@/hooks/useGetNotification';
import NotificationDropdown from '../NavigationDropdown/NotificationDropdown';
import useLoginState from '@/hooks/useLoginState';
import Spinner from '../Spinner/Spinner';

export default function NavigationBar() {
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

  const dropdownRef = useClickOutside<HTMLDivElement>(closeProfileDropdown);

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
        <div className="flex items-center gap-[25px]">
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
          {isNotificationOpen && (
            <NotificationDropdown data={data} onClick={toggleNotifyDropdown} />
          )}
          <div
            className="flex relative items-center gap-[10px] border-l-2 cursor-pointer border-var-gray3 border-solid pl-[25px] m:pl-[12px]"
            ref={dropdownRef}
            onClick={toggleDropdown}
          >
            {isDropdownOpen && <NavigationDropdown />}
            {userData.profileImageUrl ? (
              <Image
                src={userData.profileImageUrl}
                width={32}
                height={32}
                className="h-[32px] w-[32px] rounded-full bg-var-gray3"
                alt="유저 프로필사진"
              />
            ) : (
              <div className="h-[32px] w-[32px] rounded-full bg-var-gray3" />
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
