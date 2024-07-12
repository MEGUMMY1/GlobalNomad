import { MyReservationList } from '../ReservationListCard/mockData';

export interface RatingProps {
  currentRating: number;
  onRatingChange: (newRating: number) => void;
}

export interface ReviewProps {
  reservation: MyReservationList;
  closeModal: () => void;
}
