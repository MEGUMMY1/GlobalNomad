import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query';
import { apiDeleteMyNotification } from '@/pages/api/myNotifications/apiMyNotifications';
import { NotificationId } from '@/pages/api/myNotifications/apiMyNotifications.types';
import { useQueryClient } from '@tanstack/react-query';

export default function useDeleteNotification() {
  const queryClient = useQueryClient();

  const deleteNotificationMutation = useMutation({
    mutationFn: (id: number) => apiDeleteMyNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries(
        'myNotifications' as InvalidateQueryFilters
      );
    },
  });

  return { deleteNotificationMutation };
}
