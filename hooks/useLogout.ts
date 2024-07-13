import useLoginState from './useLoginState';

export default function useLogout() {
  const { setIsLoggedIn } = useLoginState();

  const logout = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
  };

  return logout;
}
