import INSTANCE_URL from '../instance';
import {
  ReservationId,
  MyReservationListQuery,
  MyReservationListResponse,
  EditMyReservationResponse,
  ReviewBody,
  ReviewResponse,
} from './apiMyReservations.types';

// 내 예약 리스트 조회를 위한 api
export async function apiMyReservationList(
  query: MyReservationListQuery
): Promise<MyReservationListResponse> {
  const { cursorId, size, status } = query;
  const params: MyReservationListQuery = {};

  if (cursorId !== 0) {
    params.cursorId = cursorId;
  }

  if (size) {
    params.size = size;
  } else {
    params.size = 10;
  }

  if (status) {
    params.status = status;
  }

  const response = await INSTANCE_URL.get('/my-reservations', { params });
  return response.data;
}

// 내 예약 수정(취소)을 위한 api
export async function apiEditMyReservation(
  id: ReservationId
): Promise<EditMyReservationResponse> {
  const response = await INSTANCE_URL.patch(
    `/my-reservations/${id.reservationId}`,
    { status: 'canceled' }
  );
  return response.data;
}

// 내 예약 리뷰 작성을 위한 api
export async function apiReview(
  id: ReservationId,
  body: ReviewBody
): Promise<ReviewResponse> {
  const response = await INSTANCE_URL.post(
    `/my-reservations/${id.reservationId}/reviews`,
    body
  );
  return response.data;
}
