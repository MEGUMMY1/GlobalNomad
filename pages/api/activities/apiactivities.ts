import axios from '../instance';
import {
  getActivityInfoParams,
  getActivityInfoResponse,
  getActivityListParams,
  getActivityListResponse,
  getActivityReviewsParams,
  getActivityReviewsResponse,
  getActivityScheduleParams,
  getActivityScheduleResponse,
  postActivityImageParams,
  postActivityParams,
  postActivityRequestParams,
  postActivityRequestResponse,
  postActivityResponse,
  posttActivityImageResponse,
} from './apiactivities.types';

//체험 리스트 조회
export const getActivityList = async (
  params: getActivityListParams
): Promise<getActivityListResponse> => {
  const cursorIdParam = params.cursorId ? `&cursorId=${params.cursorId}` : '';
  const categoryParam = params.category ? `&category=${params.category}` : '';
  const keywordParam = params.keyword ? `&keyword=${params.keyword}` : '';
  const sortParam = params.sort ? `&sort=${params.sort}` : '';
  const response = await axios.get(
    `/activities?method=${params.method}${cursorIdParam}${categoryParam}${keywordParam}${sortParam}&page=${params.page}&size=${params.size}`
  );
  return response.data;
};

//체험 등록
export const postActivity = async (
  body: postActivityParams
): Promise<postActivityResponse> => {
  const response = await axios.post(`/activities`, body);
  return response.data;
};

//체험 상세조회
export const getActivityInfo = async (
  params: getActivityInfoParams
): Promise<getActivityInfoResponse> => {
  const response = await axios.get(`/activities/${params.id}`);
  return response.data;
};

//체험 예약 가능일 조회
export const getActivitySchedule = async (
  params: getActivityScheduleParams
): Promise<getActivityScheduleResponse> => {
  const query = `${params.id}/available-schedule?year=${params.year}&month=${params.month}`;
  const response = await axios.get(`/activities/${query}`);
  return response.data;
};

//체험 리뷰 조회
export const getActivityReviews = async (
  params: getActivityReviewsParams
): Promise<getActivityReviewsResponse> => {
  const query = `${params.id}/reviews?page=${params.page | 1}&size=3`;
  const response = await axios.get(`/activities/${query}`);
  return response.data;
};

//체험 예약 신청
export const postActivityRequest = async (
  activityId: number,
  params: postActivityRequestParams
): Promise<postActivityRequestResponse> => {
  const response = await axios.post(`/activities/${activityId}/reservations`, {
    scheduleId: params.scheduleId,
    headCount: params.headCount,
  });
  return response.data;
};

//체험 이미지 url 생성
export const postActivityImage = async (
  file: File
): Promise<posttActivityImageResponse> => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await axios.post(`/activities/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
