import { atom } from 'recoil';

export const sideNavigationState = atom<boolean>({
  key: 'sideNavigationState',
  default: false,
});
