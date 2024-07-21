import { getActivityInfoResponse } from '@/pages/api/activities/apiactivities.types';

export interface ActivityDetailsProps {
  id: number;
  activityDataBySSR: getActivityInfoResponse | null;
}
