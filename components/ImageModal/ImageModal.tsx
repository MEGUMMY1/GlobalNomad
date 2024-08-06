import useClickOutside from '@/hooks/useClickOutside';
import { ImageModalState } from '@/states/ImageModalState';
import Image from 'next/image';
import { useRecoilState } from 'recoil';

export default function ImageModal() {
  const [ImageModal, setImageModal] = useRecoilState(ImageModalState);

  const contentsArea = useClickOutside<HTMLDivElement>(() =>
    setImageModal({ ...ImageModal, isOpen: false })
  );

  const closeModal = () => {
    setImageModal({ ...ImageModal, isOpen: false });
  };

  return ImageModal.isOpen && window ? (
    <div className="fixed inset-0 p-[50px] pt-[140px] flex items-center justify-center bg-black dark:bg-opacity-90 bg-opacity-80 z-50 m:p-0">
      <div ref={contentsArea} className="relative">
        <img
          src={ImageModal.imageUrl}
          alt="이미지 자세히보기 모달 이미지"
          className="h-[600px] t:max-h-[500px] t:h-full t:min-h-[400px] t:max-w-[700px] m:w-full m:h-full"
        />
        <button
          onClick={closeModal}
          className="absolute right-[-40px] top-[-40px] m:right-0 m:top-0"
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
