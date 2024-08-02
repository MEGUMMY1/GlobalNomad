import useClickOutside from '@/hooks/useClickOutside';
import { ImageModalState } from '@/states/ImageModalState';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { CloseButtonBig } from '../Button/Button';

export default function ImageModal() {
  const [ImageModal, setImageModal] = useRecoilState(ImageModalState);

  const contentsArea = useClickOutside<HTMLDivElement>(() =>
    setImageModal({ ...ImageModal, isOpen: false })
  );

  const closeModal = () => {
    setImageModal({ ...ImageModal, isOpen: false });
  };

  return ImageModal.isOpen && window ? (
    <div className="fixed inset-0 p-[50px] flex items-center justify-center bg-black dark:bg-opacity-50 bg-opacity-80 z-50">
      <div ref={contentsArea} className="relative">
        <Image
          src={ImageModal.imageUrl}
          alt="이미지 자세히보기 모달 이미지"
          width={400}
          height={400}
        />
        <button
          onClick={closeModal}
          className="absolute right-[-40px] top-[-40px]"
        >
          <Image
            src="/icon/btn_x_medium.svg"
            width={40}
            height={40}
            alt="닫기"
          />
        </button>
      </div>
    </div>
  ) : null;
}
