export interface CalendarProps {
  activityId: number;
}

export interface ActivitySelectorProps {
  onSelectActivity: (activityId: number) => void;
  selectedActivityId: number | null;
}

export interface ReservationModalContentProps {
  selectedDate: Date;
  activityId: number;
  onSelectTime: (scheduleId: number) => void;
}

export interface ModalTabsProps {
  labels: string[];
  children: React.ReactNode[];
}
