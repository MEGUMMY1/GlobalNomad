import { useInfiniteQuery } from '@tanstack/react-query';
import { apiMyReservationList } from '@/pages/api/myReservations/apiMyReservations';
import { useUserData } from './useUserData';
import { MyReservationListResponse } from '@/pages/api/myReservations/apiMyReservations.types';
import { useMemo } from 'react';
import { statusType } from '@/components/ReservationFilter/myReservationTypes.types';

const INITIAL_SIZE = 10;
const REFETCH_SIZE = 1;

export const useReservationList = (filterOption: statusType | undefined) => {
  const { userData } = useUserData();

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery<MyReservationListResponse>({
      queryKey: ['myReservationList', userData.id, filterOption],
      queryFn: ({ pageParam = undefined }) => {
        const size = pageParam === undefined ? INITIAL_SIZE : REFETCH_SIZE;
        return apiMyReservationList({
          size: size,
          cursorId: pageParam as number | undefined,
          status: filterOption ?? undefined,
        });
      },
      enabled: !!userData.id,
      getNextPageParam: (lastPage) => {
        return lastPage.totalCount === lastPage.reservations.length
          ? undefined
          : lastPage.cursorId;
      },
      initialPageParam: undefined,
    });

  const myReservationList = useMemo(() => {
    if (data) {
      return data.pages.flatMap((page) => page.reservations);
    }
  }, [data]);

  return {
    myReservationList,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  };
};
