import { MinusButton, PlusButton } from '@/components/Button/Button';
import DateInput from './DateInput';
import TimeDropdown from './TimeDropdown';
import { TimeSlotGroupProps } from './TimeSlot.types';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  startTimeState,
  endTimeState,
  timeSlotCountState,
  timeSlotState,
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

  useEffect(() => {
    setSelectedStartTime(startTime[index]);
    setSelectedEndTime(endTime[index]);
  }, [startTime[index], endTime[index]]);

  return (
    <div className="flex items-end t:justify-between m:justify-between gap-[20px] t:gap-[4px] m:gap-[6px]">
      <div className="flex items-center gap-[20px] t:gap-[4px] m:gap-[6px] grow">
        <div className="m:w-[50%]">
          {isDefault && (
            <label className="text-[20px] m:text-[16px] font-[500] block mb-[10px] text-var-gray8 ">
              날짜
            </label>
          )}
          <DateInput index={index} />
        </div>
        <div className="flex gap-[12px] items-center t:gap-[2px] m:gap-[2px] grow">
          <div className="m:w-[50%]">
            {isDefault && (
              <label className="text-[20px] m:text-[16px] font-[500] block mb-[10px] text-var-gray8">
                시작 시간
              </label>
            )}
            <TimeDropdown
              type="start"
              handleChange={handleChange}
              startTime={startTime[index]}
              selectedTime={selectedStartTime}
            />
          </div>
          <div>
            {isDefault && (
              <p className="text-[20px] m:text-[16px] font-[500] block mb-[10px] text-transparent t:hidden m:hidden">
                ~
              </p>
            )}
            <p className="text-[20px] font-[700] t:hidden m:hidden">~</p>
          </div>
          <div className="m:w-[50%]">
            {isDefault && (
              <label className="text-[20px] m:text-[16px] font-[500] block mb-[10px] text-var-gray8">
                종료 시간
              </label>
            )}
            <TimeDropdown
              type="end"
              handleChange={handleChange}
              startTime={startTime[index]}
              selectedTime={selectedEndTime}
            />
          </div>
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
  const [timeSlots, setTimeSlots] = useRecoilState(timeSlotState);
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
