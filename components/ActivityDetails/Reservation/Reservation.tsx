import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { ActivityDetailsProps } from '../ActivityDetails.types';
import { PrimaryButton } from '@/components/Button/Button';
import { usePopup } from '@/hooks/usePopup';
import { useModal } from '@/hooks/useModal';
import { useRecoilState } from 'recoil';
import { modalState } from '@/states/modalState';
import router from 'next/router';
import ReservationModal from './ReservationModal';
import ParticipantSelector from './ParticipantSelector';
import CustomCalendar from '@/components/CustomCalendar/CustomCalendar';

export default function Reservation({ activity }: ActivityDetailsProps) {
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

  useEffect(() => {
    if (selectedDate) {
      updateModal(selectedDate, selectedTime);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedTime) {
      updateModal(selectedDate, selectedTime);
    }

    if (selectedDate && selectedTime) {
      setButtonText(`${format(selectedDate, 'yy/MM/dd')} ${selectedTime}`);
    }
  }, [selectedTime]);

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

  const handleReservation = () => {
    openPopup({
      popupType: 'alert',
      content: '예약이 완료되었습니다.',
      btnName: ['확인'],
      callBackFnc: () => router.push(`/`),
    });
  };

  const totalPrice = pricePerPerson * participants;

  const updateModal = (date: Date | null, time: string | null) => {
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
  };

  const getAvailableTimes = (date: Date | null) => {
    if (!date) return [];
    return schedules
      .filter(
        (schedule) =>
          format(new Date(schedule.date), 'yyyy-MM-dd') ===
          format(date, 'yyyy-MM-dd')
      )
      .map((schedule) => `${schedule.startTime} ~ ${schedule.endTime}`);
  };

  useEffect(() => {
    setModal((prevModal) => ({
      ...prevModal,
      content: (
        <>
          <p className="text-var-gray8 font-xl mb-5">
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
    <div className="w-[384px] h-auto p-4 border border-solid border-var-gray3 rounded-xl shadow-sm bg-white t:w-[250px] t:min-h-[423px] m:w-full m:h-[83px] m:rounded-none m:fixed m:bottom-0 m:z-10 m:border-b-0 m:border-x-0 m:p-0 m:flex m:justify-between m:items-center">
      <div className="m:hidden">
        <div className="flex items-center gap-2">
          <p className="text-[28px] font-bold">
            ₩ {pricePerPerson.toLocaleString()}
          </p>
          <p className="text-xl"> / 인</p>
        </div>
        <div className="border border-solid border-var-gray2 mt-2" />
        <div className="my-4 font-extrabold text-nomad-black text-xl">날짜</div>
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
            className="t:block hidden underline font-bold text-nomad-black"
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
        <p className="my-4 font-extrabold text-nomad-black text-xl t:hidden">
          예약 가능한 시간
        </p>
        <div className="t:hidden">
          {getAvailableTimes(selectedDate).length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-6">
              {getAvailableTimes(selectedDate).map((time, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeChange(time)}
                  className={`w-[117px] h-[46px] flex items-center justify-center border border-nomad-black rounded-lg ${
                    selectedTime === time
                      ? 'bg-nomad-black text-white'
                      : 'bg-white'
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
        </div>
        <div className="border border-solid border-var-gray2 mt-2 t:hidden" />
        <p className="my-4 font-extrabold text-nomad-black text-xl">
          참여 인원 수
        </p>
        <ParticipantSelector
          participants={participants}
          onParticipantsChange={handleParticipantsChange}
        />
        <PrimaryButton
          size="large"
          style={selectedTime ? 'dark' : 'disabled'}
          children="예약하기"
          onClick={handleReservation}
          disabled={!selectedTime}
        />
        <div className="border border-solid border-var-gray2 mt-6" />
        <div className="mt-4 flex items-center justify-between">
          <p className="font-extrabold text-nomad-black text-xl">총 합계</p>
          <p className="font-extrabold text-nomad-black text-xl">
            ₩ {totalPrice.toLocaleString()}
          </p>
        </div>
      </div>
      {/* 모바일 전용 하단 바 */}
      <div className="hidden m:w-full m:flex m:justify-between m:items-center m:mx-4">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <p className="font-bold text-xl text-nomad-black">
              ₩ {totalPrice.toLocaleString()} |
            </p>
            <button
              className="font-bold text-xl underline text-var-green2"
              onClick={() =>
                openModal({
                  title: '인원',
                  hasButton: true,
                  buttonChildren: '확인',
                  callBackFnc: handleModalConfirm,
                  content: (
                    <>
                      <p className="text-var-gray8 font-xl mb-5">
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
            className="underline font-bold text-var-green2 mt-2"
          >
            {buttonText}
          </button>
        </div>
        <PrimaryButton
          size="small"
          style={selectedTime ? 'dark' : 'disabled'}
          children="예약하기"
          onClick={handleReservation}
          disabled={!selectedTime}
        />
      </div>
    </div>
  );
}
