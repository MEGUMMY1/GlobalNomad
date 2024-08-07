import { MinusButton, PlusButton } from '@/components/Button/Button';
import DateInput from './DateInput';
import TimeDropdown from './TimeDropdown';
import { TimeSlotGroupProps, TimeSlotProps } from './TimeSlot.types';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  timeSlotCountState,
  scheduleState,
  selectedDateState,
  ScheduleToAddProps,
} from '@/states/registerState';
import { useQuery } from '@tanstack/react-query';

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
  index = -1,
  disabled = false,
}: TimeSlotGroupProps) {
  const [selectedStartTime, setSelectedStartTime] = useState<string>('00:00');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('01:00');
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [editSchedule, setEditSchedule] = useRecoilState(scheduleState);

  const handleChange = (type: string, time: string) => {
    if (type === 'start') {
      setSelectedStartTime(time);
      setSelectedEndTime(autoSelectedTime(time));
      setSelectedDate((prevSelectedDate) =>
        prevSelectedDate.map((selectedDate) =>
          selectedDate.id === id
            ? {
                ...selectedDate,
                startTime: time,
                endTime: autoSelectedTime(time),
              }
            : selectedDate
        )
      );
      setEditSchedule((prevSchedule) => ({
        ...prevSchedule,
        toAdd: prevSchedule.toAdd.map((schedule) =>
          schedule.id === id ? { ...schedule, startTime: time } : schedule
        ),
      }));
    } else {
      setSelectedEndTime(time);
      setSelectedDate((prevSelectedDate) =>
        prevSelectedDate.map((selectedDate) =>
          selectedDate.id === id
            ? { ...selectedDate, endTime: time }
            : selectedDate
        )
      );
      setEditSchedule((prevSchedule) => ({
        ...prevSchedule,
        toAdd: prevSchedule.toAdd.map((schedule) =>
          schedule.id === id ? { ...schedule, endTime: time } : schedule
        ),
      }));
    }
  };

  return (
    <div className="flex items-end t:justify-between m:justify-between gap-[20px] t:gap-[4px] m:gap-[6px] m:mr-4">
      <div className="flex items-center gap-[20px] t:gap-[4px] m:gap-[6px] grow">
        <div className="m:w-[50%]">
          {isDefault && (
            <label className="text-[20px] m:text-[16px] font-[500] block mb-[10px] text-var-gray8 dark:text-var-gray3">
              날짜
            </label>
          )}
          <DateInput id={id} disabled={disabled} />
        </div>
        <div className="flex gap-[12px] items-center t:gap-[2px] m:gap-[2px] grow">
          <div className="m:w-[50%]">
            {isDefault && (
              <label className="text-[20px] m:text-[16px] font-[500] block mb-[10px] text-var-gray8 dark:text-var-gray3">
                시작 시간
              </label>
            )}
            <TimeDropdown
              type="start"
              handleChange={handleChange}
              startTime={selectedStartTime}
              selectedTime={selectedDate[index].startTime}
              disabled={disabled}
            />
          </div>
          <div>
            {isDefault && (
              <p className="text-[20px] m:text-[16px] font-[500] block mb-[10px] text-transparent t:hidden m:hidden">
                ~
              </p>
            )}
            <p className="text-[20px] font-[700] t:hidden m:hidden dark:text-var-gray3">
              ~
            </p>
          </div>
          <div className="m:w-[50%]">
            {isDefault && (
              <label className="text-[20px] m:text-[16px] font-[500] block mb-[10px] text-var-gray8 dark:text-var-gray3">
                종료 시간
              </label>
            )}
            <TimeDropdown
              type="end"
              handleChange={handleChange}
              startTime={selectedStartTime}
              selectedTime={selectedDate[index].endTime}
              disabled={disabled}
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

function TimeSlot({ isEdit }: TimeSlotProps) {
  const [timeSlotCount, setTimeSlotCount] = useRecoilState(timeSlotCountState);
  const [selectedDates, setSelectedDates] = useRecoilState(selectedDateState);
  const [editSchedule, setEditSchedule] = useRecoilState(scheduleState);
  // const [disabledInputId, setDisabledInputId] = useState<number[]>([]);

  const handleClickPlus = () => {
    const newId = Date.now();
    setSelectedDates((prevSelectedDate) => [
      ...prevSelectedDate,
      {
        date: '',
        startTime: '00:00',
        endTime: '01:00',
        id: newId,
      },
    ]);
    const newSchedule: ScheduleToAddProps = {
      date: '',
      startTime: '00:00',
      endTime: '01:00',
      id: newId,
    };
    setEditSchedule((prevSchedule) => ({
      ...prevSchedule,
      toAdd: [...prevSchedule.toAdd, newSchedule],
    }));
    setTimeSlotCount(timeSlotCount + 1);
  };

  const handleClickMinus = (id: number) => {
    setTimeSlotCount(timeSlotCount - 1);

    const scheduleToRemove = selectedDates.find(
      (selectedDate) => selectedDate.id === id
    );
    if (scheduleToRemove) {
      setEditSchedule((prevSchedule) => ({
        ...prevSchedule,
        idsToRemove: [...prevSchedule.idsToRemove, id],
        toAdd: prevSchedule.toAdd.filter(
          (schedule) =>
            !(
              schedule.date === scheduleToRemove.date &&
              schedule.startTime === scheduleToRemove.startTime &&
              schedule.endTime === scheduleToRemove.endTime
            )
        ),
      }));
    } else {
      console.log('No matching time slot found');
    }
    setSelectedDates((prevSelectedDate) =>
      prevSelectedDate.filter((selectedDate) => selectedDate.id !== id)
    );
  };

  useEffect(() => {
    if (!isEdit) {
      const initialDate = {
        date: '',
        startTime: '00:00',
        endTime: '01:00',
        id: Date.now(),
      };

      setSelectedDates((prevSelectedDate) => [
        ...prevSelectedDate,
        initialDate,
      ]);
    }
  }, []);

  // useEffect(() => {
  //   if (isEdit && disabledInputId.length === 0) {
  //     setDisabledInputId((prevId) => [
  //       ...prevId,
  //       ...selectedDates.map((date) => date.id),
  //     ]);
  //   }
  // }, [selectedDates]);

  // 상태 업데이트 후의 값을 로그로 확인하기 위한 useEffect
  useEffect(() => {
    console.log('State after update:', editSchedule);
  }, [editSchedule]); // selectedDates가 변경될 때마다 실행

  // useEffect(() => {
  //   console.log('disabled input: ', disabledInputId);
  // }, [disabledInputId]);

  return (
    <div>
      <label className="text-[24px] font-[700] block mb-[24px] text-var-black dark:text-var-gray2">
        예약 가능한 시간대
      </label>
      <div className="space-y-[20px]">
        <hr className="mt-[20px] mb-[20px]" />
        {selectedDates.map((selectedDate, index) => (
          <TimeSlotGroup
            key={selectedDate.id}
            id={selectedDate.id}
            index={index}
            isDefault={index === 0}
            handleClickPlus={handleClickPlus}
            handleClickMinus={() => {
              handleClickMinus(selectedDate.id);
            }}
            // disabled={disabledInputId.includes(selectedDate.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default TimeSlot;
