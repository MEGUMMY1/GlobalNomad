export type statusType =
  | 'pending'
  | 'confirmed'
  | 'declined'
  | 'canceled'
  | 'completed';

export interface ReservationFilterProps {
  setFilterOption: React.Dispatch<React.SetStateAction<statusType | undefined>>;
  filterOption: statusType | undefined;
}
export interface ReservationCardProps {
  reservationData: MyReservationProps;
}

export interface MyReservationProps {
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
