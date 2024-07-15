import { PrimaryButton } from '@/components/Button/Button';
import Card from '@/components/MyActivity/Card';
import SidenNavigation from '@/components/SideNavigation/SideNavigation';

function MyActivity() {
  const handleClickAdd = () => {};

  return (
    <div className="flex gap-[20px] py-[72px] m:gap-0">
      <div className="m:hidden">
        <SidenNavigation />
      </div>
      <div className="flex flex-col gap-[20px] t:w-full m:w-[calc(100vw-50px)] flex-shrink">
        <div className="flex justify-between">
          <h1 className="text-[32px] font-[700]">내 체험 관리</h1>
          <PrimaryButton size="small" style="dark" onClick={handleClickAdd}>
            체험 등록하기
          </PrimaryButton>
        </div>
        <div className="flex flex-col gap-[20px] overflow-y-auto">
          <Card
            activityImage="/image/VR 게임 마스터 하는 법.png"
            rating={4.9}
            reviewCount={249}
            title="VR 게임 마스터 하는 법"
            price={10000}
          />
          <Card
            activityImage="/image/VR 게임 마스터 하는 법.png"
            rating={4.9}
            reviewCount={249}
            title="VR 게임 마스터 하는 법"
            price={10000}
          />
          <Card
            activityImage="/image/VR 게임 마스터 하는 법.png"
            rating={4.9}
            reviewCount={249}
            title="VR 게임 마스터 하는 법"
            price={10000}
          />
          <Card
            activityImage="/image/VR 게임 마스터 하는 법.png"
            rating={4.9}
            reviewCount={249}
            title="VR 게임 마스터 하는 법"
            price={10000}
          />
        </div>
      </div>
    </div>
  );
}

export default MyActivity;
