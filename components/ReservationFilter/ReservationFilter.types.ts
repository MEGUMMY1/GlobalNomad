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
