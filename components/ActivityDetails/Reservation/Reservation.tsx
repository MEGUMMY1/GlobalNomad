import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, addDays } from 'date-fns';
import { ActivityDetailsProps } from '../ActivityDetails.types';
import { PrimaryButton } from '@/components/Button/Button';
import { usePopup } from '@/hooks/usePopup';
import { useModal } from '@/hooks/useModal';
import { useRecoilState } from 'recoil';
import { modalState } from '@/states/modalState';
import router from 'next/router';

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
        <>
          <div className="flex justify-center">
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              inline
              dateFormat="yyyy-MM-dd"
              className="block w-full mt-2 p-2 border rounded bg-white text-gray-700 font-medium"
              minDate={addDays(new Date(), 1)}
            />
          </div>
          <div className="mt-6">
            <p className="font-extrabold text-nomad-black text-xl mb-4">
              예약 가능한 시간
            </p>
            {getAvailableTimes(date).length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-6">
                {getAvailableTimes(date).map((availableTime, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeChange(availableTime)}
                    className={`w-[117px] h-[46px] flex items-center justify-center border border-nomad-black rounded-lg ${
                      selectedTime === availableTime
                        ? 'bg-nomad-black text-white'
                        : 'bg-white'
                    }`}
                  >
                    {availableTime}
                  </button>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                선택한 날짜에 예약 가능한 시간이 없습니다.
              </p>
            )}
          </div>
        </>
      ),
      disabled: !selectedTime,
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

  return (
    <div className="w-[384px] min-h-[700px] p-4 border border-solid border-var-gray3 rounded-xl shadow-sm bg-white t:w-[250px] t:min-h-[423px]">
      <div className="flex items-center gap-2">
        <p className="text-[28px] font-bold">
          ₩ {pricePerPerson.toLocaleString()}
        </p>
        <p className="text-xl"> / 인</p>
      </div>
      <div className="border border-solid border-var-gray2 mt-2" />
      <div className="my-4 font-extrabold text-nomad-black text-xl">날짜</div>
      <div className="flex items-center justify-between">
        <button
          onClick={() =>
            openModal({
              title: '날짜',
              hasButton: true,
              buttonChildren: '예약하기',
              callBackFnc: handleModalConfirm,
              disabled: !selectedTime,
              content: (
                <>
                  <div className="flex justify-center">
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      inline
                      dateFormat="yyyy-MM-dd"
                      className="block w-full mt-2 p-2 border rounded bg-white text-gray-700 font-medium"
                      minDate={addDays(new Date(), 1)}
                    />
                  </div>
                  <div className="mt-6">
                    <p className="font-extrabold text-nomad-black text-xl mb-4">
                      예약 가능한 시간
                    </p>
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
                </>
              ),
            })
          }
          className="t:block hidden underline font-bold text-nomad-black"
        >
          {buttonText}
        </button>
        <div className="t:hidden">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            dateFormat="yyyy-MM-dd"
            className="block w-full mt-2 p-2 border rounded bg-white text-gray-700 font-medium"
            minDate={addDays(new Date(), 1)}
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
      <div className="w-[120px] h-[40px] flex items-center mt-2 mb-6 rounded border border-var-gray2 border-solid">
        <button
          onClick={() => handleParticipantsChange(-1)}
          className="px-4 py-2 hover:bg-var-gray2"
        >
          -
        </button>
        <input
          type="text"
          value={participants}
          onChange={(e) =>
            setParticipants(Math.max(1, parseInt(e.target.value)))
          }
          min="1"
          className="w-full h-full p-2 outline-none text-center"
        />
        <button
          onClick={() => handleParticipantsChange(1)}
          className="px-4 py-2 hover:bg-var-gray2"
        >
          +
        </button>
      </div>
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
  );
}
