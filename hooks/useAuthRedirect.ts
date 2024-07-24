import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { usePopup } from './usePopup';
import useLoginState from './useLoginState';

export default function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      router.push('/login');
    }
  }, [router]);
}
