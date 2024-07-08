import { ModalProps } from '@/components/Modal/Modal.types';
import { atom } from 'recoil';

export const modalState = atom<ModalProps>({
  key: 'modalState',
  default: {
    title: '',
    isOpen: false,
    hasButton: true,
    buttonChildren: '',
    callBackFnc: undefined,
    content: '',
  },
});
