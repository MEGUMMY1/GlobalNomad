import CatergoryBtn from '../CatergoryBtn/CatergoryBtn';
import PriceFilterBtn from '../PriceFilterBtn/PriceFilterBtn';

const Kategories = ['문화 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

function AllActivity() {
  return (
    <div>
      <div
        className="w-[286px] h-[286px] rounded-xl bg-[url('/image/Testimage.jpg')]"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.10) 20.33%, rgba(0, 0, 0, 0.60) 100%),url("/image/Testimage.jpg")',
        }}
      ></div>
      <div></div>
    </div>
  );
}

function AllActivities() {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-[24px]">
          {Kategories.map((Kategorie) => (
            <CatergoryBtn categoryName={Kategorie} />
          ))}
        </div>
        <PriceFilterBtn />
      </div>
      <div className="font-sans text-[36px] font-[700] mt-[40px]">
        🛼 모든 체험
      </div>
      <div className='grid grid-cols-4 grid-rows-2 gap-[20px] mb-[40px] overflow-auto scrollbar-hide'>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
        <AllActivity></AllActivity>
      </div>
    </div>
  );
}

export default AllActivities;
