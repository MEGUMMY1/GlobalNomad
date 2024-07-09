import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { usePopup } from './usePopup';
import { LoginBody, LoginResponse } from '@/pages/api/auth/auth.types';
import { LoginAccess } from '@/pages/api/auth/auth';

export default function useLogin() {
  const router = useRouter();
  const { openPopup } = usePopup();

  const postLoginMutation: UseMutationResult<
    LoginResponse,
    AxiosError,
    LoginBody
  > = useMutation({
    mutationFn: LoginAccess,
    onError: (error) => {
      if (error.response?.status === 400) {
        openPopup({
          popupType: 'alert',
          content: '비밀번호를 다시 한번 확인해주세요',
          btnName: ['확인'],
        });
      } else {
        openPopup({
          popupType: 'alert',
          content: '존재하지 않는 이메일 입니다.',
          btnName: ['확인'],
        });
      }
    },
    onSuccess: (data) => {
      openPopup({
        popupType: 'alert',
        content: '환영합니다!',
        btnName: ['확인'],
        callBackFnc: () => router.push(`/`),
      });

      const { accessToken, refreshToken, user } = data;

      localStorage.setItem('userId', user.id);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    },
  });

  return { postLoginMutation };
}
