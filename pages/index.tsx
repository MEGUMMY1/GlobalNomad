import CatergoryBtn from '@/components/CatergoryBtn/CatergoryBtn';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import PriceFilterBtn from '@/components/PriceFilterBtn/PriceFilterBtn';

export default function Home() {
  return (
    <>
      <NavigationBar /> <CatergoryBtn categoryName="버튼이름 예시" />{' '}
      <PriceFilterBtn />
    </>
  );
}
