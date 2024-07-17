import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Down from '@/public/icon/chevron_down.svg';
import Up from '@/public/icon/chevron_up.svg';
import CheckMark from '@/public/icon/Checkmark.svg';
import {
  getMyDateSchedule,
  getMyTimeSchedule,
  updataMyReservation,
} from '@/pages/api/myActivities/apimyActivities';
import {
  getMyDateScheduleParams,
  getMyDateScheduleResponse,
  getMyTimeScheduleParams,
  updataMyReservationParams,
} from '@/pages/api/myActivities/apimyActivities.types';
import useClickOutside from '@/hooks/useClickOutside';
import ModalTabs from './ModalTabs';
import { PrimaryButton } from '../Button/Button';

const useMyDateSchedule = (params: getMyDateScheduleParams) => {
  return useQuery({
    queryKey: ['myDateSchedule', params],
    queryFn: () => getMyDateSchedule(params),
  });
};

const useMyTimeSchedule = (params: getMyTimeScheduleParams) => {
  return useQuery({
    queryKey: ['myTimeSchedule', params],
    queryFn: () => getMyTimeSchedule(params),
    enabled: !!params.scheduleId,
  });
};

const ReservationDateTime: React.FC<{
  selectedDate: Date;
  activityId: number;
  onSelectTime: (scheduleId: number) => void;
}> = ({ selectedDate, activityId, onSelectTime }) => {
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

  const { data: dateSchedule } = useMyDateSchedule({
    activityId,
    date: selectedDate.toISOString().split('T')[0],
  });

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
            {dateSchedule?.length === 0 ? (
              <li className="p-2 h-[40px] flex items-center justify-center text-gray-500">
                예약이 없습니다.
              </li>
            ) : (
              dateSchedule?.map((schedule: getMyDateScheduleResponse) => {
                const timeRange = `${schedule.startTime} ~ ${schedule.endTime}`;
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
              })
            )}
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
  const {
    data: timeSchedule,
    isLoading: isTimeScheduleLoading,
    refetch,
  } = useMyTimeSchedule({
    activityId,
    scheduleId,
    status,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      reservationId,
      status,
    }: {
      reservationId: number;
      status: updataMyReservationParams['status'];
    }) => {
      await updataMyReservation(activityId, reservationId, { status });
      if (status === 'confirmed') {
        const reservations = timeSchedule?.reservations.filter(
          (reservation) => reservation.id !== reservationId
        );
        if (reservations) {
          await Promise.all(
            reservations.map((reservation) =>
              updataMyReservation(activityId, reservation.id, {
                status: 'declined',
              })
            )
          );
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myReservations', activityId],
      });
      refetch();
    },
    onError: (error) => {
      console.error('Error updating reservation:', error);
    },
  });

  const handleReservation = (
    reservationId: number,
    newStatus: 'pending' | 'confirmed' | 'declined'
  ) => {
    mutation.mutate({ reservationId, status: newStatus });
  };

  useEffect(() => {
    if (!isTimeScheduleLoading) {
      refetch();
    }
  }, [mutation.isSuccess, isTimeScheduleLoading, refetch]);

  return (
    <>
      <span className="font-bold">예약 내역</span>
      <div className="mt-2 p:h-[250px] t:h-[250px] m:h-1/2 overflow-auto ">
        {timeSchedule?.reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="flex p-4 mb-2 border border-solid border-var-gray3 rounded"
          >
            <div className="w-full flex m:flex-col justify-between">
              <div>
                <div className="flex flex-col mr-auto">
                  <div className="flex gap-2 items-center">
                    <p className="text-var-gray7 m:text-sm">닉네임</p>
                    <p>{reservation.nickname}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="text-var-gray7 m:text-sm">인원</p>
                    <p>{reservation.headCount}명</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center justify-center m:justify-end">
                {reservation.status === 'pending' && (
                  <>
                    <button
                      className="w-[82px] h-[38px] bg-nomad-black text-white rounded-md text-sm font-bold"
                      onClick={() =>
                        handleReservation(reservation.id, 'confirmed')
                      }
                    >
                      승인하기
                    </button>
                    <button
                      className="w-[82px] h-[38px] bg-white text-nomad-black border border-nomad-black rounded-md text-sm font-bold"
                      onClick={() =>
                        handleReservation(reservation.id, 'declined')
                      }
                    >
                      거절하기
                    </button>
                  </>
                )}
                {reservation.status === 'confirmed' && (
                  <div className="w-[85px] h-[40px] flex items-center justify-center font-bold text-sm rounded-3xl bg-var-orange1 text-var-orange2">
                    예약 승인
                  </div>
                )}
                {reservation.status === 'declined' && (
                  <div className="w-[85px] h-[40px] flex items-center justify-center font-bold text-sm rounded-3xl bg-var-red1 text-var-red2">
                    예약 거절
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const ReservationModalContent: React.FC<{
  selectedDate: Date;
  activityId: number;
}> = ({ selectedDate, activityId }) => {
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null
  );
  const [pendingCount, setPendingCount] = useState(0);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [declinedCount, setDeclinedCount] = useState(0);

  const handleSelectTime = (scheduleId: number) => {
    setSelectedScheduleId(scheduleId);
  };

  const { data: pendingData, refetch: refetchPending } = useMyTimeSchedule({
    activityId,
    scheduleId: selectedScheduleId || 0,
    status: 'pending',
  });

  const { data: confirmedData, refetch: refetchConfirmed } = useMyTimeSchedule({
    activityId,
    scheduleId: selectedScheduleId || 0,
    status: 'confirmed',
  });

  const { data: declinedData, refetch: refetchDeclined } = useMyTimeSchedule({
    activityId,
    scheduleId: selectedScheduleId || 0,
    status: 'declined',
  });

  useEffect(() => {
    if (selectedScheduleId) {
      refetchPending();
      refetchConfirmed();
      refetchDeclined();
    }
  }, [selectedScheduleId, refetchPending, refetchConfirmed, refetchDeclined]);

  useEffect(() => {
    setPendingCount(pendingData?.reservations.length || 0);
    setConfirmedCount(confirmedData?.reservations.length || 0);
    setDeclinedCount(declinedData?.reservations.length || 0);
  }, [pendingData, confirmedData, declinedData]);

  return (
    <div>
      <ModalTabs
        labels={[
          `신청(${pendingCount})`,
          `승인(${confirmedCount})`,
          `거절(${declinedCount})`,
        ]}
      >
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
