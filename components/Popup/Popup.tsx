import { popupState } from '@/states/popupState';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Image from 'next/image';

function Popup() {
  const [popup, setPopup] = useRecoilState(popupState);

  const closePopup = () => {
    setPopup({ ...popup, isOpen: false });
  };

  const handleCallback = () => {
    if (popup.callBackFnc) {
      popup.callBackFnc();
    }
    closePopup();
  };

  useEffect(() => {
    if (popup.isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [popup.isOpen]);

  return (
    popup.isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        {popup.popupType === 'alert' ? (
          <div className="bg-white rounded-lg w-[540px] h-[250px] text-lg flex flex-col items-center justify-center p-4 relative m:w-[327px] m:h-[220px] m:text-base">
            <p className="mb-4 text-center text-nomad-black">{popup.content}</p>
            <button
              className="absolute bottom-7 right-7 w-[120px] h-[48px] bg-nomad-black text-white py-2 rounded-lg hover:bg-var-black m:right-auto m:left-1/2 m:transform m:-translate-x-1/2 m:bottom-4 m:text-sm m:w-[138px] m:h-[42px] m:mb-2"
              onClick={handleCallback}
            >
              {popup.btnName[0]}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl w-[298px] h-[184px] flex flex-col items-center justify-center p-6">
            <div className="flex justify-center mb-6">
              <Image
                src="/icon/popup_check.svg"
                width={24}
                height={24}
                alt="check icon"
              />
            </div>
            <div className="flex flex-col justify-between h-full">
              <p className="mb-4 text-center text-nomad-black">
                {popup.content}
              </p>
              <div className="flex justify-between gap-2">
                <button
                  className="w-[80px] h-[38px] bg-white text-nomad-black font-bold text-sm py-2 rounded-md border border-nomad-black hover:bg-var-gray3"
                  onClick={closePopup}
                >
                  {popup.btnName[0]}
                </button>
                <button
                  className="w-[80px] h-[38px] bg-nomad-black text-white font-bold text-sm py-2 rounded-md hover:bg-var-black"
                  onClick={handleCallback}
                >
                  {popup.btnName[1]}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default Popup;
