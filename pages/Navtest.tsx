import CatergoryBtn from '@/components/CatergoryBtn/CatergoryBtn';
import NavigationBar from '@/components/Layout/NavigationBar';
import PriceFilterBtn from '@/components/PriceFilterBtn/PriceFilterBtn';

export default function Navtest() {
  return (
    <>
      <NavigationBar /> <CatergoryBtn categoryName="버튼이름 예시" />{' '}
      <PriceFilterBtn />
    </>
  );
}
