import { useState } from 'react';
import { CloseButtonBold } from '../Button/Button';
import { ClosePopupProps } from './Popup.types';
import socket from '@/server/server';

function ChatPopup({ closePopup }: ClosePopupProps) {
  const [message, setMessage] = useState('');

  const sendMessage = (event: any) => {
    event.preventDefault();
    socket.emit('sendMessage', message, (res: any) => {
      console.log('sendMessage res', res);
    });
    setMessage('');
  };

  return (
    <div className="flex items-center justify-center fixed top-[250px] t:top-[200px] m:top-[210px] right-[56px] w-[400px] z-50">
      <div className="flex flex-col bg-var-gray2 w-full rounded-[20px]">
        <div className="flex justify-between pt-[10px] px-[20px] items-center">
          <p>문의 채팅</p>
          <div className="flex items-center h-[30px]">
            <CloseButtonBold onClick={closePopup} />
          </div>
        </div>
        <div className="flex flex-col h-[500px]">
          <ShowChatList />
          <div className="pb-[10px] px-[20px] h-[50px]">
            <form onSubmit={sendMessage} className="flex justify-between">
              <input
                type="text"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지 입력"
                className="w-[70%]"
              />
              <button className="bg-nomad-black text-white w-[25%]">
                전송
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShowChatList() {
  const [received, setReceived] = useState<string[]>([]);

  socket.on('message', (message) => {
    setReceived([...received, message.chat]);
  });

  return (
    <div className="px-[20px] py-[20px] w-full h-full">
      {received.map((message, index) => (
        <p key={'message' + index}>{message}</p>
      ))}
    </div>
  );
}

export default ChatPopup;
