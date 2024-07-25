import Image from 'next/image';
import TestImg from '@/public/image/TestImage.jpg';

interface ViewedActivityProps {
  bannerImage: string;
  title: string;
}

function ViewedActivity({ bannerImage, title }: ViewedActivityProps) {
  return (
    <div className="w-[140px] h-[60px] rounded bg-gray-300 flex items-center justify-between cursor-pointer">
      <Image src={TestImg} alt="배너이미지" width={40} height={40} className='ml-[10px]' />
      <div className='mr-[10px] font-sans text-[12px] font-[700] w-[70px] h-[38px] line-clamp-2 overflow-hidden'>[TEST] 체험 제목 체험 제목 체험 제목</div>
    </div>
  );
}

export default ViewedActivity;