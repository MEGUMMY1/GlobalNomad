import { useMutation, UseMutationResult } from '@tanstack/react-query';
import {
  postActivityResponse,
  postActivityParams,
} from '@/pages/api/activities/apiactivities.types';
import { postActivity } from '@/pages/api/activities/apiactivities';
import { useRouter } from 'next/router';
import { usePopup } from '../usePopup';
import { AxiosError } from 'axios';

export default function useRegisterActivity() {
  const router = useRouter();
  const { openPopup } = usePopup();

  const postActivityMutation: UseMutationResult<
    postActivityResponse,
    unknown,
    postActivityParams
  > = useMutation({
    mutationFn: postActivity,
    onSuccess: () => {
      openPopup({
        popupType: 'alert',
        content: '체험 등록이 완료되었습니다.',
        btnName: ['확인'],
        callBackFnc: () => {
          router.push('/myactivity');
        },
      });
    },
    onError: (err: AxiosError) => {
      if (err.response) {
        const errorMessage = (err.response.data as { message: string }).message;
        openPopup({
          popupType: 'alert',
          content: errorMessage,
          btnName: ['확인'],
        });
      }
    },
  });

  return { postActivityMutation };
}
