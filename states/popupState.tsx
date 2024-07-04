import { PopupProps } from '@/components/Popup/Popup.types';
import { atom } from 'recoil';

export const popupState = atom<PopupProps>({
  key: 'popupState',
  default: {
    isOpen: false,
    popupType: '',
    content: '',
    btnName: [''],
    callBackFnc: undefined,
  },
});
