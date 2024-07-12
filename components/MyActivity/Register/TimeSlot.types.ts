export interface TimeSlotGroupProps {
  isDefault?: boolean;
  handleClickPlus?: () => void;
  handleClickMinus?: (id: number) => void;
  id?: number;
}
