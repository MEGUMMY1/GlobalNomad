import { loginState } from '@/states/loginState';
import { useRecoilState } from 'recoil';

export default function useLoginState() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

  return { isLoggedIn, setIsLoggedIn };
}
