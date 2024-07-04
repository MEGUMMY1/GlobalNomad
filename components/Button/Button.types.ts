export interface PrimaryButtonProps {
  size: 'small' | 'medium' | 'large';
  style: 'dark' | 'bright' | 'disabled';
  children: string;
  disabled?: boolean;
  onClick: () => void;
}

export interface CircleCloseButtonProps {
  onClick: () => void;
}
