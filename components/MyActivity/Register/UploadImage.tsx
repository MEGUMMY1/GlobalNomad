import { useState } from 'react';
import { bannerImageState, detailImageState } from '@/states/registerState';
import {
  CircleCloseButton,
  ImageUploadButton,
} from '@/components/Button/Button';
import Image from 'next/image';
import { UploadImageProps } from './UploadImage.types';
import useActivityImage from '@/hooks/myActivity/useActivityImage';
import { useRecoilState } from 'recoil';

const KEYS = [0, 1, 2, 3, 4];

function UploadImage({
  label,
  maxImages,
  singleImage = false,
}: UploadImageProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [bannerImage, setBannerImage] = useRecoilState(bannerImageState);
  const [detailImage, setDetailImage] = useRecoilState(detailImageState);

  const { postActivityImageMutation } = useActivityImage();

  const uploadImageMutation = async (image: File) => {
    try {
      const response = await postActivityImageMutation.mutateAsync(image);
      return response.activityImageUrl;
    } catch (error) {
      console.error('Failed to upload image:', error);
      return '';
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = await uploadImageMutation(file);
      if (singleImage) {
        setSelectedImages([url]);
        setBannerImage([url]);
      } else if (selectedImages.length < maxImages) {
        setSelectedImages([...selectedImages, url]);
        setDetailImage([
          ...detailImage,
          { id: selectedImages.length + 1, imageUrl: url },
        ]);
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);

    if (singleImage) {
      setBannerImage([]);
    } else {
      const newDetailImages = [...detailImage];
      newDetailImages.splice(index, 1);
      setDetailImage(newDetailImages);
    }
  };

  return (
    <div>
      <label className="text-[24px] font-[700] text-var-black">{label}</label>
      {label === '소개 이미지' ? (
        <span className="text-var-gray7">{`\u00A0\u00A0\u00A0\u00A0*이미지는 최대 4개까지 등록 가능합니다.`}</span>
      ) : null}
      <div
        className={`grid items-end ${singleImage ? 'grid-rows-1 grid-cols-4 t:grid-cols-2 m:grid-cols-2' : 'grid-rows-2 grid-cols-4 t:grid-rows-3 t:grid-cols-2 m:grid-rows-3 m:grid-cols-2'} gap-[24px]`}
      >
        <div className="mt-[24px]">
          <label
            htmlFor={`upload-${label}`}
            className={`cursor-pointer ${selectedImages.length === maxImages ? 'pointer-events-none' : ''}`}
          >
            <ImageUploadButton />
          </label>
          <input
            type="file"
            id={`upload-${label}`}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        {singleImage ? (
          bannerImage[0] ? (
            <div
              key={KEYS[4]}
              className="relative w-[180px] h-[180px] t:w-[206px] t:h-[206px] m:w-[167px] m:h-[167px]"
            >
              <Image
                src={bannerImage[0]}
                alt="배너 이미지"
                width={180}
                height={180}
                className="w-[180px] h-[180px] t:w-[206px] t:h-[206px] m:w-[167px] m:h-[167px] object-cover rounded-[24px]"
              />
              <div className="absolute -top-[20px] -right-[20px] t:-top-[12px] t:-right-[12px] m:-top-[7px] m:-right-[7px]">
                <CircleCloseButton onClick={() => handleRemoveFile(0)} />
              </div>
            </div>
          ) : null
        ) : (
          detailImage.map((image, index) => (
            <div
              key={KEYS[index]}
              className="relative w-[180px] h-[180px] t:w-[206px] t:h-[206px] m:w-[167px] m:h-[167px]"
            >
              <Image
                src={image.imageUrl}
                alt={`소개 이미지 ${index + 1}`}
                width={180}
                height={180}
                className="w-[180px] h-[180px] t:w-[206px] t:h-[206px] m:w-[167px] m:h-[167px] object-cover rounded-[24px]"
              />
              <div className="absolute -top-[20px] -right-[20px] t:-top-[12px] t:-right-[12px] m:-top-[7px] m:-right-[7px]">
                <CircleCloseButton onClick={() => handleRemoveFile(index)} />
              </div>
            </div>
          ))
        )}
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
