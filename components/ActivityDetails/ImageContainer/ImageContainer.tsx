import React from 'react';
import Image from 'next/image';
import { ImageContainerProps } from './ImageContainer.types';

export default function ImageContainer({
  bannerImageUrl,
  subImages,
}: ImageContainerProps) {
  const defaultImage = '/image/globalnomad.png';
  const filledSubImages = [...subImages];

  // 빈 자리는 기본 이미지 채워 넣음
  for (let i = subImages.length; i < 4; i++) {
    filledSubImages.push({ id: i, imageUrl: defaultImage });
  }

  return (
    <div className="flex w-[1200px] h-[500px] gap-2 my-10">
      <div className="relative w-1/2 h-full">
        <Image
          src={bannerImageUrl}
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
          className="object-cover rounded-l-lg"
        />
      </div>
      <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-2 rounded-r-lg overflow-hidden">
        {filledSubImages.map((image) => (
          <div
            key={image.id}
            className="relative w-full h-full overflow-hidden"
          >
            <Image
              src={image.imageUrl}
              alt={`SubImage ${image.id}`}
              layout="fill"
              objectFit="cover"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
