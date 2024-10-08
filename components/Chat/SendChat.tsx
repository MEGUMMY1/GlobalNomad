import Image from 'next/image';
import { darkModeState } from '@/states/themeState';
import { useRecoilValue } from 'recoil';
import socket from '@/server/server';
import { useUserData } from '@/hooks/useUserData';
import { useState } from 'react';
import ChatPopup from '../Popup/ChatPopup';
import { SendChatProps } from './SendChat.types';

function SendChat({
  receiver,
  activityId,
  activityTitle,
  activityImage,
}: SendChatProps) {
  const isDarkMode = useRecoilValue(darkModeState);
  const { userData } = useUserData();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  if (!socket.connected) {
    socket.connect();
  }

  socket.on('connect', () => {
    console.log('connection server');
  });

  const handleClick = () => {
    socket.emit(
      'inquiry',
      userData.id,
      receiver,
      activityId,
      userData.nickname,
      userData.profileImageUrl,
      (res: any) => {
        console.log('login res: ', res);
      }
    );
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <button type="button" onClick={handleClick} className="w-[34px] h-[34px]">
        <Image
          src={isDarkMode ? '/icon/live_help_gray.svg' : '/icon/live_help.svg'}
          alt="채팅 아이콘"
          width={34}
          height={34}
        />
      </button>
      {isPopupOpen && (
        <ChatPopup
          closePopup={closePopup}
          activityId={activityId}
          activityTitle={activityTitle}
          activityImage={activityImage}
        />
      )}
    </>
  );
}

export default SendChat;
