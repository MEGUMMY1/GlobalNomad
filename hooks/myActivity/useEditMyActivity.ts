import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { updataMyActivities } from '@/pages/api/myActivities/apimyActivities';
import {
  updataMyActivitiesParams,
  updataMyActivitiesResponse,
} from '@/pages/api/myActivities/apimyActivities.types';
import { useRouter } from 'next/router';
import { usePopup } from '../usePopup';
import { AxiosError } from 'axios';

export default function useEditMyActivity() {
  const router = useRouter();
  const { openPopup } = usePopup();

  const patchActivityMutation: UseMutationResult<
    updataMyActivitiesResponse,
    AxiosError,
    { activityId: number; params: updataMyActivitiesParams }
  > = useMutation({
    mutationFn: ({ activityId, params }) =>
      updataMyActivities(activityId, params),
    onSuccess: () => {
      openPopup({
        popupType: 'alert',
        content: '체험 수정이 완료되었습니다.',
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

  return { patchActivityMutation };
}
