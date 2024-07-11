import { apiRefreshToken } from '@/pages/api/auth/auth';
import { useEffect, useState } from 'react';
import useLoginState from './useLoginState';

export default function SilentRefresh() {
  const [refreshed, setRefreshed] = useState(false);
  const { setIsLoggedIn } = useLoginState();

  useEffect(() => {
    const refreshToken =
      typeof window !== 'undefined'
        ? localStorage.getItem('refreshToken')
        : null;
    if (refreshToken && !refreshed) {
      apiRefreshToken(setIsLoggedIn).then(() => setRefreshed(!refreshed));
    }

    if (!refreshToken) setIsLoggedIn(false);
  }, [refreshed]);

  return null;
}
