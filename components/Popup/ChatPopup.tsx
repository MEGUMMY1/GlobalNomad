import { useState, useEffect } from 'react';
import {
  ChatListProps,
  ChatPopupProps,
  ChatRoomPopupProps,
  ChatRoomProps,
} from './ChatPopup.types';
import socket from '@/server/server';
import { useUserData } from '@/hooks/useUserData';
import Image from 'next/image';

function ChatPopup({
  closePopup,
  activityId,
  activityTitle,
  activityImage,
  isAdmin = false,
}: ChatPopupProps) {
  const [message, setMessage] = useState('');
  const [senderId, setSenderId] = useState(0);
  const [nickname, setNickName] = useState('문의 하기');
  const [profile, setProfile] = useState(activityImage);
  const [isSendEnabled, setIsSendEnabled] = useState(true);
  const [isEnter, setIsEnter] = useState(false);

  const handleClickPrev = () => {
    setIsEnter(false);
    setIsSendEnabled(false);
    setNickName('문의 내역');
    setProfile(activityImage);
  };

  const sendMessage = (event: any) => {
    event.preventDefault();
    if (message === '') return;
    if (isAdmin) {
      socket.emit(
        'sendMessageAdmin',
        activityId,
        message,
        senderId,
        (res: any) => {
          console.log('sendMessage admin res', res);
        }
      );
    } else {
      socket.emit('sendMessage', activityId, message, (res: any) => {
        console.log('sendMessage res', res);
      });
    }
    setMessage('');
    socket.off('sendMessageAdmin');
    socket.off('sendMessage');
  };

  useEffect(() => {
    setIsSendEnabled(!isAdmin);
    if (isAdmin) {
      setNickName('문의 내역');
    }
  }, []);

  return (
    <div className="flex items-center justify-center fixed w-[400px] bottom-[30px] right-[30px] z-50 m:inset-0 m:w-full m:bg-black m:bg-opacity-70">
      <div className="flex flex-col bg-var-gray2 w-full rounded-[20px] dark:bg-var-dark2 dark:border-4 dark:border-solid dark:border-var-dark3">
        <div className="flex justify-between h-[64px] pt-[10px] pb-[3px] px-[20px] items-center bg-var-gray3 rounded-t-[15px] dark:bg-var-dark3">
          <div className="flex gap-[10px]">
            <div className="w-[40px] h-[40px] rounded-full">
              <Image
                src={profile}
                alt="프로필"
                width={40}
                height={40}
                className="w-[40px] h-[40px] rounded-full"
              />
            </div>
            <div>
              <p className="font-[500] line-clamp-1">{activityTitle}</p>
              <p className="text-var-gray6">{`@${nickname}`}</p>
            </div>
          </div>

          <div className="flex items-center h-[30px]">
            {isEnter && (
              <button onClick={handleClickPrev}>
                <Image
                  src="/icon/prev_arrow.svg"
                  alt="이전"
                  width={20}
                  height={20}
                />
              </button>
            )}
            <button onClick={closePopup}>
              <Image
                src="/icon/chat_close.svg"
                alt="닫기"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col h-[500px]">
          {isAdmin ? (
            <ShowChatRoomList
              activityId={activityId}
              handleSenderId={setSenderId}
              handleSendEnable={setIsSendEnabled}
              isEnter={isEnter}
              handleIsEnter={setIsEnter}
              handleNickName={setNickName}
              handleProfile={setProfile}
            />
          ) : (
            <ShowChatList />
          )}
          {isSendEnabled ? (
            <div className="pb-[10px] px-[20px] h-[50px]">
              <form onSubmit={sendMessage} className="flex justify-between">
                <input
                  type="text"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="메시지 입력"
                  className="w-[70%] h-[30px] rounded-[10px] p-[5px] pl-[10px]"
                />
                <button className="bg-nomad-black text-white w-[25%] rounded-[5px]">
                  전송
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ShowChatRoomList({
  activityId,
  handleSenderId,
  handleSendEnable,
  isEnter,
  handleIsEnter,
  handleNickName,
  handleProfile,
}: ChatRoomPopupProps) {
  const [rooms, setRooms] = useState<ChatRoomProps[]>([]);
  const { userData } = useUserData();

  const handleClickRoom = (userId: number, index: number) => {
    socket.emit('inquiryAdmin', userData.id, activityId, userId, (res: any) => {
      console.log('inquiryAdmin res', res);
    });
    handleIsEnter(true);
    handleSenderId(userId);
    handleSendEnable(true);
    handleNickName(rooms[index].user.name);
    handleProfile(rooms[index].user.profile);
  };

  useEffect(() => {
    const handleRoomList = (res: ChatRoomProps[]) => {
      console.log(res);
      setRooms(res);
    };

    socket.on('roomList', handleRoomList);

    // 컴포넌트 언마운트 시 핸들러 제거
    return () => {
      socket.off('roomList', handleRoomList);
    };
  }, []);

  return (
    <>
      {isEnter && <ShowChatList isAdmin />}
      {!isEnter &&
        (rooms.length > 0 ? (
          <div className="flex flex-col py-[10px]">
            {rooms.map((room, index) => (
              <div key={room.user.id} className="flex justify-center">
                <button
                  type="button"
                  onClick={() => handleClickRoom(room.user.id, index)}
                  className={`flex items-center gap-[15px] p-[15px] h-[75px] bg-var-gray2 w-full max-w-[400px] border-b border-solid border-b-var-gray4 dark:bg-var-dark2`}
                >
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                    <Image
                      src={room.user.profile}
                      alt="프로필 이미지"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="font-[500] text-nomad-black dark:text-var-gray2">
                      {room.user.name}
                    </div>
                    <div className="text-var-gray6">
                      {room.message[room.message.length - 1]}
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-[20px]">
            <p>아직 문의 채팅이 없습니다.</p>
          </div>
        ))}
    </>
  );
}

function ShowChatList({ isAdmin = false }: ChatListProps) {
  const [received, setReceived] = useState<string[]>([]);
  const [sender, setSender] = useState<string[]>([]);

  useEffect(() => {
    // 이전 메시지를 받는 이벤트 핸들러
    socket.on('prevMessage', (prevChat) => {
      if (prevChat) {
        setReceived(prevChat.message);
        setSender(prevChat.sender);
      }
    });

    // 새로운 메시지를 받는 이벤트 핸들러
    socket.on('message', (chat) => {
      console.log(chat);
      setReceived(chat.message);
      setSender(chat.sender);
    });

    // 컴포넌트가 언마운트될 때 이벤트 핸들러 제거
    return () => {
      socket.off('prevMessage');
      socket.off('message');
    };
  }, []);

  return (
    <div className="flex flex-col gap-[12px] px-[20px] py-[20px] w-full h-full overflow-y-auto">
      {received &&
        received.map((message, index) => (
          <div
            key={'message' + index}
            className={`flex ${isAdmin ? (sender[index] === 'admin' ? 'justify-end' : 'justify-start') : sender[index] === 'user' ? 'justify-end' : 'justify-start'} `}
          >
            <div
              className={`inline-block max-w-max rounded-[10px] p-[8px] pl-[10px] ${
                sender[index] === 'user'
                  ? 'bg-var-green2 text-white'
                  : 'bg-var-gray3 text-var-dark1'
              }`}
            >
              {message}
            </div>
          </div>
        ))}
    </div>
  );
}

export default ChatPopup;
