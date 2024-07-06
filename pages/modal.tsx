import { useModal } from '@/hooks/useModal';
import React from 'react';

const modal = () => {
  const { openModal } = useModal();

  return (
    <div className="h-[120vh]">
      <button
        onClick={() =>
          openModal({
            title: '날짜',
            hasButton: true,
            callBackFnc: () => alert('여기에 이벤트 추가하면 됩니다!'),
          })
        }
      >
        [버튼있음]
      </button>
      <button
        onClick={() =>
          openModal({
            title: '예약 정보',
            hasButton: false,
          })
        }
      >
        [버튼없음]
      </button>
    </div>
  );
};

export default modal;
