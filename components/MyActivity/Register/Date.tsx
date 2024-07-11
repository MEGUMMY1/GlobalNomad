import { useState } from 'react';
import CustomCalendar from '@/components/CustomCalendar/CustomCalendar';
import useClickOutside from '@/hooks/useClickOutside';

function Date() {
  const [date, setDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleInputClick = () => {
    setShowCalendar(true);
  };

  const handleDateSelect = (date: Date | null) => {
    setDate(date);
    setShowCalendar(false);
  };

  const closeCalendar = () => {
    setShowCalendar(false);
  };

  const calendarRef = useClickOutside<HTMLDivElement>(closeCalendar);

  return (
    <div className="relative">
      <div className="w-[374px]">
        <input
          type="text"
          value={date ? date.toDateString() : ''}
          onClick={handleInputClick}
          readOnly
          className="w-full h-[56px] py-[8px] px-[16px] rounded-md border border-var-gray6 bg-white"
          placeholder="YY/MM/DD"
        />
      </div>
      {showCalendar && (
        <div ref={calendarRef} className="absolute left-[40px] top-[80px] z-10">
          <CustomCalendar selectedDate={date} onChange={handleDateSelect} />
        </div>
      )}
    </div>
  );
}

export default Date;
