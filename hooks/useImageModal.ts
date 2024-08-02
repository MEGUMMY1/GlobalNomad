import { ImageModalProps } from '@/components/ImageModal/ImageModalProps';
import { ModalProps } from '@/components/Modal/Modal.types';
import { ImageModalState } from '@/states/ImageModalState';
import { modalState } from '@/states/modalState';
import { useRecoilState } from 'recoil';

export const useImageModal = () => {
  const [imageModal, setImageModal] = useRecoilState(ImageModalState);

  const openImageModal = (props: Omit<ImageModalProps, 'isOpen'>) => {
    setImageModal({
      ...props,
      isOpen: true,
    });
  };

  return openImageModal;
};
