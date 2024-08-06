import { DetailImageProps } from '@/components/MyActivity/Register/UploadImage.types';
import { atom } from 'recoil';

export interface ScheduleToAddProps {
  date: string;
  startTime: string;
  endTime: string;
  id: number;
}

interface ScheduleProps {
  toAdd: ScheduleToAddProps[];
  toRemove: ScheduleToAddProps[];
  idsToRemove: number[];
}

interface SelectedDateProps {
  date: string;
  startTime: string;
  endTime: string;
  id: number;
}

export const bannerImageState = atom<string[]>({
  key: 'bannerImageState',
  default: [],
});

export const detailImageState = atom<DetailImageProps[]>({
  key: 'detailImageState',
  default: [],
});

export const selectedDateState = atom<SelectedDateProps[]>({
  key: 'selectedDateState',
  default: [],
});

export const timeSlotCountState = atom<number>({
  key: 'timeSlotCount',
  default: 1,
});

export const addressState = atom<string>({
  key: 'addressState',
  default: '',
});

export const scheduleState = atom<ScheduleProps>({
  key: 'scheduleState',
  default: {
    toAdd: [],
    toRemove: [],
    idsToRemove: [],
  },
});
