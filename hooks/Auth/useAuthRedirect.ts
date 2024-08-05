import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const refreshToken =
      localStorage.getItem('refreshToken') ||
      sessionStorage.getItem('refreshToken');
    if (!refreshToken) {
      router.push('/login');
    }
  }, [router]);
}
