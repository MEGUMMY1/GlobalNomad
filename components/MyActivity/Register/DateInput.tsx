import { useState } from 'react';
import CustomCalendar from '@/components/CustomCalendar/CustomCalendar';
import useClickOutside from '@/hooks/useClickOutside';
import { useRecoilState } from 'recoil';
import { scheduleState, selectedDateState } from '@/states/registerState';
import { TimeSlotGroupProps } from './TimeSlot.types';
import { formatDate } from '@/utils/formatDate';

function Date({ id, disabled = false }: TimeSlotGroupProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [editSchedule, setEditSchedule] = useRecoilState(scheduleState);
  const selectedItem = selectedDate.find((date) => date.id === id);
  const placeholderDate =
    selectedItem && selectedItem.date !== '' ? selectedItem.date : 'YY/MM/DD';

  const handleInputClick = () => {
    setShowCalendar(true);
  };

  const handleDateSelect = (date: Date | null) => {
    setDate(date);
    setShowCalendar(false);

    if (date) {
      setSelectedDate((prevSelectedDate) =>
        prevSelectedDate.map((selectedDate) =>
          selectedDate.id === id
            ? { ...selectedDate, date: formatDate(date.toString()) }
            : selectedDate
        )
      );
      setEditSchedule((prevSchedule) => ({
        ...prevSchedule,
        toAdd: prevSchedule.toAdd.map((schedule) =>
          schedule.id === id
            ? { ...schedule, date: formatDate(date.toString()) }
            : schedule
        ),
      }));
    }
  };

  const closeCalendar = () => {
    setShowCalendar(false);
  };

  const calendarRef = useClickOutside<HTMLDivElement>(closeCalendar);

  return (
    <div className="relative">
      <div className="w-[374px] t:w-[149px] m:w-full">
        <input
          type="text"
          value={date ? date.toDateString() : ''}
          onClick={handleInputClick}
          readOnly
          className="w-full h-[56px] py-[8px] px-[16px] rounded-md border border-var-gray6 dark:border-var-dark3
           bg-white dark:bg-var-dark2 dark:text-var-gray2 disabled:bg-var-gray2"
          placeholder={placeholderDate}
          disabled={disabled}
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
