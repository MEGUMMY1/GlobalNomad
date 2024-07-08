import CatergoryBtn from '../CatergoryBtn/CatergoryBtn';

const Kategories = ['문화 예술', '식음료', '스포츠', '투어', '관광' , '웰빙'];

function AllActivities() {
  return (
    <div>
      <div className="flex gap-[24px]">
        {Kategories.map((Kategorie) => (
          <CatergoryBtn categoryName={Kategorie} />
        ))}
      </div>
      <div className="font-sans text-[36px] font-[700] mt-[40px]">
        🛼 모든 체험
      </div>
    </div>
  );
}

export default AllActivities;
