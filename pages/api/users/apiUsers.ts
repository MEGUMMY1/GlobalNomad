import INSTANCE_URL from '../instance';
import {
  SignupBody,
  SignupResponse,
  MyInfoResponse,
  EditMyInfoBody,
  EditMyInfoResponse,
  ProfileImageBody,
  ProfileImageResponse,
} from './apiUser.types';

// 회원가입을 위한 api
export async function apiSignup(body: SignupBody): Promise<SignupResponse> {
  const response = await INSTANCE_URL.post('/users', body);
  return response.data;
}

// 내 정보 조회를 위한 api
export async function apiMyInfo(): Promise<MyInfoResponse> {
  const response = await INSTANCE_URL.get('/users/me');
  return response.data;
}

// 내 정보 수정을 위한 api
export async function apiEditMyInfo(
  body: EditMyInfoBody
): Promise<EditMyInfoResponse> {
  const response = await INSTANCE_URL.patch('/users/me', body);
  return response.data;
}

// 프로필 이미지 url 생성을 위한 api
export async function apiProfileImage(
  body: ProfileImageBody
): Promise<ProfileImageResponse> {
  const response = await INSTANCE_URL.post('/users/me/image', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}
