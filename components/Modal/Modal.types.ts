import { ReactNode } from 'react';

export interface ModalProps {
  title: string;
  isOpen: boolean;
  hasButton: boolean;
  buttonChildren?: string;
  callBackFnc?: () => void;
  disabled?: boolean;
  content: ReactNode;
}
