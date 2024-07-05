export interface PopupProps {
  isOpen: boolean;
  popupType: '' | 'alert' | 'select';
  content: string;
  btnName: [string, string?];
  callBackFnc?: () => void;
}
