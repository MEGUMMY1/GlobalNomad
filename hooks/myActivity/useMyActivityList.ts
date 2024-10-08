import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyActivityList } from '@/pages/api/myActivities/apimyActivities';
import { getMyActivityListResponse } from '@/pages/api/myActivities/apimyActivities.types';
import { useMemo } from 'react';
import useLoginState from '../Auth/useLoginState';

const INITIAL_SIZE = 4;
const REFETCH_SIZE = 1;

export const useMyActivityList = () => {
  const loginState = useLoginState();

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery<getMyActivityListResponse>({
      queryKey: ['myActivityListInfinite'],
      queryFn: ({ pageParam = undefined }) => {
        const size = pageParam === undefined ? INITIAL_SIZE : REFETCH_SIZE;
        return getMyActivityList({
          size,
          cursorId: pageParam as number | undefined,
        });
      },
      getNextPageParam: (lastPage) => {
        return lastPage.totalCount === lastPage.activities.length
          ? undefined
          : lastPage.cursorId;
      },
      initialPageParam: undefined,
      enabled: loginState.isLoggedIn,
    });

  const totalCount = data?.pages[0].totalCount;

  const myActivityList = useMemo(() => {
    if (data) {
      return data.pages.flatMap((page) => page.activities);
    }
  }, [data]);

  return {
    myActivityList,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  };
};
