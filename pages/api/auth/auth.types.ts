export interface LoginBody {
  email: string;
  password: string;
}
export interface LoginResponse {
  user: {
    id: string;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  refreshToken: string;
  accessToken: string;
}
