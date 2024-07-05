export interface SignupBody {
  email: string;
  nickname: string;
  password: string;
}

export interface SignupResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyInfoResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface EditMyInfoBody {
  nickname: string;
  profileImageUrl: string;
  newPassword: string;
}

export interface EditMyInfoResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileImageBody {
  image: string;
}

export interface ProfileImageResponse {
  profileImageUrl: string;
}
