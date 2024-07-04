import CatergoryBtn from '@/components/CatergoryBtn/CatergoryBtn';
import NavigationBar from '@/components/NavigationBar/NavigationBar';

export default function Home() {
  return (
    <>
      <NavigationBar /> <CatergoryBtn categoryName="버튼이름 예시" />
    </>
  );
}
