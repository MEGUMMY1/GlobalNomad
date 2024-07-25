import Image from 'next/image';
import { darkModeState } from '@/states/themeState';
import { useRecoilValue } from 'recoil';
import socket from '@/server/server';
import { useUserData } from '@/hooks/useUserData';
import { useState } from 'react';
import ChatPopup from '../Popup/ChatPopup';
import { SendChatProps } from './SendChat.types';

function SendChat({ writer }: SendChatProps) {
  const isDarkMode = useRecoilValue(darkModeState);
  const { userData } = useUserData();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  socket.on('connect', () => {
    console.log('connection server');
  });

  const handleClick = () => {
    socket.emit('login', userData.email, writer, (res: any) => {
      console.log('login res: ', res);
    });
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        {isDarkMode ? (
          <Image
            src="/icon/live_help_gray.svg"
            alt="채팅 아이콘"
            width={34}
            height={34}
          />
        ) : (
          <Image
            src="/icon/live_help.svg"
            alt="채팅 아이콘"
            width={34}
            height={34}
          />
        )}
      </button>
      {isPopupOpen && <ChatPopup closePopup={closePopup} />}
    </>
  );
}

export default SendChat;
