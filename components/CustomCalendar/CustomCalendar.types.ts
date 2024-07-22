export interface CustomCalendarProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  getAvailableDates?: () => Date[];
}
