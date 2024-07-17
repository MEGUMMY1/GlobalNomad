import { MinusButton, PlusButton } from '@/components/Button/Button';
import DateInput from './DateInput';
import TimeDropdown from './TimeDropdown';
import { TimeSlotGroupProps } from './TimeSlot.types';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  startTimeState,
  endTimeState,
  timeSlotCountState,
} from '@/states/registerState';

function autoSelectedTime(time: string) {
  const tempTime = Number(time.substring(0, 2)) + 1;
  if (tempTime < 10) {
    return `0${tempTime}:00`;
  }
  return `${tempTime}:00`;
}

function TimeSlotGroup({
  isDefault = false,
  handleClickPlus = () => {},
  handleClickMinus = (id: number) => {},
  id = -1,
  index,
}: TimeSlotGroupProps) {
  const [selectedStartTime, setSelectedStartTime] = useState<string>('00:00');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('00:00');
  const [startTime, setStartTime] = useRecoilState(startTimeState);
  const [endTime, setEndTime] = useRecoilState(endTimeState);

  const handleChange = (type: string, time: string) => {
    if (type === 'start') {
      setSelectedStartTime(time);
      setSelectedEndTime(autoSelectedTime(time));
      const updatedStartTime = [...startTime];
      updatedStartTime[index] = time;
      setStartTime(updatedStartTime);

      const updatedEndTime = [...endTime];
      updatedEndTime[index] = autoSelectedTime(time);
      setEndTime(updatedEndTime);
    } else {
      setSelectedEndTime(time);
      const updatedEndTime = [...endTime];
      updatedEndTime[index] = time;
      setEndTime(updatedEndTime);
    }
  };

  return (
    <div className="flex items-center t:justify-between m:justify-between gap-[20px] t:gap-[4px] m:gap-[4px]">
      <div className="flex items-center gap-[20px] t:gap-[4px] m:gap-[4px]">
        <DateInput index={index} />
        <div className="flex gap-[12px] items-center t:gap-[4px] m:gap-[4px]">
          <TimeDropdown
            type="start"
            handleChange={handleChange}
            startTime={startTime[index]}
            selectedTime={selectedStartTime}
          />
          <p className="text-[20px] font-[700] t:hidden m:hidden">~</p>
          <TimeDropdown
            type="end"
            handleChange={handleChange}
            startTime={startTime[index]}
            selectedTime={selectedEndTime}
          />
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
