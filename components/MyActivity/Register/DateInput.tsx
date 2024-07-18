import { useState } from 'react';
import CustomCalendar from '@/components/CustomCalendar/CustomCalendar';
import useClickOutside from '@/hooks/useClickOutside';
import { useRecoilState } from 'recoil';
import { selectedDateState } from '@/states/registerState';
import { TimeSlotGroupProps } from './TimeSlot.types';

function Date({ index }: TimeSlotGroupProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

  const handleInputClick = () => {
    setShowCalendar(true);
  };

  const handleDateSelect = (date: Date | null) => {
    setDate(date);
    setShowCalendar(false);

    if (date) {
      const updatedDate = [...selectedDate];
      updatedDate[index] = date.toString();
      setSelectedDate(updatedDate);
    }
  };

  const closeCalendar = () => {
    setShowCalendar(false);
  };

  const calendarRef = useClickOutside<HTMLDivElement>(closeCalendar);

  return (
    <div className="relative">
      <div className="w-[374px] t:w-[149px] m:w-[130px]">
        <input
          type="text"
          value={date ? date.toDateString() : ''}
          onClick={handleInputClick}
          readOnly
          className="w-full h-[56px] py-[8px] px-[16px] rounded-md border border-var-gray6 bg-white"
          placeholder={
            selectedDate[index] !== '' ? selectedDate[index] : 'YY/MM/DD'
          }
        />
      </div>
      {showCalendar && (
        <div ref={calendarRef} className="absolute left-[40px] top-[67px] z-10">
          <CustomCalendar selectedDate={date} onChange={handleDateSelect} />
        </div>
      )}
    </div>
  );
}

export default Date;
