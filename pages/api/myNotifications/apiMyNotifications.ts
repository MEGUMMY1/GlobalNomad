import INSTANCE_URL from '../instance';
import {
  NotificationId,
  MyNotificationListQuery,
  MyNotificationListResponse,
} from './apiMyNotifications.types';

// 내 알림 리스트 조회를 위한 api
export async function apiMyNotificationList(
  query: MyNotificationListQuery
): Promise<MyNotificationListResponse> {
  const { cursorId, size } = query;
  const params: MyNotificationListQuery = {};

  if (cursorId !== 0) {
    params.cursorId = cursorId;
  }
  if (size) {
    params.size = size;
  } else {
    params.size = 10;
  }

  const response = await INSTANCE_URL.get('/my-notifications', { params });
  return response.data;
}

// 내 알림 삭제를 위한 api
export async function apiDeleteMyNotification(id: number) {
  const response = await INSTANCE_URL.delete(`my-notifications/${id}`);
  return response.data;
}
