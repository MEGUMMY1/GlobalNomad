import { useQuery } from '@tanstack/react-query';
import { apiMyReservationList } from '@/pages/api/myReservations/apiMyReservations';
import { useUserData } from './useUserData';
import { MyReservationListResponse } from '@/pages/api/myReservations/apiMyReservations.types';

export const useReservationList = () => {
  const userData = useUserData();

  const { data: myReservationList } = useQuery<MyReservationListResponse>({
    queryKey: ['myReservationList', userData.id],
    queryFn: () =>
      apiMyReservationList({
        cursorId: undefined,
        size: undefined,
        status: undefined,
      }),
    enabled: !!userData.id,
  });

  return myReservationList;
};
