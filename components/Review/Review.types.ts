import { MyReservationProps } from '../ReservationFilter/myReservationTypes.types';

export interface RatingProps {
  currentRating: number;
  onRatingChange: (newRating: number) => void;
}

export interface ReviewProps {
  reservation: MyReservationProps;
  closeModal: () => void;
}
