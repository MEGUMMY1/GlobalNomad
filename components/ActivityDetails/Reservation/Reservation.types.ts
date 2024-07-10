export interface ReservationModalProps {
  selectedDate: Date | null;
  handleDateChange: (date: Date | null) => void;
  getAvailableTimes: (date: Date | null) => string[];
  selectedTime: string | null;
  handleTimeChange: (time: string) => void;
}

export interface ParticipantSelectorProps {
  participants: number;
  onParticipantsChange: (delta: number) => void;
}
