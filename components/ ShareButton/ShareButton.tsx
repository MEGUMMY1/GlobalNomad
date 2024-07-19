import { useModal } from '@/hooks/useModal';
import { usePopup } from '@/hooks/usePopup';
import Image from 'next/image';

export function ShareButton({
  type,
  activityId,
  title,
  bannerImageUrl,
  description,
}: ShareButtonProps) {
  const { openModal } = useModal();
  const { openPopup } = usePopup();

  const url = `https://globalnomad-5-8.netlify.app/activity-details/${activityId}`;
  const text = `${title}\n\n${description}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 복사되었습니다.');
    } catch (error) {
      console.error(error);
      openPopup({
        popupType: 'alert',
        content: '클립 보드 복사에 실패하였습니다.',
        btnName: ['확인'],
      });
    }
  };

  const handlePasteURL = () => {
    copyToClipboard(url);
  };

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

  const handleFacebookShare = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    window.open(facebookShareUrl, '_blank');
  };

  const handleXShare = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    window.open(twitterShareUrl, '_blank');
  };

  const handleOnClick = (e: any) => {
    e.stopPropagation();
    openModal({
      title: '체험 공유하기',
      hasButton: false,
      buttonChildren: '예약하기',
      content: (
        <div className="flex flex-col items-center gap-[30px] mt-[15px] mb-[25px] w-[400px] m:w-[300px] m-auto">
          <div className="w-[250px] h-[250px] relative border rounded-lg overflow-hidden">
            <Image
              src={bannerImageUrl ?? ''}
              alt="체험 배너 이미지"
              fill
              layout="fill"
              objectFit="cover"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-[10px] overflow-hidden">
            <p className="font-bold">{title}</p>
            <p className="text-gray-700 line-clamp-3">{description}</p>
          </div>
          <div className="flex w-full justify-between px-[10px]">
            <SNSShareButton
              imageUrl="/icon/link.png"
              title="URL 복사하기"
              onClick={handlePasteURL}
            />
            <SNSShareButton
              imageUrl="/icon/kakaotalk-logo.svg"
              title="카카오로 공유하기"
              onClick={handleKaKaoShare}
            />
            <SNSShareButton
              imageUrl="/icon/twitter-logo-2.svg"
              title="X로 공유하기"
              onClick={handleXShare}
            />
            <SNSShareButton
              imageUrl="/icon/facebook-3-2.svg"
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
      className={type === 'initial' ? InitialButtonStyle : NoneBgButtonStyle}
      onClick={handleOnClick}
    >
      <div
        className={
          type === 'initial'
            ? 'h-[22px] w-[20px] relative m:h-[17px] m:w-[15px]'
            : 'h-[30px] w-[30px] relative'
        }
      >
        <Image src="/icon/share.png" alt="공유 버튼" layout="fill" />
      </div>
    </button>
  );
}

// 분리 못한 컴포넌트들입니다

function SNSShareButton({ imageUrl, title, onClick }: SNSShareBUttonProps) {
  return (
    <button className="w-[60px] h-[60px] relative" onClick={onClick}>
      <Image
        src={imageUrl}
        alt={title}
        layout="fill"
        className="rounded-lg object-cover"
      />
    </button>
  );
}
interface SNSShareBUttonProps {
  imageUrl: string;
  title: string;
  description?: string;
  onClick?: () => void;
}
interface ShareButtonProps {
  type: 'initial' | 'none-bg';
  title: string | undefined;
  bannerImageUrl: string | undefined;
  description: string | undefined;
  activityId: number | undefined;
}

const SNSShareButtonStyle =
  'min-w-[150px] border border-black rounded-lg text-[16px] text-left py-[5px] px-[10px] flex items-center gap-[8px]';

const InitialButtonStyle =
  'h-[40px] w-[40px] absolute bg-[#fafafa] z-1001 right-[20px] bottom-[20px] opacity-50 flex items-center justify-center border rounded-full p-[5px] hover:scale-110 m:w-[25px] m:h-[25px] m:right-[15px] m:bottom-[15px]';
const NoneBgButtonStyle = '';
