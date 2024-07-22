import React from 'react';
import dynamic from 'next/dynamic';
import { CalendarProps } from 'react-calendar';
import { addDays, format } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import { CustomCalendarProps } from './CustomCalendar.types';
import { useRecoilValue } from 'recoil';
import { darkModeState } from '@/states/themeState';

const DynamicCalendar = dynamic(() => import('react-calendar'), { ssr: false });

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  selectedDate,
  onChange,
  getAvailableDates,
}) => {
  const availableDates = getAvailableDates ? getAvailableDates() : [];

  const tileClassName = ({ date }: { date: Date }) => {
    const isAvailable = availableDates.some(
      (d) => format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    return isAvailable ? 'available-date' : 'unavailable-date';
  };

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (Array.isArray(value)) {
      onChange(value[0]);
    } else {
      onChange(value);
    }
  };

  const darkMode = useRecoilValue(darkModeState);

  return (
    <div className={`calendar-container ${darkMode ? 'dark' : ''}`}>
      <DynamicCalendar
        onChange={handleDateChange}
        value={selectedDate}
        minDate={addDays(new Date(), 1)}
        locale="ko"
        calendarType="gregory"
        className="custom-calendar"
        formatDay={(locale, date) => date.getDate().toString()}
        tileClassName={getAvailableDates && tileClassName}
      />
    </div>
  );
};

export default CustomCalendar;
