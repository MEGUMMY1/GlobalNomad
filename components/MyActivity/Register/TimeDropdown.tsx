import useClickOutside from '@/hooks/useClickOutside';
import Image from 'next/image';
import { useState } from 'react';
import { TimeDropdownProps } from './TimeSlot.types';
import { useRecoilState, useRecoilValue } from 'recoil';
import { endTimeState, startTimeState } from '@/states/registerState';

function generateTimeOptions(startTime = 0, type: 'start' | 'end') {
  const times = [];
  const endTime = type === 'start' ? 23 : 24;
  for (let hour = startTime; hour <= endTime; hour++) {
    const timeString = `${hour < 10 ? '0' + hour : hour}:00`;
    times.push(timeString);
  }
  return times;
}

function TimeDropdown({ type, index }: TimeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>('00:00');
  const [startTime, setStartTime] = useRecoilState(startTimeState);
  const [endTime, setEndTime] = useRecoilState(endTimeState);

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setIsOpen(false);
    if (type === 'start') {
      const updatedStartTime = [...startTime];
      updatedStartTime[index] = time;
      setStartTime(updatedStartTime);
    } else {
      const updatedEndTime = [...endTime];
      updatedEndTime[index] = time;
      setEndTime(updatedEndTime);
    }
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
    timeLimit = Number(startTime[index].substring(0, 2)) + 1;
  }
  const times = generateTimeOptions(timeLimit, type);

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
