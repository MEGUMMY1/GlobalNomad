import ActivityDetails from '@/components/ActivityDetails/ActivityDetails';
import { useRouter } from 'next/router';

export default function activityDetails() {
  const router = useRouter();
  const { id } = router.query;
  const activityId = typeof id === 'string' ? parseInt(id, 10) : undefined;

  return activityId ? <ActivityDetails id={activityId} /> : null;
}
