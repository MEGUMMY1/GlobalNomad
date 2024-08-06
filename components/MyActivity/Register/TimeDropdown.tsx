import useClickOutside from '@/hooks/useClickOutside';
import Image from 'next/image';
import { useState } from 'react';
import { TimeDropdownProps } from './TimeSlot.types';

function generateTimeOptions(startTime = 0, type: 'start' | 'end') {
  const times = [];
  const endTime = type === 'start' ? 23 : 24;
  for (let hour = startTime; hour <= endTime; hour++) {
    const timeString = `${hour < 10 ? '0' + hour : hour}:00`;
    times.push(timeString);
  }
  return times;
}

function TimeDropdown({
  type,
  handleChange,
  startTime,
  selectedTime,
  disabled = false,
}: TimeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectTime = (time: string) => {
    setIsOpen(false);
    handleChange(type, time);
  };

  const handleClickDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const dropdownRef = useClickOutside<HTMLDivElement>(closeDropdown);

  let timeLimit = 0;
  if (type === 'end') {
    timeLimit = Number(startTime.substring(0, 2)) + 1;
  }
  const times = generateTimeOptions(timeLimit, type);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        className="flex justify-between items-center p:w-[140px] w-full h-[56px] py-[4px] px-[16px] m:px-[7px] 
        rounded-md border border-var-gray6 dark:border-var-dark3 bg-white dark:bg-var-dark2 text-var-gray7
         dark:text-var-gray2 text-left t:w-[104px] m:w-full disabled:bg-var-gray2"
        onClick={handleClickDropdown}
        disabled={disabled}
      >
        <p>{selectedTime}</p>
        <Image
          src="/icon/chevron_down.svg"
          alt="화살표"
          width={24}
          height={24}
        />
      </button>
      {isOpen && (
        <ul className="absolute z-10 animate-slideDown mt-[4px] p:w-[140px] w-full h-[200px] rounded-[8px] overflow-y-scroll scrollbar-hide m:w-full">
          {times.map((time) => (
            <li
              key={time}
              onClick={() => handleSelectTime(time)}
              className="h-[56px] text-var-black py-[18px] px-[16px] m:px-[12px] hover:bg-gray-100 cursor-pointer bg-white dark:bg-var-dark3 dark:text-var-gray2 dark:hover:bg-var-gray2 dark:hover:text-var-dark3"
            >
              {time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TimeDropdown;
