import { statusType } from '../ReservationFilter/ReservationFilter.types';

export const statusTitles = {
  pending: '예약 신청',
  canceled: '예약 취소',
  declined: '예약 거절',
  completed: '체험 완료',
  confirmed: '예약 승인',
};

export const statusStyle = {
  pending: 'text-var-blue2',
  canceled: 'text-var-gray7',
  declined: 'text-var-red2',
  completed: 'text-var-gray7',
  confirmed: 'text-var-orange2',
};

export const Status: statusType[] = [
  'pending',
  'canceled',
  'declined',
  'completed',
  'confirmed',
];
