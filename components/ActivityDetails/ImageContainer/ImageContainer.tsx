import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { ImageContainerProps } from './ImageContainer.types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { PaginationButton } from '@/components/Button/Button';
import { useImageModal } from '@/hooks/useImageModal';

export default function ImageContainer({
  bannerImageUrl,
  subImages,
}: ImageContainerProps) {
  const defaultImage = '/image/globalnomad.png';
  const filledSubImages = [...subImages];
  const openImageModal = useImageModal();

  // 빈 자리는 기본 이미지 채워 넣음
  for (let i = subImages.length + 1; i <= 4; i++) {
    filledSubImages.push({ id: i, imageUrl: defaultImage });
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <PaginationButton direction="next" />,
    prevArrow: <PaginationButton direction="prev" />,
  };

  // 모바일 전용 슬라이드 이미지 배열
  const mobileImages = [
    { id: 0, imageUrl: bannerImageUrl },
    ...subImages,
  ].filter((image) => image.imageUrl !== defaultImage);

  // 모바일에서 SubImage가 없으면 Slider 사용 안 함
  const shouldUseSlider = subImages.length > 0;

  return (
    <div className="flex max-w-[1200px] h-[500px] gap-2 my-10 t:w-full t:h-[310px] m:w-full m:h-[300px] m:my-6 m:justify-center m:relative m:left-0 m:right-0">
      <button
        className={`relative w-1/2 h-full ${shouldUseSlider ? 'm:hidden' : 'm:block m:w-full'}`}
        onClick={() => openImageModal({ imageUrl: bannerImageUrl })}
      >
        <Image
          src={bannerImageUrl}
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
          className="object-cover rounded-l-lg m:rounded-none"
        />
      </button>
      <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-2 rounded-r-lg overflow-hidden m:hidden">
        {filledSubImages.map((image) => (
          <button
            key={image.id}
            className="relative w-full h-full overflow-hidden"
            onClick={() => openImageModal({ imageUrl: image.imageUrl })}
          >
            <Image
              src={image.imageUrl}
              alt={`SubImage ${image.id}`}
              layout="fill"
              objectFit="cover"
              className="object-cover"
            />
          </button>
        ))}
      </div>
      {shouldUseSlider && (
        <div className="hidden m:block m:w-screen m:h-full">
          <Slider {...settings}>
            {mobileImages.map((image) => (
              <div
                key={image.id}
                className="m:relative m:w-full m:h-[300px] outline-none"
              >
                <Image
                  src={image.imageUrl}
                  alt={`Image ${image.id}`}
                  layout="fill"
                  objectFit="cover"
                  className="object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}
