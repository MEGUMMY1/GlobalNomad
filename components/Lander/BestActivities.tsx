import Image from 'next/image';
import { PaginationArrowButton } from '../Button/Button';
import StarImg from '@/public/icon/Star.svg';

function BestActivity() {
  return (
    <div
      className="relative w-[384px] m:w-[186px] h-[384px] m:h-[186px] rounded-3xl border bg-gray-300 flex flex-col justify-center bg-[url('/image/Testimage.jpg')] cursor-pointer shrink-0 bg-cover bg-center"
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 33.33%, rgba(0, 0, 0, 0.80) 91.67%), url("/image/Testimage.jpg")',
      }}
    >
      <div className="flex gap-[5px] absolute left-[20px] bottom-[166px] m:bottom-[98px]">
        <Image
          src={StarImg}
          alt="별점 표시 이미지"
          width={18}
          height={18}
        ></Image>
        <span className="font-sans text-[14px] font-[600] text-white">
          별점 (리뷰 수)
        </span>
      </div>
      <div className="font-sans text-[30px] m:text-[18px] font-[700] absolute left-[20px] bottom-[74px] m:bottom-[50px] text-white">
        체험 제목 체험 제목
      </div>
      <div className="font-sans text-[20px] m:text-[16px] font-[700] absolute left-[20px] bottom-[39px] m:bottom-[24px] text-white">
        가격 / 인
      </div>
    </div>
  );
}

function BestActivities() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="text-[36px] m:text-[18px] font-[700]">
          🔥 인기 체험
        </span>
        <div className="t:hidden m:hidden">
          {/* <PaginationArrowButton></PaginationArrowButton> */}
        </div>
      </div>
      <div className="flex gap-[32px] m:gap-[16px] mt-[34px] overflow-auto scrollbar-hide">
        <BestActivity></BestActivity>
        <BestActivity></BestActivity>
        <BestActivity></BestActivity>
      </div>
    </div>
  );
}

export default BestActivities;
