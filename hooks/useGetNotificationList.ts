import { useInfiniteQuery } from '@tanstack/react-query';
import useLoginState from './Auth/useLoginState';
import { MyNotificationListResponse } from '@/components/NavigationDropdown/NotificationDropdown.types';
import { apiMyNotificationList } from '@/pages/api/myNotifications/apiMyNotifications';
import { useMemo } from 'react';

const LOAD_SIZE = 2;

export default function useGetNotificationList() {
  const { isLoggedIn } = useLoginState();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<MyNotificationListResponse, Error>({
    queryKey: ['myNotification'],
    queryFn: ({ pageParam = undefined }) => {
      const size = LOAD_SIZE;
      return apiMyNotificationList({ cursorId: pageParam as number, size });
    },
    enabled: !!isLoggedIn,
    getNextPageParam: (lastPage) => {
      return lastPage.totalCount === lastPage.notifications.length
        ? undefined
        : lastPage.cursorId;
    },

    initialPageParam: undefined,
  });

  const notificationList = useMemo(() => {
    if (data) {
      return data.pages.flatMap((page) => page.notifications);
    }
  }, [data]);

  return {
    notificationList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
}
