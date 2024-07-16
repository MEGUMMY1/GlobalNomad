import { useQuery } from '@tanstack/react-query';
import {
  MyNotificationListQuery,
  MyNotificationListResponse,
} from '@/pages/api/myNotifications/apiMyNotifications.types';
import { apiMyNotificationList } from '@/pages/api/myNotifications/apiMyNotifications';
import useLoginState from './useLoginState';

export default function useGetNotification(query: MyNotificationListQuery) {
  const { cursorId = undefined, size = 10 } = query;
  const { isLoggedIn } = useLoginState();

  const {
    data,
    isLoading: isNotifyCountLoading,
    isError,
  } = useQuery<MyNotificationListResponse, Error>({
    queryKey: ['myNotification', query],
    queryFn: () => apiMyNotificationList({ cursorId, size }),
    enabled: !!isLoggedIn,
  });

  return { data, isNotifyCountLoading, isError };
}
