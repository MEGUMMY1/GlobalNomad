import Image from 'next/image';
import { PrimaryButton } from '../Button/Button';
import { statusStyle, statusTitles } from './reservationStatusInfo';
import {
  ReservationCardProps,
  statusType,
} from '../ReservationFilter/myReservationTypes.types';
import { usePopup } from '@/hooks/usePopup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiEditMyReservation } from '@/pages/api/myReservations/apiMyReservations';
import { useUserData } from '@/hooks/useUserData';
import { formatCurrency } from '@/utils/formatCurrency';

const ReservationListCard = ({ reservationData }: ReservationCardProps) => {
  const { openPopup } = usePopup();
  const userData = useUserData();
  const queryClient = useQueryClient();

  const EditMyReservationMutation = useMutation({
    mutationFn: apiEditMyReservation,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['myReservationList', userData.id],
      }),
    onError: (error) => {
      console.error('Error editing reservation:', error);
    },
  });

  const handleCancelReservation = () => {
    openPopup({
      popupType: 'select',
      content: '예약을 취소하시겠어요?',
      btnName: ['아니오', '취소하기'],
      callBackFnc: () =>
        EditMyReservationMutation.mutate({ reservationId: reservationData.id }),
    });
  };

  return (
    <div className="h-[212px] relative flex rounded-3xl shadow-card overflow-hidden">
      <Image
        src={reservationData.activity.bannerImageUrl}
        alt="액티비티 사진"
        objectFit="cover"
        width={204}
        height={204}
      />
      <div className="w-full p-[24px]">
        <p
          className={`text-[16px] font-bold ${statusStyle[reservationData.status]}`}
        >
          {statusTitles[reservationData.status]}
        </p>
        <p className="text-[20px] font-bold mt-[8px]">
          {reservationData.activity.title}
        </p>
        <p className="mt-[12px] text-[18px]">
          {reservationData.date}&nbsp;&nbsp;·&nbsp;&nbsp;
          {reservationData.startTime}~{reservationData.endTime}
          &nbsp;&nbsp;·&nbsp;&nbsp;{reservationData.headCount}명
        </p>
        <div className="w-full flex justify-between mt-[16px] items-center">
          <p className="font-medium text-[24px]">
            ₩{formatCurrency(reservationData.totalPrice)}
          </p>
          {reservationData.status === 'pending' && (
            <PrimaryButton
              size="medium"
              style="bright"
              onClick={handleCancelReservation}
            >
              예약 취소
            </PrimaryButton>
          )}
          {reservationData.status === 'completed' && (
            <PrimaryButton
              size="medium"
              style="dark"
              onClick={handleCancelReservation}
            >
              후기 작성
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationListCard;
