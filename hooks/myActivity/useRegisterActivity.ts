import { useMutation, UseMutationResult } from '@tanstack/react-query';
import {
  postActivityResponse,
  postActivityParams,
} from '@/pages/api/activities/apiactivities.types';
import { postActivity } from '@/pages/api/activities/apiactivities';
import { useRouter } from 'next/router';

export default function useRegisterActivity() {
  const router = useRouter();

  const postActivityMutation: UseMutationResult<
    postActivityResponse,
    unknown,
    postActivityParams
  > = useMutation({
    mutationFn: postActivity,
    onSuccess: () => {
      router.push('/myActivity');
    },
  });

  return { postActivityMutation };
}
