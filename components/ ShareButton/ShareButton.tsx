import { useModal } from '@/hooks/useModal';
import Image from 'next/image';
import { useRouter } from 'next/router';

export function ShareButton({
  activityId,
  title,
  bannerImageUrl,
  description,
}: ShareButtonProps) {
  const { openModal } = useModal();

  const handleKaKaoShare = () => {
    const { Kakao } = window;
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: description,
        imageUrl: bannerImageUrl,
        link: {
          mobileWebUrl: `https://globalnomad-5-8.netlify.app/activity-details/${activityId}`,
          webUrl: `https://globalnomad-5-8.netlify.app/activity-details/${activityId}`,
        },
      },
    });
  };

  const url = `https://globalnomad-5-8.netlify.app/activity-details/${activityId}`;
  const text = `${title}\n\n${description}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const handleFacebookShare = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    window.open(facebookShareUrl, '_blank');
  };

  const handleXShare = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    window.open(twitterShareUrl, '_blank');
  };

  const handlePasteURL = () => {};

  const handleOnClick = (e: any) => {
    e.stopPropagation();
    openModal({
      title: '체험 공유하기',
      hasButton: false,
      buttonChildren: '예약하기',
      content: (
        <div className="flex flex-col items-center gap-[30px]">
          <div className="w-[200px] h-[200px] relative border rounded-lg overflow-hidden">
            <Image
              src={bannerImageUrl}
              alt="체험 배너 이미지"
              fill
              layout="fill"
              objectFit="cover"
              className="object-cover"
            />
          </div>
          <p>{title}</p>
          <div className="grid grid-cols-2 grid-rows-2 gap-y-[30px] gap-x-[15px] mt-[10px]">
            <SNSShareBUtton
              imageUrl="/icon/link.png"
              title="URL 복사하기"
              description={description}
            />
            <SNSShareBUtton
              imageUrl="/image/kakao.png"
              title="카카오로 공유하기"
              onClick={handleKaKaoShare}
            />
            <SNSShareBUtton
              imageUrl="/icon/twitter.png"
              title="X로 공유하기"
              onClick={handleXShare}
            />
            <SNSShareBUtton
              imageUrl="/icon/facebookIconforShare.png"
              title="페이스북으로 공유하기"
              onClick={handleFacebookShare}
            />
          </div>
        </div>
      ),
    });
  };

  return (
    <button
      type="button"
      className="h-[40px] w-[40px] absolute bg-[#fafafa] z-1001 right-[20px] bottom-[20px] opacity-50 flex items-center justify-center border rounded-full p-[5px] hover:scale-110"
      onClick={handleOnClick}
    >
      <div className="h-[22px] w-[20px] relative">
        <Image src="/icon/share.png" alt="공유 버튼" layout="fill" />
      </div>
    </button>
  );
}

function SNSShareBUtton({ imageUrl, title, onClick }: SNSShareBUttonProps) {
  return (
    <button className={ShareButtonStyle} onClick={onClick}>
      <div className="w-[20px] h-[20px] relative">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          className="rounded-full object-cover"
        />
      </div>
      {title}
    </button>
  );
}

const shareButtonStyle = {
  true: '',
};

interface SNSShareBUttonProps {
  imageUrl: string;
  title: string;
  description?: string;
  onClick?: () => void;
}
interface ShareButtonProps {
  title: string;
  bannerImageUrl: string;
  description: string;
  activityId: number;
}

const ShareButtonStyle =
  'min-w-[200px] border border-black rounded-lg text-[16px] text-left py-[5px] px-[10px] flex items-center gap-[8px]';
