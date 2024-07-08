import Image from 'next/image';
import Testimgae from './TestImage.jpg';
import SearchBar from '../SearchBar/Searchbar';
import BestActivities from './BestActivities';

function Main() {
  const date = new Date();
  const month = date.getMonth() + 1;

  return (
    <main className="flex flex-col justift-center items-center">
      <section
        className="z-0 w-screen h-[550px] m:h-[240px] overflow-hidden absolute left-0 top-[70px] bg-cover bg-center bg-[url('/image/Testimage.jpg')] flex items-center "
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.40) 100%), url("/image/Testimage.jpg")',
        }}
      ></section>
      <div className="z-10 absolute t:w-[696px] m:w-[343px]">
        <div className=" mt-[160px] m:mt-[74px] flex flex-col gap-[20px]">
          <h1 className="text-white font-sans text-[68px] m:text-[24px] font-[700] leading-[1.2]">
            Test <br />
            Test
          </h1>
          <span className="text-white font-sans test-[24px] m:text-[14px] font-[700]">
            {month} 월의 인기 체험 BEST 🔥
          </span>
        </div>
        <div className="mt-[120px] flex justify-center">
          <SearchBar></SearchBar>
        </div>
        <div className='mt-[40px]'>
          <BestActivities></BestActivities>
        </div>
      </div>
    </main>
  );
}

export default Main;
