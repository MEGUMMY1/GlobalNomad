import { apiMyInfo } from '@/pages/api/users/apiUsers';
import { userState } from '@/states/userState';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useLoginState from './Auth/useLoginState';

export const useUserData = () => {
  const [userId, setUserId] = useState<string>();
  const [userData, setUserData] = useRecoilState(userState);
  const { isLoggedIn } = useLoginState();

  const { data: userResponseData, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: apiMyInfo,
    enabled: !!isLoggedIn && !!userId,
  });
  useEffect(() => {
    if (userResponseData) {
      setUserData(userResponseData);
    }
  }, [userResponseData]);

  useEffect(() => {
    let storedUserId = localStorage.getItem('userId') || '';
    if (!storedUserId) {
      storedUserId = sessionStorage.getItem('userId') || '';
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [userId]);

  return { userData, isLoading };
};
