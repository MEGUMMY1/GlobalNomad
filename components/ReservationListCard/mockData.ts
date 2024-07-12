export interface MyReservationList {
  id: number;
  teamId: string;
  userId: number;
  activity: {
    bannerImageUrl: string;
    title: string;
    id: number;
  };
  scheduleId: number;
  status: 'pending' | 'canceled' | 'declined' | 'completed' | 'confirmed';
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export const mockData: MyReservationList[] = [
  {
    id: 0,
    teamId: 'string',
    userId: 0,
    activity: {
      bannerImageUrl: '/image/TestImage.jpg',
      title: '춤추기',
      id: 0,
    },
    scheduleId: 0,
    status: 'pending',
    reviewSubmitted: false,
    totalPrice: 100,
    headCount: 0,
    date: '2024-07-11',
    startTime: '12:00',
    endTime: '13:00',
    createdAt: '2024-07-11T10:01:41.789Z',
    updatedAt: '2024-07-11T10:01:41.789Z',
  },
  {
    id: 1,
    teamId: 'string',
    userId: 0,
    activity: {
      bannerImageUrl: '/image/TestImage.jpg',
      title: '노래하기',
      id: 1,
    },
    scheduleId: 1,
    status: 'pending',
    reviewSubmitted: false,
    totalPrice: 200,
    headCount: 0,
    date: '2024-07-11',
    startTime: '12:00',
    endTime: '13:00',
    createdAt: '2024-07-11T10:01:41.789Z',
    updatedAt: '2024-07-11T10:01:41.789Z',
  },
  {
    id: 2,
    teamId: 'string',
    userId: 300,
    activity: {
      bannerImageUrl: '/image/TestImage.jpg',
      title: '안녕하세요',
      id: 2,
    },
    scheduleId: 2,
    status: 'canceled',
    reviewSubmitted: true,
    totalPrice: 0,
    headCount: 0,
    date: '2024-07-11',
    startTime: '12:00',
    endTime: '13:00',
    createdAt: '2024-07-11T10:01:41.789Z',
    updatedAt: '2024-07-11T10:01:41.789Z',
  },
];
