import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { posttActivityImageResponse } from '@/pages/api/activities/apiactivities.types';
import { postActivityImage } from '@/pages/api/activities/apiactivities';

export default function useActivityImage() {
  const postActivityImageMutation: UseMutationResult<
    posttActivityImageResponse,
    unknown,
    File
  > = useMutation({
    mutationFn: postActivityImage,
    onSuccess: () => {},
  });

  return { postActivityImageMutation };
}
