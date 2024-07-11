import { useState } from 'react';
import {
  CircleCloseButton,
  ImageUploadButton,
} from '@/components/Button/Button';
import Image from 'next/image';
import { UploadImageProps } from './UploadImage.types';

function UploadImage({
  label,
  maxImages,
  singleImage = false,
}: UploadImageProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [keys, setKeys] = useState<number[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (singleImage) {
        setSelectedImages([file]);
        setKeys([Date.now()]);
      } else if (selectedImages.length < maxImages) {
        setSelectedImages([...selectedImages, file]);
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
  };

  return (
    <div>
      <label className="text-[24px] font-[700] text-var-black block mb-[24px]">
        {label}
      </label>

      <div
        className={`grid ${singleImage ? 'grid-rows-1 grid-cols-4' : 'grid-rows-2 grid-cols-4 '} gap-[24px]`}
      >
        <div>
          <label
            htmlFor={`upload-${keys.length}`}
            className={`cursor-pointer ${selectedImages.length === maxImages ? 'pointer-events-none' : ''}`}
          >
            <ImageUploadButton />
          </label>
          <input
            key={keys.length}
            type="file"
            id={`upload-${keys.length}`}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        {selectedImages.map((image, index) => (
          <div key={keys[index]} className="relative w-[180px] h-[180px]">
            <Image
              src={URL.createObjectURL(image)}
              alt={`상세 이미지 ${index + 1}`}
              width={180}
              height={180}
              className="w-[180px] h-[180px] object-cover rounded-[24px]"
            />
            <div className="absolute -top-[20px] -right-[20px]">
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
