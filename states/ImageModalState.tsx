import { ImageModalProps } from '@/components/ImageModal/ImageModalProps';
import { atom } from 'recoil';

export const ImageModalState = atom<ImageModalProps>({
  key: 'ImageModalState',
  default: {
    isOpen: false,
    imageUrl: '',
  },
});
