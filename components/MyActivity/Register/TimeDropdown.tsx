import useClickOutside from '@/hooks/useClickOutside';
import Image from 'next/image';
import { useState } from 'react';

function generateTimeOptions() {
  const times = [];
  for (let hour = 0; hour <= 24; hour++) {
    const timeString = `${hour}:00`;
    times.push(timeString);
  }
  return times;
}

function TimeDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>('0:00');

  const handleSelectTime = (time: string | null) => {
    setSelectedTime(time);
    setIsOpen(false);
  };

  const handleClickDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const dropdownRef = useClickOutside<HTMLDivElement>(closeDropdown);
  const times = generateTimeOptions();

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        className="flex justify-between items-center w-[140px] h-[56px] py-[4px] px-[16px] rounded-md border border-var-gray6 bg-white text-var-gray7 text-left"
        onClick={handleClickDropdown}
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
        <ul className="absolute z-10 animate-slideDown w-[140px] h-[200px] rounded-[8px] overflow-y-scroll scrollbar-hide">
          {times.map((time) => (
            <li
              key={time}
              onClick={() => handleSelectTime(time)}
              className="h-[56px] text-var-black py-[18px] px-[16px] hover:bg-gray-100 cursor-pointer bg-white"
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
