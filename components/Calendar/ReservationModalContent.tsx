import React, { useState } from 'react';
import ModalTabs from './ModalTabs';
import Image from 'next/image';
import Down from '@/public/icon/chevron_down.svg';
import Up from '@/public/icon/chevron_up.svg';
import CheckMark from '@/public/icon/Checkmark.svg';
import Spinner from '../Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import {
  getMyDateScheduleParams,
  getMyTimeScheduleParams,
} from '@/pages/api/myActivities/apimyActivities.types';
import {
  getMyDateSchedule,
  getMyTimeSchedule,
} from '@/pages/api/myActivities/apimyActivities';
import { ReservationModalContentProps } from './Calendar.types';
import useClickOutside from '@/hooks/useClickOutside';

export const useMyDateSchedule = (params: getMyDateScheduleParams) => {
  return useQuery({
    queryKey: ['myDateSchedule', params],
    queryFn: () => getMyDateSchedule(params),
  });
};

export const useMyTimeSchedule = (params: getMyTimeScheduleParams) => {
  return useQuery({
    queryKey: ['myTimeSchedule', params],
    queryFn: () => getMyTimeSchedule(params),
  });
};

const ReservationDateTime: React.FC<ReservationModalContentProps> = ({
  selectedDate,
  activityId,
  onSelectTime,
}) => {
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownElement = useClickOutside<HTMLDivElement>(() =>
    setIsOpen(false)
  );

  const handleTimeChange = (time: string, scheduleId: number) => {
    setSelectedTime(time);
    setIsOpen(false);
    onSelectTime(scheduleId);
  };
  const { data: dateSchedule, isLoading: isDateScheduleLoading } =
    useMyDateSchedule({
      activityId,
      date: selectedDate.toISOString().split('T')[0],
    });

  if (isDateScheduleLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="mb-4 flex flex-col">
        <span className="font-bold">예약 날짜</span>
        <span>
          {selectedDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>
      <div className="relative mb-4" ref={dropDownElement}>
        <div
          className={`w-full h-[56px] border-solid border border-gray-300 rounded flex items-center px-4 text-base font-medium bg-white cursor-pointer ${selectedTime ? 'text-black' : 'text-gray-500'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedTime || '시간을 선택하세요'}
          <Image
            src={isOpen ? Up : Down}
            alt="화살표 아이콘"
            width={24}
            height={24}
            className="absolute right-2 top-4"
          />
        </div>
        {isOpen && (
          <ul className="z-10 p-2 w-full absolute bg-white border border-solid border-gray-300 rounded-md mt-1 shadow-lg animate-slideDown flex flex-col">
            {dateSchedule?.map((schedule) => {
              const timeRange = `${schedule.startTime}~${schedule.endTime}`;
              return (
                <li
                  key={schedule.scheduleId}
                  className={`p-2 h-[40px] hover:bg-gray-200 ${selectedTime === timeRange ? 'bg-black text-white' : 'bg-white text-black'} rounded-md cursor-pointer flex items-center`}
                  onClick={() =>
                    handleTimeChange(timeRange, schedule.scheduleId)
                  }
                >
                  {selectedTime === timeRange ? (
                    <Image
                      src={CheckMark}
                      alt="체크 마크 아이콘"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                  ) : (
                    <div className="w-[20px] mr-2" />
                  )}
                  {timeRange}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

const ApplicationList: React.FC<{
  activityId: number;
  scheduleId: number;
  status: string;
}> = ({ activityId, scheduleId, status }) => {
  const { data: timeSchedule, isLoading: isTimeScheduleLoading } =
    useMyTimeSchedule({
      activityId,
      scheduleId,
      status,
    });

  if (isTimeScheduleLoading) {
    return <Spinner />;
  }

  return (
    <>
      <span className="font-bold">예약 내역</span>
      <div className="mt-2">
        {timeSchedule?.reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="flex h-[115px] p-4 items-start border border-solid border-var-gray3 rounded"
          >
            <div className="flex flex-col justify-start mr-auto">
              <div className="flex gap-2">
                <p className="text-var-gray7">닉네임</p>
                <p>{reservation.nickname}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-var-gray7">인원</p>
                <p>{reservation.headCount}명</p>
              </div>
            </div>
            <div className="flex justify-end items-end">
              {status === 'pending' && (
                <>
                  <button className="mr-2 px-2 py-1 bg-green-500 text-white rounded">
                    승인하기
                  </button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded">
                    거절하기
                  </button>
                </>
              )}
              {status === 'confirmed' && (
                <button className="px-2 py-1 bg-gray-500 text-white rounded">
                  취소하기
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const ReservationModalContent: React.FC<ReservationModalContentProps> = ({
  selectedDate,
  activityId,
}) => {
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null
  );

  const handleSelectTime = (scheduleId: number) => {
    setSelectedScheduleId(scheduleId);
  };

  return (
    <div>
      <ModalTabs labels={['신청', '승인', '거절']}>
        <div>
          <ReservationDateTime
            selectedDate={selectedDate}
            activityId={activityId}
            onSelectTime={handleSelectTime}
          />
          {selectedScheduleId && (
            <ApplicationList
              activityId={activityId}
              scheduleId={selectedScheduleId}
              status="pending"
            />
          )}
        </div>
        <div>
          <ReservationDateTime
            selectedDate={selectedDate}
            activityId={activityId}
            onSelectTime={handleSelectTime}
          />
          {selectedScheduleId && (
            <ApplicationList
              activityId={activityId}
              scheduleId={selectedScheduleId}
              status="confirmed"
            />
          )}
        </div>
        <div>
          <ReservationDateTime
            selectedDate={selectedDate}
            activityId={activityId}
            onSelectTime={handleSelectTime}
          />
          {selectedScheduleId && (
            <ApplicationList
              activityId={activityId}
              scheduleId={selectedScheduleId}
              status="declined"
            />
          )}
        </div>
      </ModalTabs>
    </div>
  );
};

export default ReservationModalContent;
