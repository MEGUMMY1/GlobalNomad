import React from 'react';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import { ReservationModalProps } from './Reservation.types';

export default function ReservationModal({
  selectedDate,
  handleDateChange,
  getAvailableTimes,
  selectedTime,
  handleTimeChange,
}: ReservationModalProps) {
  return (
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
  );
}
