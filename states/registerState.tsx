import { atom } from 'recoil';

export const bannerImageState = atom<File[]>({
  key: 'bannerImageState',
  default: [],
});

export const detailImageState = atom<File[]>({
  key: 'detailImageState',
  default: [],
});

const initialDateArray = Array(50).fill('');

export const selectedDateState = atom<string[]>({
  key: 'selectedDateState',
  default: initialDateArray,
});

const initialTimeArray = Array(50).fill('00:00');

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
