import { ModalProps } from '@/components/Modal/Modal.types';
import { modalState } from '@/states/modalState';
import { useRecoilState } from 'recoil';

export const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const openModal = (props: Omit<ModalProps, 'isOpen'>) => {
    setModal({
      ...props,
      isOpen: true,
    });
  };

  const closeModal = () => {
    setModal({
      ...modal,
      isOpen: false,
    });
  };

  // 브라우저 뒤로가기 버튼이벤트 발생 시 모달 닫기
  window.addEventListener('popstate', function (event) {
    closeModal();
  });

  return { openModal, closeModal };
};
