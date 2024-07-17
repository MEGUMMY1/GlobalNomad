import { MyInfoResponse } from '@/pages/api/users/apiUser.types';
import { atom } from 'recoil';

export const userDefaultState = {
  id: 0,
  email: '',
  nickname: '',
  profileImageUrl: '',
  createdAt: '',
  updatedAt: '',
};

export const userState = atom<MyInfoResponse>({
  key: 'userState',
  default: userDefaultState,
});
