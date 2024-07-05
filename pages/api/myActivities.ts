import axios from './instance';

export const getMyActivityList = async (params: {
  cursorId?: number | null;
  size?: number | null;
}) => {
  const cursorIdParam = params.cursorId ? `cursorId=${params.cursorId}&` : '';
  const sizeParam = params.size ? `size=${params.size}` : '';
  const response = await axios.get(
    `/my-activities?${cursorIdParam}${sizeParam}`
  );
  return response;
};

export const getMyMonthSchedule = async (params: {
  activityId: number;
  year: string;
  month: string;
}) => {
  const response = await axios.get(
    `/my-activities/${params.activityId}/reservation-dashboard?year=${params.year}&month=${params.month}`
  );
  return response;
};

export const getMyDateSchedule = async (params: {
  activityId: number;
  date: string;
}) => {
  const response = await axios.get(
    `/my-activities/${params.activityId}/reserved-schedule?date=${params.date}`
  );
  return response;
};

export const getMyTimeSchedule = async (params: {
  activityId: number;
  cursorId?: number | null;
  size?: number;
  scheduleId: number;
  status: string;
}) => {
  const cursorIdParam = params.cursorId ? `cursorId=${params.cursorId}&` : '';
  const sizeParam = params.size ? `size=${params.size}&` : '';
  const response = await axios.get(
    `/my-activities/${params.activityId}/reservations?${cursorIdParam}${sizeParam}scheduleId=${params.scheduleId}&status=${params.status}`
  );
  return response;
};

export const updataMyReservation = async (params: {
  activityId: number;
  reservationId: number;
  status: 'pending' | 'confirmed' | 'declined';
}) => {
  const response = await axios.patch(
    `/my-activities/${params.activityId}/reservations/${params.reservationId}`,
    { status: params.status }
  );
  return response;
};

export const deleteMyActivities = async (activityId: number) => {
  const response = await axios.delete(`/my-activities/${activityId}`);
  return response;
};

export const updataMyActivities = async (
  activityId: number,
  updatedData: any
) => {
  const response = await axios.patch(
    `/my-activities/${activityId}`,
    updatedData
  );
  return response;
};
