import { apiMyInfo } from '@/pages/api/users/apiUsers';
import { userState } from '@/states/userState';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export const useUserData = () => {
  const [userId, setUserId] = useState<string>();
  const [userData, setUserData] = useRecoilState(userState);

  const { data: userResponseData, isError } = useQuery({
    queryKey: ['user', userId],
    queryFn: apiMyInfo,
    enabled: !!userId,
  });

  useEffect(() => {
    if (userResponseData) {
      setUserData(userResponseData);
    }
  }, [userResponseData]);

  useEffect(() => {
    console.log('hi');
    const userId = localStorage.getItem('userId') || '';
    setUserId(userId);
  }, []);

  return userData;
};
