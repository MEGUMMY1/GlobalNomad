import Image from 'next/image';
import { PrimaryButton } from '../Button/Button';
import { statusStyle, statusTitles } from './reservationStatusInfo';
import { useModal } from '@/hooks/useModal';
import Review from '../Review/Review';
import { ReservationCardProps } from '../ReservationFilter/myReservationTypes.types';
import { usePopup } from '@/hooks/usePopup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiEditMyReservation } from '@/pages/api/myReservations/apiMyReservations';
import { useUserData } from '@/hooks/useUserData';
import { formatCurrency } from '@/utils/formatCurrency';
import Link from 'next/link';
import Spinner from '../Spinner/Spinner';

const ReservationListCard = ({ reservationData }: ReservationCardProps) => {
  const { openModal, closeModal } = useModal();
  const { openPopup } = usePopup();
  const { userData, isLoading } = useUserData();
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

  const handleOpenReviewModal = () => {
    openModal({
      title: '후기 작성',
      hasButton: false,
      content: <Review reservation={reservationData} closeModal={closeModal} />,
    });
  };

  const handleCancelReservation = () => {
    openPopup({
      popupType: 'select',
      content: '예약을 취소하시겠어요?',
      btnName: ['아니오', '취소하기'],
      callBackFnc: () =>
        EditMyReservationMutation.mutate({ reservationId: reservationData.id }),
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-[204px] relative flex rounded-3xl shadow-card dark:shadow-none overflow-hidden t:min-h-[156px] m:min-h-[128px]">
      <div className="min-w-[204px] min-h-[204px] overflow-hidden relative t:min-w-[156px] t:min-h-[156px] m:min-w-[110px] m:min-h-[128px]">
        <Link
          href={`/activity-details/${reservationData.activity.id}`}
          className="text-[20px] font-bold mt-[8px] hover:underline"
        >
          <Image
            src={reservationData.activity.bannerImageUrl}
            alt="액티비티 사진"
            layout="fill"
            objectFit="cover"
            className="hover:scale-110"
          />
        </Link>
      </div>
      <div className="w-full p-[24px] t:p-[12px] m:p-[9px] bg-white dark:bg-var-dark2">
        <p
          className={`text-[16px] font-bold ${statusStyle[reservationData.status]} m:text-[14px] m:py-[2px]`}
        >
          {statusTitles[reservationData.status]}
        </p>
        <Link href={`/activity-details/${reservationData.activity.id}`}>
          <p className="text-[20px] mt-[8px] font-bold tracking-tight hover:underline t:text-[18px] t:mt-[0] t:w-[250px] t:overflow-hidden t:whitespace-nowrap t:text-ellipsis m:text-[14px] m:mt-[0] m:py-[2px] m:w-[200px] m:overflow-hidden m:whitespace-nowrap m:text-ellipsis">
            {reservationData.activity.title}
          </p>
        </Link>
        <p className="mt-[12px] text-[18px] t:text-[14px] t:mt-[5px] m:text-[12px] m:mt-[0] m:py-[2px] ">
          {reservationData.date}&nbsp;&nbsp;·&nbsp;&nbsp;
          {reservationData.startTime}~{reservationData.endTime}
          &nbsp;&nbsp;·&nbsp;{reservationData.headCount}명
        </p>
        <div className="w-full flex justify-between mt-[16px] h-[40px] items-center t:mt-[11px] m:mt-[0]">
          <p className="font-medium text-[24px] t:text-[20px] m:text-[16px]">
            ₩{formatCurrency(reservationData.totalPrice)}
          </p>
          <div className="min-w-[144px] t:min-w-[112px] m:min-w-[80px]">
            {reservationData.status === 'pending' && (
              <button
                className={`bg-white text-nomad-black ${buttonStyle}`}
                onClick={handleCancelReservation}
              >
                예약 취소
              </button>
            )}
            {reservationData.status === 'completed' &&
              !reservationData.reviewSubmitted && (
                <button
                  className={`bg-nomad-black text-white ${buttonStyle}`}
                  onClick={handleOpenReviewModal}
                >
                  후기 작성
                </button>
              )}
            {reservationData.status === 'completed' &&
              reservationData.reviewSubmitted && (
                <div className={`bg-var-gray6 text-white ${buttonStyle}`}>
                  후기 작성 완료
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const buttonStyle =
  'border border-nomad-black w-full h-[40px] flex items-center justify-center rounded-md text-[16px] py-[12px] px-[10px] m:h-[32px] m:text-[14px]';

export default ReservationListCard;
