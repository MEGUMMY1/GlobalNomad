import { apiMyInfo } from '@/pages/api/users/apiUsers';
import { userDefaultState, userState } from '@/states/userState';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useLoginState from './useLoginState';

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
    const userId = localStorage.getItem('userId') || '';
    if (userId) setUserId(userId);
  }, [userId]);

  return { userData, isLoading };
};
