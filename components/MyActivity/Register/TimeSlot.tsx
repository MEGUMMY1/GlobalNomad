import { MinusButton, PlusButton } from '@/components/Button/Button';
import DateInput from './DateInput';
import TimeDropdown from './TimeDropdown';
import { TimeSlotGroupProps } from './TimeSlot.types';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { timeSlotCountState } from '@/states/registerState';

function TimeSlotGroup({
  isDefault = false,
  handleClickPlus = () => {},
  handleClickMinus = (id: number) => {},
  id = -1,
  index,
}: TimeSlotGroupProps) {
  return (
    <div className="flex items-center t:justify-between m:justify-between gap-[20px] t:gap-[4px] m:gap-[4px]">
      <div className="flex items-center gap-[20px] t:gap-[4px] m:gap-[4px]">
        <DateInput index={index} />
        <div className="flex gap-[12px] items-center t:gap-[4px] m:gap-[4px]">
          <TimeDropdown type="start" index={index} />
          <p className="text-[20px] font-[700] t:hidden m:hidden">~</p>
          <TimeDropdown type="end" index={index} />
        </div>
      </div>
      <div className="flex items-center">
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
    </div>
  );
}

function TimeSlot() {
  const [timeSlots, setTimeSlots] = useState<{ id: number }[]>([]);
  const [timeSlotCount, setTimeSlotCount] = useRecoilState(timeSlotCountState);

  const handleClickPlus = () => {
    const newTimeSlot = {
      id: Date.now(),
    };
    setTimeSlots((prevTimeSlots) => [...prevTimeSlots, newTimeSlot]);
    setTimeSlotCount(timeSlotCount + 1);
  };
  const handleClickMinus = (id: number) => {
    setTimeSlots((prevTimeSlots) =>
      prevTimeSlots.filter((timeSlot) => timeSlot.id !== id)
    );
    setTimeSlotCount(timeSlotCount - 1);
  };

  return (
    <div>
      <label className="text-[24px] font-[700] block mb-[24px] text-var-black">
        예약 가능한 시간대
      </label>
      <div className="flex gap-[20px] t:gap-[4px] m:gap-[4px]">
        <label className="w-[374px] t:w-[149px] m:w-[130px] text-[20px] m:text-[16px] font-[500] block mb-[10px] text-var-gray8 ">
          날짜
        </label>
        <div className="flex gap-[12px] items-center t:gap-[4px] m:gap-[4px]">
          <label className="w-[140px] t:w-[104px] m:w-[79px] text-[20px] m:text-[16px] font-[500] block mb-[10px] text-var-gray8">
            시작 시간
          </label>
          <label className="w-[140px] t:w-[104px] m:w-[79px] text-[20px] m:text-[16px] font-[500] block mb-[10px] text-var-gray8">
            종료 시간
          </label>
        </div>
        <label className="text-transparent w-[56px] shrink-0">blank</label>
      </div>
      <TimeSlotGroup isDefault handleClickPlus={handleClickPlus} index={0} />
      <hr className="mt-[20px] mb-[20px]" />
      <div className="space-y-[20px]">
        {timeSlots.map((timeSlot, index) => (
          <TimeSlotGroup
            key={timeSlot.id}
            id={timeSlot.id}
            index={index + 1}
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
