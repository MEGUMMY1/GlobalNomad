import {
  EditMyInfoBody,
  EditMyInfoResponse,
} from '@/pages/api/users/apiUser.types';
import { apiEditMyInfo } from '@/pages/api/users/apiUsers';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

export default function useEditMyInfo() {
  const postMyInfoMutation: UseMutationResult<
    EditMyInfoResponse,
    unknown,
    EditMyInfoBody
  > = useMutation({
    mutationFn: apiEditMyInfo,
    onSuccess: () => {
      window.location.reload();
    },
  });

  return { postMyInfoMutation };
}
