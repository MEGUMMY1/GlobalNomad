import { ProfileImageResponse } from '@/pages/api/users/apiUser.types';
import { apiProfileImage } from '@/pages/api/users/apiUsers';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

export default function useUploadProfile() {
  const postProfileImgMutation: UseMutationResult<
    ProfileImageResponse,
    unknown,
    FormData
  > = useMutation({
    mutationFn: apiProfileImage,
  });

  return { postProfileImgMutation };
}
