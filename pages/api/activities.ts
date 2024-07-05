import axios from './instance';

export const getActivityList = async (params: {
  method: 'cursor';
  cursorId?: number | null;
  category?: string | null;
  keyword?: string | null;
  sort?: string | null;
  page: number;
  size: number;
}) => {
  const cursorIdParam = params.cursorId ? `&cursorId=${params.cursorId}` : '';
  const categoryParam = params.category ? `&category=${params.category}` : '';
  const keywordParam = params.keyword ? `&keyword=${params.keyword}` : '';
  const sortParam = params.sort ? `&sort=${params.sort}` : '';
  const response = await axios.get(
    `/activities?method=${params.method}${cursorIdParam}${categoryParam}${keywordParam}${sortParam}&page=${params.page}&size=${params.size}`
  );
  return response;
};

export const postActivity = async (activityData: any) => {
  const response = await axios.post(`/my-activities, ${activityData}`);
  return response;
};

export const getActivityInfo = async (id: number) => {
  const response = await axios.get(`/activities/{id}`);
  return response;
};

export const getActivitySchedule = async (
  id: number,
  year: string,
  month: string
) => {
  const query = `${id}/available-schedule?year=${year}&month=${month}`;
  const response = await axios.get(`/activities/${query}`);
  return response;
};

export const getActivityReviews = async (
  id: number,
  page: number,
  size: number
) => {
  const query = `${id}/reviews?page=${page | 1}&size =${size | 3}`;
  const response = await axios.get(`/activities/${query}`);
  return response;
};

export const postActivityRequest = async (
  activityId: number,
  activityRequest: { scheduleId: number; headCount: number }
) => {
  const response = await axios.post(`/activities/${activityId}/reservations`, {
    scheduleId: activityRequest.scheduleId,
    headCount: activityRequest.headCount,
  });
  return response;
};

export const postActivityImage = async (image: string) => {
  const response = await axios.post(`/activities/image`, {
    activityImageUrl: { image },
  });
  return response;
};
