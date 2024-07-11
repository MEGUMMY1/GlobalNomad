import { statusType } from '../ReservationFilter/ReservationFilter.types';

export const statusTitles = {
  pending: '예약 신청',
  cancel: '예약 취소',
  decline: '예약 거절',
  end: '체험 완료',
  accept: '예약 승인',
};

export const statusStyle = {
  pending: 'text-var-blue2',
  cancel: 'text-var-gray7',
  decline: 'text-var-red2',
  end: 'text-var-gray7',
  accept: 'text-var-orange2',
};

export const Status: statusType[] = [
  'pending',
  'cancel',
  'decline',
  'end',
  'accept',
];
