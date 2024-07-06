export interface getActivityListResponse {
  cursorId: number;
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

export interface getActivityListParams {
  method: 'cursor';
  cursorId?: number | null;
  category?: string | null;
  keyword?: string | null;
  sort?: string | null;
  page: number;
  size: number;
}

export interface postActivityParams {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: [
    {
      endTime: string;
      startTime: string;
      date: string;
      id: number;
    },
  ];
  bannerImageUrl: string;
  subImageUrls: [
    {
      id: number;
      imageUrl: string;
    },
  ];
}

export interface postActivityResponse {
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

export interface getActivityInfoParams {
  id: number;
}

export interface getActivityInfoResponse {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
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
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface getActivityScheduleParams {
  id: number;
  year: string;
  month: string;
}

export interface getActivityScheduleResponse {
  date: string;
  times: {
    endTime: string;
    startTime: string;
    id: number;
  }[];
}

export interface getActivityReviewsParams {
  id: number;
  page: number;
  size: number;
}

export interface getActivityReviewsResponse {
  averageRating: number;
  totalCount: number;
  reviews: [
    {
      id: number;
      user: {
        profileImageUrl: string;
        nickname: string;
        id: number;
      };
      activityId: number;
      rating: number;
      content: string;
      createdAt: string;
      updatedAt: string;
    },
  ];
}

export interface postActivityRequestParams {
  scheduleId: number;
  headCount: number;
}

export interface postActivityRequestResponse {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface postActivityImageParams {
  image: string;
}

export interface posttActivityImageResponse {
  activityImageUrl: string;
}
