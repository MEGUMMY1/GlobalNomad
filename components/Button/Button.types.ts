export interface PrimaryButtonProps {
  size: 'small' | 'medium' | 'large';
  style: 'dark' | 'bright' | 'disabled';
  children: string;
  disabled?: boolean;
  onClick: () => void;
}

export interface PaginationButtonProps {
  onClickPrev: () => void;
  onClickNext: () => void;
  isFirstPage?: boolean;
  isLastPage?: boolean;
}

export interface SimpleButtonProps {
  onClick: () => void;
}
