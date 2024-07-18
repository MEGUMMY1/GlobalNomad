export interface getMyActivityListParams {
  cursorId?: number | null;
  size?: number | null;
}

export interface getMyActivityListResponse {
  cursorId: number | null;
  totalCount: number;
  activities: [
    {
      id: number;
      userId: number;
      title: string;
      description: string;
      category: string;
      price: number;
      address: string;
      bannerImageUrl: string;
      rating: number;
      reviewCount: number;
      createdAt: string;
      updatedAt: string;
    },
  ];
}

export interface getMyMonthScheduleParams {
  activityId: number;
  year: string;
  month: string;
}

export interface getMyMonthScheduleResponse {
  date: string;
  reservations: {
    pending: number;
    confirmed: number;
    completed: number;
  };
}
[];

export interface getMyDateScheduleParams {
  activityId: number;
  date: string;
}

export interface getMyDateScheduleResponse {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: { declined: number; confirmed: number; pending: number };
}
[];

export interface getMyTimeScheduleParams {
  activityId: number;
  cursorId?: number | null;
  size?: number;
  scheduleId: number;
  status: string;
}
export interface getMyTimeScheduleResponse {
  cursorId: number | null;
  totalCount: number;
  reservations: [
    {
      id: number;
      nickname: string;
      userId: number;
      teamId: string;
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
    },
  ];
}
export interface updataMyReservationParams {
  status: 'pending' | 'confirmed' | 'declined';
}
export interface updataMyReservationResponse {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
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

export interface updataMyActivitiesParams {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: { date: string; startTime: string; endTime: string }[];
}

export interface updataMyActivitiesResponse {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  bannerImageUrl: string;
  subImageUrls: [
    {
      id: number;
      imageUrl: string;
    },
  ];
  schedules: [
    {
      endTime: string;
      startTime: string;
      date: string;
      id: number;
    },
  ];
}
