export interface TimeSlotGroupProps {
  isDefault?: boolean;
  handleClickPlus?: () => void;
  handleClickMinus?: (id: number) => void;
  id?: number;
  index?: number;
  disabled?: boolean;
}

export interface TimeDropdownProps {
  type: 'start' | 'end';
  handleChange: (type: string, time: string) => void;
  startTime: string;
  selectedTime: string;
  disabled?: boolean;
}

export interface TimeSlotProps {
  isEdit?: boolean;
}
