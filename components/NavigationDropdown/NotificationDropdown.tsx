import { useRouter } from 'next/router';
import { CloseButton } from '../Button/Button';
import { NotificationDropdownProps } from './NotificationDropdown.types';
import { useEffect, useState } from 'react';

export default function NotificationDropdown({
  data,
  onClick,
}: NotificationDropdownProps) {
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([]);

  const handleDelete = (id: number) => {
    // 삭제 로직 추가 예정
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);
  };

  useEffect(() => {
    if (data && data.notifications) {
      setNotifications(data.notifications.slice(0, 2));
    }
  }, [data]);

  const getTimeAgoString = (updatedAt: string): string => {
    const updatedAtUTC = Date.parse(updatedAt);
    const now = new Date();
    const diff = now.getTime() - updatedAtUTC;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}일 전`;
    } else if (hours > 0) {
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      return `${minutes}분 전`;
    } else {
      return `방금 전`;
    }
  };

  return (
    <div className="z-30 px-[20px] pt-[15px] pb-[24px] absolute top-[70px] right-[400px] t:right-[100px] w-[368px] h-[340px] animate-slideDown flex-col justify-center overflow-hidden rounded-md m:w-full m:h-full m:right-0 m:top-0 bg-var-green1 ">
      <div className="flex text-[20px] font-bold mb-[20px] justify-between">
        알림 {data ? `${data.totalCount}` : '0'}개
        <CloseButton onClick={onClick} />
      </div>
      {data && data.notifications.length ? (
        <div className="flex flex-col gap-[8px]">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex-col  items-center px-[12px] py-[16px] justify-between rounded-[5px] border-b w-[328px] h-[120px] w-[335px] h-[105px] bg-white border-gray-200 "
            >
              <div className="flex justify-between">
                승인 아이콘
                <button onClick={() => handleDelete(notification.id)}>
                  삭제
                </button>
              </div>
              <div className="w-[298px] h-[44px]">
                <p>{notification.content}</p>
              </div>
              <p>{getTimeAgoString(notification.updatedAt)}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[245px] bg-white py-[24px] rounded-[5px] m:bg-var-green1 m:px-[20px] m:py-[40px]">
          새로운 알림이 없습니다.
        </div>
      )}
    </div>
  );
}
