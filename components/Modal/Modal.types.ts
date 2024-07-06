export interface ModalProps {
  title: string;
  isOpen: boolean;
  hasButton: boolean;
  callBackFnc?: () => void;
}
