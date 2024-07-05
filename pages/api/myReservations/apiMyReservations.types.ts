export interface ReservationId {
  reservationId: number;
}

export interface MyReservationListQuery {
  cursorId?: number;
  size?: number;
  status?: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';
}

export interface MyReservationListResponse {
  cursorId: number;
  reservations: [
    {
      id: number;
      teamId: string;
      userId: number;
      activity: {
        bannerImageUrl: string;
        title: string;
        id: number;
      };
      scheduleId: number;
      status: string;
      reviewSubmitted: boolean;
      totalPrice: number;
      headCount: number;
      date: string;
      startTime: string;
      endTime: string;
      createdAt: string;
      updatedAt: string;
    },
  ];
  totalCount: number;
}

export interface EditMyReservationResponse {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewBody {
  rating: number;
  content: string;
}

export interface ReviewResponse {
  deletedAt: string;
  updatedAt: string;
  createdAt: string;
  content: string;
  rating: number;
  userId: number;
  activityId: number;
  teamId: string;
  id: number;
}
