import { useMutation, UseMutationResult } from '@tanstack/react-query';
import {
  postActivityResponse,
  postActivityParams,
} from '@/pages/api/activities/apiactivities.types';
import { postActivity } from '@/pages/api/activities/apiactivities';

export default function useRegisterActivity() {
  const postActivityMutation: UseMutationResult<
    postActivityResponse,
    unknown,
    postActivityParams
  > = useMutation({
    mutationFn: postActivity,
    onSuccess: () => {
      window.location.reload();
    },
  });

  return { postActivityMutation };
}
