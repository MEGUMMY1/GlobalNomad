export interface NotificationId {
  notificationId: number;
}

export interface MyNotificationListQuery {
  cursorId?: number;
  size?: number;
}

export interface MyNotificationListResponse {
  cursorId: number;
  notifications: [
    {
      id: number;
      teamId: string;
      userId: number;
      content: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string;
    },
  ];
  totalCount: number;
}
