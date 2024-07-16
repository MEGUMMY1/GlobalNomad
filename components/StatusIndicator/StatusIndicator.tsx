import { StatusIndicatorProps } from './StatusIndicator.types';

export default function StatusIndicator({
  size,
  status,
}: StatusIndicatorProps) {
  let backgroundColor = '';
  let diameter = '';

  if (size === 'small') {
    diameter = '5px';
  } else if (size === 'medium') {
    diameter = '8px';
  }

  switch (status) {
    case 'approved':
      backgroundColor = 'blue';
      break;
    case 'denied':
      backgroundColor = 'red';
      break;
    case 'done':
      backgroundColor = 'gray';
      break;
    default:
      backgroundColor = 'gray';
      break;
  }

  return (
    <div
      className="rounded-full"
      style={{
        width: diameter,
        height: diameter,
        backgroundColor: backgroundColor,
      }}
    />
  );
}
