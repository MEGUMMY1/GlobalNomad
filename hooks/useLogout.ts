import { useRouter } from 'next/router';
import useLoginState from './useLoginState';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { userDefaultState, userState } from '@/states/userState';
import { useQueryClient } from '@tanstack/react-query';

export default function useLogout() {
  const { setIsLoggedIn } = useLoginState();
  const route = useRouter();
  const [userData, setUserData] = useRecoilState(userState);
  const queryClient = useQueryClient();

  const logout = () => {
    console.log(userData.id);
    queryClient.removeQueries({ queryKey: ['user', userData.id] });
    setUserData(userDefaultState);
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('userId');
    setIsLoggedIn(false);
    route.push('/');
  };

  return logout;
}
