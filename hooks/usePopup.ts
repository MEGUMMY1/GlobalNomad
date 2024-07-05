import { useRecoilState } from 'recoil';
import { popupState } from '@/states/popupState';
import { PopupProps } from '@/components/Popup/Popup.types';

export const usePopup = () => {
  const [popup, setPopup] = useRecoilState(popupState);

  const openPopup = (props: Omit<PopupProps, 'isOpen'>) => {
    setPopup({
      ...props,
      isOpen: true,
    });
  };

  const closePopup = () => {
    setPopup({
      ...popup,
      isOpen: false,
    });
  };

  return { openPopup, closePopup };
};
