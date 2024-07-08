import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '@/states/modalState';
import { CloseButtonBig, PrimaryButton } from '../Button/Button';

function Modal() {
  const [modal, setModal] = useRecoilState(modalState);

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const handleCallback = () => {
    if (modal.callBackFnc) {
      modal.callBackFnc();
    }
    closeModal();
  };

  useEffect(() => {
    if (modal.isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [modal.isOpen]);

  return (
    modal.isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="bg-white rounded-lg border border-nomad-black w-[480px] min-h-[600px] text-lg flex flex-col items-center p-6 relative">
          <div className="w-full flex justify-between items-center mb-5">
            <h2 className="text-[28px] font-bold">{modal.title}</h2>
            <CloseButtonBig onClick={closeModal} />
          </div>
          <div className="flex-1 w-full overflow-auto">{modal.content}</div>
          {modal.hasButton && (
            <div className="absolute bottom-6 w-full mt-5 px-6">
              <PrimaryButton
                size="large"
                style={!modal.disabled ? 'dark' : 'disabled'}
                children={modal.buttonChildren || '작성하기'}
                onClick={handleCallback}
                disabled={modal.disabled}
              />
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default Modal;
