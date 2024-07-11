export interface PrimaryButtonProps {
  size: 'small' | 'medium' | 'large';
  style: 'dark' | 'bright' | 'disabled' | 'enabled';
  children: string;
  disabled?: boolean;
  onClick: () => void;
}

export interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  direction: 'prev' | 'next';
}

export interface SimpleButtonProps {
  onClick: () => void;
}
