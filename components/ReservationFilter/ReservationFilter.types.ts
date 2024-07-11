export type statusType = 'pending' | 'cancel' | 'decline' | 'end' | 'accept';

export interface ReservationFilterProps {
  setFilterOption: React.Dispatch<React.SetStateAction<statusType | undefined>>;
  filterOption: statusType | undefined;
}
