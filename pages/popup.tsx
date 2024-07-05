import { usePopup } from '@/hooks/usePopup';
import React from 'react';

const popup = () => {
  const { openPopup } = usePopup();

  return (
    <div className="h-[120vh]">
      <button
        onClick={() =>
          openPopup({
            popupType: 'alert',
            content: '가입이 완료되었습니다!',
            btnName: ['확인'],
            callBackFnc: () => alert('여기에 이벤트 추가하면 됩니다!'),
          })
        }
      >
        [가입하기]
      </button>
      <button
        onClick={() =>
          openPopup({
            popupType: 'select',
            content: '예약을 취소하시겠어요?',
            btnName: ['아니오', '취소하기'],
            callBackFnc: () => alert('여기에 이벤트 추가하면 됩니다!'),
          })
        }
      >
        [취소하기]
      </button>
    </div>
  );
};

export default popup;
