import { SetterOrUpdater } from 'recoil';
import INSTANCE_URL from '../instance';
import { LoginBody, LoginResponse } from './auth.types';

const JWT_EXPIRY_TIME = 30 * 60 * 1000;

export const LoginAccess = async (body: LoginBody): Promise<LoginResponse> => {
  const response = await INSTANCE_URL.post('/auth/login', body);
  return response.data;
};

export const apiRefreshToken = async (
  setIsLoggedIn: SetterOrUpdater<boolean>
): Promise<LoginResponse | void> => {
  const currentrefreshToken = localStorage.getItem('refreshToken');
  INSTANCE_URL.defaults.headers.common['Authorization'] =
    `Bearer ${currentrefreshToken}`;

  try {
    const response = await INSTANCE_URL.post('/auth/tokens');

    const { accessToken, refreshToken } = response.data;
    INSTANCE_URL.defaults.headers.common['Authorization'] =
      `Bearer ${accessToken}`;

    localStorage.setItem('refreshToken', refreshToken);
    setIsLoggedIn(true);

    setTimeout(apiRefreshToken, JWT_EXPIRY_TIME - 60000);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
