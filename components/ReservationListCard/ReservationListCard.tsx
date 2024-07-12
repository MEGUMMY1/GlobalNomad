import Image from 'next/image';
import { PrimaryButton } from '../Button/Button';
import { statusStyle, statusTitles } from './reservationStatusInfo';
import { MyReservationList } from './mockData';
import { statusType } from '../ReservationFilter/ReservationFilter.types';

interface ReservationCardProps {
  mockData: MyReservationList;
}

const ReservatioListCard = ({ mockData }: ReservationCardProps) => {
  const handleCancelReservation = () => {};

  const isPendingOrAccepted = (status: statusType) => {
    return status === 'pending' || status === 'accept';
  };

  return (
    <div className="h-[212px] relative flex rounded-3xl shadow-card">
      <Image
        src="/image/TestImage.jpg"
        alt="액티비티 사진"
        objectFit="cover"
        width={204}
        height={204}
      />
      <div className="w-full p-[24px]">
        <p className={`text-[16px] font-bold ${statusStyle[mockData.status]}`}>
          {statusTitles[mockData.status]}
        </p>
        <p className="text-[20px] font-bold mt-[8px]">
          {mockData.activity.title}
        </p>
        <p className="mt-[12px] text-[18px]">
          {mockData.date}&nbsp;&nbsp;·&nbsp;&nbsp;{mockData.startTime}~
          {mockData.endTime}&nbsp;&nbsp;·&nbsp;&nbsp;{mockData.headCount}명
        </p>
        <div className="w-full flex justify-between mt-[16px] items-center">
          <p className="font-medium text-[24px]">₩{mockData.totalPrice}</p>
          {isPendingOrAccepted(mockData.status) && (
            <PrimaryButton
              size="medium"
              style="bright"
              onClick={handleCancelReservation}
            >
              예약 취소
            </PrimaryButton>
          )}
          {mockData.reviewSubmitted && (
            <PrimaryButton
              size="medium"
              style="dark"
              onClick={handleCancelReservation}
            >
              후가 작성
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservatioListCard;
