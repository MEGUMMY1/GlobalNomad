import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyActivityList } from '@/pages/api/myActivities/apimyActivities';
import { getMyActivityListResponse } from '@/pages/api/myActivities/apimyActivities.types';
import { useMemo } from 'react';

const INITIAL_SIZE = 4;
const REFETCH_SIZE = 1;

export const useMyActivityList = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery<getMyActivityListResponse>({
      queryKey: ['myActivityList'],
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
    });

  const myActivityList = useMemo(() => {
    if (data) {
      return data.pages.flatMap((page) => page.activities);
    }
  }, [data]);

  return {
    myActivityList,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  };
};
