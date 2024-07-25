export interface PopupProps {
  isOpen: boolean;
  popupType: '' | 'alert' | 'select';
  content: string;
  btnName: [string, string?];
  callBackFnc?: () => void;
}

export interface ClosePopupProps {
  closePopup: () => void;
}

export interface ChatPopupProps {
  closePopup: () => void;
  activityId: number;
}
