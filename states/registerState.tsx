import { DetailImageProps } from '@/components/MyActivity/Register/UploadImage.types';
import { atom } from 'recoil';

export const bannerImageState = atom<string[]>({
  key: 'bannerImageState',
  default: [],
});

export const detailImageState = atom<DetailImageProps[]>({
  key: 'detailImageState',
  default: [],
});

const initialDateArray = Array(50).fill('');

export const selectedDateState = atom<string[]>({
  key: 'selectedDateState',
  default: initialDateArray,
});

const initialTimeArray = Array(50).fill('00:00');

export const timeSlotState = atom<{ id: number }[]>({
  key: 'timeSlot',
  default: [],
});

export const timeSlotCountState = atom<number>({
  key: 'timeSlotCount',
  default: 1,
});

export const startTimeState = atom<string[]>({
  key: 'startTimeState',
  default: initialTimeArray,
});

export const endTimeState = atom<string[]>({
  key: 'endTimeState',
  default: initialTimeArray,
});

export const addressState = atom<string>({
  key: 'addressState',
  default: '',
});
