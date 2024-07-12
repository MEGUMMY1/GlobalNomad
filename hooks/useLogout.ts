import { useRouter } from 'next/router';
import useLoginState from './useLoginState';

export default function useLogout() {
  const { setIsLoggedIn } = useLoginState();
  const route = useRouter();

  const logout = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    route.push('/');
  };

  return logout;
}
