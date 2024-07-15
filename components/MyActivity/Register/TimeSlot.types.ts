export interface TimeSlotGroupProps {
  isDefault?: boolean;
  handleClickPlus?: () => void;
  handleClickMinus?: (id: number) => void;
  id?: number;
  index: number;
}

export interface TimeDropdownProps {
  type: 'start' | 'end';
  index: number;
}
