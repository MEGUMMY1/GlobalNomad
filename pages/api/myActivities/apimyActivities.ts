import axios from '../instance';
import {
  getMyActivityListParams,
  getMyActivityListResponse,
  getMyDateScheduleParams,
  getMyDateScheduleResponse,
  getMyMonthScheduleParams,
  getMyMonthScheduleResponse,
  getMyTimeScheduleParams,
  getMyTimeScheduleResponse,
  updataMyActivitiesParams,
  updataMyActivitiesResponse,
  updataMyReservationParams,
  updataMyReservationResponse,
} from './apimyActivities.types';

//내 체험 리스트 조회
export const getMyActivityList = async (
  params: getMyActivityListParams
): Promise<getMyActivityListResponse> => {
  const cursorIdParam = params.cursorId ? `cursorId=${params.cursorId}&` : '';
  const sizeParam = params.size ? `size=${params.size}` : '';
  const response = await axios.get(
    `/my-activities?${cursorIdParam}${sizeParam}`
  );
  return response.data;
};

//내 체험 월별 예약 현황 조회
export const getMyMonthSchedule = async (
  params: getMyMonthScheduleParams
): Promise<getMyMonthScheduleResponse[]> => {
  const response = await axios.get(
    `/my-activities/${params.activityId}/reservation-dashboard?year=${params.year}&month=${params.month}`
  );
  return response.data;
};

//내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회
export const getMyDateSchedule = async (
  params: getMyDateScheduleParams
): Promise<getMyDateScheduleResponse[]> => {
  const response = await axios.get(
    `/my-activities/${params.activityId}/reserved-schedule?date=${params.date}`
  );
  return response.data;
};

//내 체험 예약 시간대별 예약 내역 조회
export const getMyTimeSchedule = async (
  params: getMyTimeScheduleParams
): Promise<getMyTimeScheduleResponse> => {
  const cursorIdParam = params.cursorId ? `cursorId=${params.cursorId}&` : '';
  const sizeParam = params.size ? `size=${params.size}&` : '';
  const response = await axios.get(
    `/my-activities/${params.activityId}/reservations?${cursorIdParam}${sizeParam}scheduleId=${params.scheduleId}&status=${params.status}`
  );
  return response.data;
};

//내 체험 예약 상태(승인,거절) 업데이트
export const updataMyReservation = async (
  activityId: number,
  reservationId: number,
  params: updataMyReservationParams
): Promise<updataMyReservationResponse> => {
  const response = await axios.patch(
    `/my-activities/${activityId}/reservations/${reservationId}`,
    { status: params.status }
  );
  return response.data;
};

//내 체험 삭제
export const deleteMyActivities = async (activityId: number) => {
  const response = await axios.delete(`/my-activities/${activityId}`);
  return response;
};

//내 체험 수정
export const updataMyActivities = async (
  activityId: number,
  params: updataMyActivitiesParams
): Promise<updataMyActivitiesResponse> => {
  const response = await axios.patch(`/my-activities/${activityId}`, params);
  return response.data;
};
