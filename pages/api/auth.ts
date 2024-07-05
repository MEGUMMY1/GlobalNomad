import axios from './instance';

export const LoginAccess = async (email: string, password: string) => {
  const response = await axios.post(
    `/auth/login`,
    {
      email,
      password,
    },
    {
      headers: { 'exclude-access-token': true },
    }
  );
  return response;
};
