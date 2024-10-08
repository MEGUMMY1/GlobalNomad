export interface ActivityDetail {
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
}

export interface BestActivitiesProps {
  activities: ActivityDetail[];
  totalCount: number;
  cursorId: number | null;
}

export interface BestActivityProps {
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
  id: number;
  bannerImageUrl: string;
  description: string;
}
