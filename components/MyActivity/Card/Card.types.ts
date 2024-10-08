export interface CardProps {
  activityId: number;
  activityImage: string;
  rating: number;
  reviewCount: number;
  title: string;
  price: number;
}

export interface PopoverButtonProps {
  children: string;
  onClick: () => void;
}

export interface PopoverProps {
  activityId: number;
  closePopover: () => void;
}
