import React, { useState, useEffect, useCallback } from 'react';
import { format, addDays } from 'date-fns';
import { PrimaryButton } from '@/components/Button/Button';
import { usePopup } from '@/hooks/usePopup';
import { useModal } from '@/hooks/useModal';
import { useRecoilState } from 'recoil';
import { modalState } from '@/states/modalState';
import router from 'next/router';
import ReservationModal from './ReservationModal';
import ParticipantSelector from './ParticipantSelector';
import CustomCalendar from '@/components/CustomCalendar/CustomCalendar';
import { ReservationProps } from './Reservation.types';
import { useMutation } from '@tanstack/react-query';
import { postActivityRequestParams } from '@/pages/api/activities/apiactivities.types';
import { postActivityRequest } from '@/pages/api/activities/apiactivities';
import { AxiosError } from 'axios';

export default function Reservation({ activity }: ReservationProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    addDays(new Date(), 1)
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [participants, setParticipants] = useState(1);
  const [buttonText, setButtonText] = useState('날짜 선택하기');
  const [modal, setModal] = useRecoilState(modalState);

  const pricePerPerson = activity.price;
  const schedules = activity.schedules;
  const { openPopup } = usePopup();
  const { openModal, closeModal } = useModal();

  const getAvailableTimes = useCallback(
    (date: Date | null) => {
      if (!date) return [];
      return schedules
        .filter(
          (schedule) =>
            format(new Date(schedule.date), 'yyyy-MM-dd') ===
            format(date, 'yyyy-MM-dd')
        )
        .map((schedule) => `${schedule.startTime} ~ ${schedule.endTime}`);
    },
    [schedules]
  );

  const updateModal = useCallback(
    (date: Date | null, time: string | null) => {
      setModal((prevModal) => ({
        ...prevModal,
        content: (
          <ReservationModal
            selectedDate={date}
            handleDateChange={handleDateChange}
            getAvailableTimes={getAvailableTimes}
            selectedTime={time}
            handleTimeChange={handleTimeChange}
          />
        ),
      }));
    },
    [getAvailableTimes, setModal]
  );

  useEffect(() => {
    if (selectedDate) {
      updateModal(selectedDate, selectedTime);
    }

    if (selectedDate && selectedTime) {
      setButtonText(`${format(selectedDate, 'yy/MM/dd')} ${selectedTime}`);
    }
  }, [selectedDate, selectedTime, updateModal]);

  useEffect(() => {
    const isDisabled = !selectedTime;
    if (modal && modal.disabled !== isDisabled) {
      setModal((prevModal) => ({
        ...prevModal,
        disabled: isDisabled,
      }));
    }
  }, [selectedTime, modal, setModal]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeChange = (time: string | null) => {
    setSelectedTime(time);
  };

  const handleParticipantsChange = (delta: number) => {
    setParticipants((prev) => Math.max(1, prev + delta));
  };

  const handleModalConfirm = () => {
    closeModal();
  };

  const { mutate: createReservation } = useMutation({
    mutationFn: (data: postActivityRequestParams) =>
      postActivityRequest(activity.id, data),
    onSuccess: () => {
      openPopup({
        popupType: 'alert',
        content: '예약이 완료되었습니다.',
        btnName: ['확인'],
        callBackFnc: () => router.push(`/activity-details/${activity.id}`),
      });
    },
    onError: (error: AxiosError) => {
      console.error('예약 중 오류 발생:', error);
      let errorMessage = '알 수 없는 오류가 발생했습니다.';

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = '이미 지난 일정은 예약할 수 없습니다.';
            break;
          case 401:
            errorMessage = '로그인 후 다시 시도해 주세요.';
            break;
          case 404:
            errorMessage = '존재하지 않는 체험입니다.';
            break;
          case 409:
            errorMessage =
              '이미 예약된 활동이거나 확정 예약이 있는 체험입니다.';
            break;
          default:
            errorMessage = error.message;
            break;
        }
      }

      openPopup({
        popupType: 'alert',
        content: errorMessage,
        btnName: ['확인'],
      });
    },
  });

  const handleReservation = () => {
    if (!selectedDate || !selectedTime) return;

    const selectedSchedule = schedules.find(
      (schedule) =>
        schedule.startTime === selectedTime.split(' ~ ')[0] &&
        format(new Date(schedule.date), 'yyyy-MM-dd') ===
          format(selectedDate, 'yyyy-MM-dd')
    );

    if (!selectedSchedule) {
      openPopup({
        popupType: 'alert',
        content: '선택된 시간에 대한 예약 정보가 없습니다.',
        btnName: ['확인'],
      });
      return;
    }

    createReservation({
      scheduleId: selectedSchedule.id,
      headCount: participants,
    });
  };

  const totalPrice = pricePerPerson * participants;

  useEffect(() => {
    setModal((prevModal) => ({
      ...prevModal,
      content: (
        <>
          <p className="text-var-gray8 dark:text-var-gray2 font-xl mb-5">
            예약할 인원을 선택해 주세요.
          </p>
          <ParticipantSelector
            participants={participants}
            onParticipantsChange={handleParticipantsChange}
          />
        </>
      ),
      disabled: false,
    }));
  }, [participants, setModal]);

  return (
    <div className="w-[384px] h-auto p-4 p:mb-[50px] border border-solid border-var-gray3 rounded-xl shadow-sm bg-white dark:bg-var-dark3 dark:border-none t:w-[250px] t:min-h-[423px] m:w-full m:h-[83px] m:rounded-none m:fixed m:bottom-0 m:z-10 m:border-b-0 m:border-x-0 m:p-0 m:flex m:justify-between m:items-center">
      <div className="m:hidden">
        <div className="flex items-center gap-2">
          <p className="text-[28px] font-bold">
            ₩ {pricePerPerson.toLocaleString()}
          </p>
          <p className="text-xl"> / 인</p>
        </div>
        <div className="border border-solid border-var-gray2 dark:border-var-dark4 mt-2" />
        <div className="my-4 font-extrabold text-nomad-black text-xl dark:text-var-gray2">
          날짜
        </div>
        <div className="flex items-center p:justify-center">
          <button
            onClick={() =>
              openModal({
                title: '날짜',
                hasButton: true,
                buttonChildren: '예약하기',
                callBackFnc: handleModalConfirm,
                disabled: !selectedTime,
                content: (
                  <ReservationModal
                    selectedDate={selectedDate}
                    handleDateChange={handleDateChange}
                    getAvailableTimes={getAvailableTimes}
                    selectedTime={selectedTime}
                    handleTimeChange={handleTimeChange}
                  />
                ),
              })
            }
            className="t:block hidden underline font-bold text-nomad-black dark:text-var-gray5"
          >
            {buttonText}
          </button>
          <div className="t:hidden m:hidden">
            <CustomCalendar
              selectedDate={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
        <p className="my-4 font-extrabold text-nomad-black text-xl t:hidden dark:text-var-gray2">
          예약 가능한 시간
        </p>
        <div className="t:hidden">
          {getAvailableTimes(selectedDate).length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {getAvailableTimes(selectedDate).map((time, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeChange(time)}
                  className={`w-[130px] h-[46px] flex items-center justify-center border border-nomad-black dark:border-none rounded-lg ${
                    selectedTime === time
                      ? 'bg-nomad-black text-white'
                      : 'bg-white dark:bg-var-dark4'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-gray-500 dark:text-var-gray2">
              선택한 날짜에 예약 가능한 시간이 없습니다.
            </p>
          )}
        </div>
        <div className="border border-solid border-var-gray2 dark:border-var-dark4 mt-2 t:hidden" />
        <p className="my-4 font-extrabold text-nomad-black text-xl dark:text-var-gray2">
          참여 인원 수
        </p>
        <ParticipantSelector
          participants={participants}
          onParticipantsChange={handleParticipantsChange}
        />
        <PrimaryButton
          size="large"
          style={selectedTime ? 'dark' : 'disabled'}
          onClick={handleReservation}
          disabled={!selectedTime}
        >
          예약하기
        </PrimaryButton>
        <div className="border border-solid border-var-gray2 dark:border-var-dark4 mt-6" />
        <div className="mt-4 flex items-center justify-between">
          <p className="font-extrabold text-nomad-black text-xl dark:text-var-gray2">
            총 합계
          </p>
          <p className="font-extrabold text-nomad-black text-xl dark:text-var-green1">
            ₩ {totalPrice.toLocaleString()}
          </p>
        </div>
      </div>
      {/* 모바일 전용 하단 바 */}
      <div className="hidden m:w-full m:flex m:justify-between m:items-center m:mx-4">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <p className="font-bold text-xl text-nomad-black dark:text-var-gray2">
              ₩ {totalPrice.toLocaleString()} |
            </p>
            <button
              className="font-bold text-lg underline text-var-green2 dark:text-var-gray6"
              onClick={() =>
                openModal({
                  title: '인원',
                  hasButton: true,
                  buttonChildren: '확인',
                  callBackFnc: handleModalConfirm,
                  content: (
                    <>
                      <p className="text-var-gray8 dark:text-var-gray2 font-xl mb-5">
                        예약할 인원을 선택해 주세요.
                      </p>
                      <ParticipantSelector
                        participants={participants}
                        onParticipantsChange={handleParticipantsChange}
                      />
                    </>
                  ),
                })
              }
            >
              {participants}명
            </button>
          </div>
          <button
            onClick={() =>
              openModal({
                title: '날짜',
                hasButton: true,
                buttonChildren: '확인',
                callBackFnc: handleModalConfirm,
                disabled: !selectedTime,
                content: (
                  <>
                    <p className="text-var-gray8 font-xl mb-5 dark:text-var-gray2">
                      예약할 날짜를 선택해 주세요.
                    </p>
                    <div className="flex justify-center">
                      <CustomCalendar
                        selectedDate={selectedDate}
                        onChange={handleDateChange}
                      />
                    </div>
                    <p className="my-4 font-extrabold text-nomad-black dark:text-var-gray2 text-xl">
                      예약 가능한 시간
                    </p>
                    {getAvailableTimes(selectedDate).length > 0 ? (
                      <div className="flex flex-wrap gap-2 mb-20 justify-center">
                        {getAvailableTimes(selectedDate).map((time, index) => (
                          <button
                            key={index}
                            onClick={() => handleTimeChange(time)}
                            className={`w-[130px] h-[46px] flex items-center justify-center border border-nomad-black dark:border-none rounded-lg ${
                              selectedTime === time
                                ? 'bg-nomad-black text-white'
                                : 'bg-white dark:bg-var-dark4'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-gray-500">
                        선택한 날짜에 예약 가능한 시간이 없습니다.
                      </p>
                    )}
                  </>
                ),
              })
            }
            className="text-nomad-black underline text-sm dark:text-var-gray4"
          >
            {buttonText}
          </button>
        </div>
        <PrimaryButton
          size="medium"
          style={selectedTime ? 'dark' : 'disabled'}
          onClick={handleReservation}
          disabled={!selectedTime}
        >
          예약하기
        </PrimaryButton>
      </div>
    </div>
  );
}
