import { apiRefreshToken } from '@/pages/api/auth/auth';
import { useEffect, useState } from 'react';
import useLoginState from './useLoginState';

export default function SilentRefresh() {
  const [refreshed, setRefreshed] = useState(false);
  const { setIsLoggedIn } = useLoginState();

  useEffect(() => {
    const refreshTokenInLocal =
      typeof window !== 'undefined'
        ? localStorage.getItem('refreshToken')
        : null;
    if (refreshTokenInLocal && !refreshed) {
      apiRefreshToken(setIsLoggedIn).then(() => setRefreshed(!refreshed));
    }

    const refreshTokenInSession =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('refreshToken')
        : null;
    if (refreshTokenInSession && !refreshed) {
      apiRefreshToken(setIsLoggedIn).then(() => setRefreshed(!refreshed));
    }

    if (!refreshTokenInLocal && !refreshTokenInSession) setIsLoggedIn(false);
  }, [refreshed]);

  return null;
}
