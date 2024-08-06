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

  const closeImageModal = () => {
    setImageModal({
      ...imageModal,
      isOpen: false,
    });
  };

  // 브라우저 뒤로가기 버튼이벤트 발생 시 모달 닫기
  window.addEventListener('popstate', function (event) {
    closeImageModal();
  });

  return openImageModal;
};
