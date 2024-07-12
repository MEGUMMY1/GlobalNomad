import { useQuery } from '@tanstack/react-query'; //
import {
  MyNotificationListQuery,
  MyNotificationListResponse,
} from '@/pages/api/myNotifications/apiMyNotifications.types'; // 타입 파일 가져오기
import { apiMyNotificationList } from '@/pages/api/myNotifications/apiMyNotifications'; // API 함수 가져오기

export default function useGetNotification(query: MyNotificationListQuery) {
  const { cursorId = undefined, size = 10 } = query;
  const { data, isLoading, isError } = useQuery<
    MyNotificationListResponse,
    Error
  >({
    queryKey: ['myNotification', query], // queryKey 설정
    queryFn: () => apiMyNotificationList({ cursorId, size }),
  });

  return { data, isLoading, isError };
}
