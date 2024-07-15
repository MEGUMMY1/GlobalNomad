import { deleteMyActivities } from '@/pages/api/myActivities/apimyActivities';
import { useMutation } from '@tanstack/react-query';

export default function useDeleteActivity() {
  const deleteMyActivityMutation = useMutation({
    mutationFn: deleteMyActivities,
    onSuccess: () => {
      window.location.reload();
    },
  });

  return { deleteMyActivityMutation };
}
