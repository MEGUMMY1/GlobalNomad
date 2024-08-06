export interface RegisterFormProps {
  activityData?: {
    id: number;
    userId: number;
    title: string;
    description: string;
    category: string;
    price: number;
    address: string;
    bannerImageUrl: string;
    subImages: [
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
  };
  isEdit?: boolean;
}

export interface SelectedDateProps {
  date: string;
  startTime: string;
  endTime: string;
  id: number;
}
