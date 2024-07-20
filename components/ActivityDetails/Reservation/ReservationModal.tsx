import React from 'react';
import { ReservationModalProps } from './Reservation.types';
import CustomCalendar from '@/components/CustomCalendar/CustomCalendar';

export default function ReservationModal({
  selectedDate,
  handleDateChange,
  getAvailableDates,
  getAvailableTimes,
  selectedTime,
  handleTimeChange,
}: ReservationModalProps) {
  return (
    <>
      <div className="flex justify-center">
        <CustomCalendar
          selectedDate={selectedDate}
          onChange={handleDateChange}
          getAvailableDates={getAvailableDates}
        />
      </div>
      <div className="mt-6">
        <p className="font-extrabold text-nomad-black dark:text-var-gray2 text-xl mb-4">
          예약 가능한 시간
        </p>
        {getAvailableTimes(selectedDate).length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-20 justify-center t:max-h-[100px] t:overflow-auto">
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
      </div>
    </>
  );
}
