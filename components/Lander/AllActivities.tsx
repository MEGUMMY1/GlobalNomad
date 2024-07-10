import Image from 'next/image';
import StarImg from '@/public/icon/Star.svg';
import CatergoryBtn from '../CatergoryBtn/CatergoryBtn';
import PriceFilterBtn from '../PriceFilterBtn/PriceFilterBtn';

const Kategories = ['문화 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

function AllActivity() {
  return (
    <div>
      <div
        className="w-[286px] t:w-[223px] m:w-[170px] h-[286px] t:h-[223px] m:h-[170px] rounded-xl bg-[url('/image/Testimage.jpg')]"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.10) 20.33%, rgba(0, 0, 0, 0.60) 100%),url("/image/Testimage.jpg")',
        }}
      ></div>
      <div>
        <div className="flex items-center mt-[16.5px]">
          <Image
            src={StarImg}
            alt="별점 표시 이미지"
            width={20}
            height={20}
          ></Image>
          <div className="font-sans text-[16px] font-[500] ml-[5px]">
            별 점{' '}
            <span className="font-sans text-[16px] text-[#A1A1A1] font-[500] ">
              (리뷰 수)
            </span>
          </div>
        </div>
        <div className="font-sans text-[24px] m:text-[18px] font-[600] mt-[10px]">
          체험 제목
        </div>
        <div className="font-sans text-[28px] text-[20px] font-[700] mt-[15px]">
          ₩ 가격 <span className="font-sans text-[20px] text-[16px] font-[400]">/ 인</span>
        </div>
      </div>
    </div>
  );
}

function AllActivities() {
  return (
    <div>
      <div className="flex justify-between">
        <div className='relative t:w-[520px] m:w-[230px]'>
          <div className="flex gap-[24px] t:gap-[14px] m:gap-[8px] t:w-[520px] m:w-[230px] overflow-auto scrollbar-hide">
            {Kategories.map((Kategorie) => (
              <CatergoryBtn categoryName={Kategorie} />
            ))}
          </div>
          <div className="p:hidden absolute top-0 right-0 w-20 m:w-3 h-full pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>
        <PriceFilterBtn />
      </div>
      <div className="font-sans text-[36px] font-[700] mt-[40px]">
        🛼 모든 체험
      </div>
      <div className="grid grid-cols-4 t:grid-cols-3 m:grid-cols-2 grid-rows-2 gap-[20px] t:gap-[14px] m:gap-[6px] gap-y-[48px] mb-[40px] overflow-auto scrollbar-hide">
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
      </div>
      <div className='text-[30px] font-[700] flex justify-center mb-[342px] mt-[70px]'>페이지네이션 버튼</div>
    </div>
  );
}

export default AllActivities;
