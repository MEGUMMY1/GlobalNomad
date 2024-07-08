import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, addDays } from 'date-fns';
import { ActivityDetailsProps } from '../ActivityDetails.types';
import { PrimaryButton } from '@/components/Button/Button';
import { usePopup } from '@/hooks/usePopup';
import router from 'next/router';

export default function Reservation({ activity }: ActivityDetailsProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    addDays(new Date(), 1)
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [participants, setParticipants] = useState(1);

  const pricePerPerson = activity.price;
  const schedules = activity.schedules;
  const { openPopup } = usePopup();

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  const handleParticipantsChange = (delta: number) => {
    setParticipants((prev) => Math.max(1, prev + delta));
  };

  const handleReservation = () => {
    openPopup({
      popupType: 'alert',
      content: '예약이 완료되었습니다.',
      btnName: ['확인'],
      callBackFnc: () => router.push(`/`),
    });
  };

  const availableTimes = schedules
    .filter(
      (schedule) =>
        selectedDate &&
        format(new Date(schedule.date), 'yyyy-MM-dd') ===
          format(selectedDate, 'yyyy-MM-dd')
    )
    .map((schedule) => `${schedule.startTime}~${schedule.endTime}`);

  const totalPrice = pricePerPerson * participants;

  return (
    <div className="w-[384px] min-h-[700px] p-4 border border-solid border-var-gray3 rounded-xl shadow-sm bg-white">
      <div className="flex items-center gap-2">
        <p className="text-[28px] font-bold">
          ₩ {pricePerPerson.toLocaleString()}
        </p>
        <p className="text-xl"> / 인</p>
      </div>
      <div className="border border-solid border-var-gray2 mt-2" />
      <p className="my-4 font-extrabold text-nomad-black text-xl">날짜</p>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        dateFormat="yyyy-MM-dd"
        className="block w-full mt-2 p-2 border rounded bg-white text-gray-700 font-medium"
        minDate={addDays(new Date(), 1)}
      />
      <p className="my-4 font-extrabold text-nomad-black text-xl">
        예약 가능한 시간
      </p>
      {availableTimes.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-6">
          {availableTimes.map((time, index) => (
            <button
              key={index}
              onClick={() => handleTimeChange(time)}
              className={`w-[117px] h-[46px] flex items-center justify-center border border-nomad-black rounded-lg ${
                selectedTime === time ? 'bg-nomad-black text-white' : 'bg-white'
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
      <div className="border border-solid border-var-gray2 mt-2" />
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
