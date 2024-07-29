import Image from 'next/image';
import TestImg from '@/public/image/TestImage.jpg';
import { ViewedActivityProps } from './ViewedActivities.type';
import Link from 'next/link';
import { useRouter } from 'next/router';

function ViewedActivity({ id, bannerImage, title }: ViewedActivityProps) {
  const router = useRouter();
  const linkToClick = () => {
    router.push(`/activity-details/${id}`);
  };

  return (
    <div
      className="min-w-[140px] min-h-[80px] rounded bg-gray-200 flex items-center justify-between cursor-pointer block hover:bg-gray-300"
      onClick={linkToClick}
    >
      <Image
        src={bannerImage}
        alt="배너이미지"
        width={42}
        height={40}
        className="ml-[10px] min-w-[42px] min-h-[40px] max-w-[42px] max-h-[40px]"
      />
      <div className="mr-[10px] font-sans text-[12px] font-[700] w-[70px] h-[38px] line-clamp-2 overflow-hidden">
        {title}
      </div>
    </div>
  );
}

export default ViewedActivity;
