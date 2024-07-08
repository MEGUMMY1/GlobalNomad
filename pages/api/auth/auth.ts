import INSTANCE_URL from '../instance';
import { LoginBody, LoginResponse } from './auth.types';

export const LoginAccess = async (body: LoginBody): Promise<LoginResponse> => {
  const response = await INSTANCE_URL.post('/auth/login', body);
  return response.data;
};
