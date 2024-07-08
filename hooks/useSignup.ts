import { SignupBody, SignupResponse } from '@/pages/api/users/apiUser.types';
import { apiSignup } from '@/pages/api/users/apiUsers';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { usePopup } from './usePopup';

export default function useSignup() {
  const router = useRouter();
  const { openPopup } = usePopup();

  const postSignupMutation: UseMutationResult<
    SignupResponse,
    AxiosError,
    SignupBody
  > = useMutation({
    mutationFn: apiSignup,
    onError: (error) => {
      if (error.response?.status === 409) {
        openPopup({
          popupType: 'alert',
          content: '이미 사용중인 이메일입니다.',
          btnName: ['확인'],
        });
      } else {
        console.error('Sign up failed:', error.message);
      }
    },
    onSuccess: () => {
      openPopup({
        popupType: 'alert',
        content: '가입이 완료되었습니다!',
        btnName: ['확인'],
        callBackFnc: () => router.push(`/login`),
      });
    },
  });

  return { postSignupMutation };
}
