import { MinusButton, PlusButton } from '@/components/Button/Button';
import DateInput from './DateInput';
import TimeDropdown from './TimeDropdown';
import { TimeSlotGroupProps } from './TimeSlot.types';
import { useState } from 'react';

function TimeSlotGroup({
  isDefault = false,
  handleClickPlus = () => {},
  handleClickMinus = (id: number) => {},
  id = -1,
}: TimeSlotGroupProps) {
  return (
    <div className="flex gap-[20px]">
      <DateInput />
      <div className="flex gap-[12px] items-center">
        <TimeDropdown />
        <p className="text-[20px] font-[700]">~</p>
        <TimeDropdown />
      </div>
      {isDefault ? (
        <PlusButton onClick={handleClickPlus} />
      ) : (
        <MinusButton
          onClick={() => {
            handleClickMinus(id);
          }}
        />
      )}
    </div>
  );
}

function TimeSlot() {
  const [timeSlots, setTimeSlots] = useState<{ id: number }[]>([]);

  const handleClickPlus = () => {
    const newTimeSlot = {
      id: Date.now(),
    };
    setTimeSlots((prevTimeSlots) => [...prevTimeSlots, newTimeSlot]);
  };
  const handleClickMinus = (id: number) => {
    setTimeSlots((prevTimeSlots) =>
      prevTimeSlots.filter((timeSlot) => timeSlot.id !== id)
    );
  };

  return (
    <div>
      <label className="text-[24px] font-[700] block mb-[24px] text-var-black">
        예약 가능한 시간대
      </label>
      <div className="flex gap-[20px]">
        <label className="w-[374px] text-[20px] font-[500] block mb-[10px] text-var-gray8">
          날짜
        </label>
        <label className="w-[158px] text-[20px] font-[500] block mb-[10px] text-var-gray8">
          시작 시간
        </label>
        <label className="w-[140px] text-[20px] font-[500] block mb-[10px] text-var-gray8">
          종료 시간
        </label>
      </div>
      <TimeSlotGroup isDefault handleClickPlus={handleClickPlus} />
      <hr className="mt-[20px] mb-[20px]" />
      <div className="space-y-[20px]">
        {timeSlots.map((timeSlot) => (
          <TimeSlotGroup
            key={timeSlot.id}
            id={timeSlot.id}
            handleClickMinus={() => {
              handleClickMinus(timeSlot.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default TimeSlot;
