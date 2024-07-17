import { useState } from 'react';
import { bannerImageState, detailImageState } from '@/states/registerState';
import {
  CircleCloseButton,
  ImageUploadButton,
} from '@/components/Button/Button';
import Image from 'next/image';
import { UploadImageProps } from './UploadImage.types';
import { useRecoilState } from 'recoil';

function UploadImage({
  label,
  maxImages,
  singleImage = false,
}: UploadImageProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [keys, setKeys] = useState<number[]>([]);
  const [bannerImage, setBannerImage] = useRecoilState(bannerImageState);
  const [detailImage, setDetailImage] = useRecoilState(detailImageState);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (singleImage) {
        setSelectedImages([file]);
        setBannerImage([file]);
        setKeys([Date.now()]);
      } else if (selectedImages.length < maxImages) {
        setSelectedImages([...selectedImages, file]);
        setDetailImage([...selectedImages, file]);
        setKeys([...keys, Date.now()]);
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);

    const newKeys = [...keys];
    newKeys.splice(index, 1);
    setKeys(newKeys);

    if (singleImage) {
      setBannerImage(newImages);
    } else {
      setDetailImage(newImages);
    }
  };

  return (
    <div>
      <label className="text-[24px] font-[700] text-var-black">{label}</label>
      {label === '소개 이미지' ? (
        <span className="text-var-gray7">{`\u00A0\u00A0\u00A0\u00A0*이미지는 최대 4개까지 등록 가능합니다.`}</span>
      ) : null}
      <div
        className={`grid ${singleImage ? 'grid-rows-1 grid-cols-4 t:grid-cols-2 m:grid-cols-2' : 'grid-rows-2 grid-cols-4 t:grid-rows-3 t:grid-cols-2 m:grid-rows-3 m:grid-cols-2'} gap-[24px]`}
      >
        <div className="mt-[24px]">
          <label
            htmlFor={`upload-${label}`}
            className={`cursor-pointer ${selectedImages.length === maxImages ? 'pointer-events-none' : ''}`}
          >
            <ImageUploadButton />
          </label>
          <input
            key={keys.length}
            type="file"
            id={`upload-${label}`}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        {selectedImages.map((image, index) => (
          <div
            key={keys[index]}
            className="relative w-[180px] h-[180px] t:w-[206px] t:h-[206px] m:w-[167px] m:h-[167px]"
          >
            <Image
              src={URL.createObjectURL(image)}
              alt={`상세 이미지 ${index + 1}`}
              width={180}
              height={180}
              className="w-[180px] h-[180px] t:w-[206px] t:h-[206px] m:w-[167px] m:h-[167px] object-cover rounded-[24px]"
            />
            <div className="absolute -top-[20px] -right-[20px] t:-top-[12px] t:-right-[12px] m:-top-[7px] m:-right-[7px]">
              <CircleCloseButton onClick={() => handleRemoveFile(index)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UploadBannerImage() {
  return <UploadImage label="배너 이미지" maxImages={1} singleImage />;
}

export function UploadDetailImage() {
  return <UploadImage label="소개 이미지" maxImages={4} singleImage={false} />;
}
