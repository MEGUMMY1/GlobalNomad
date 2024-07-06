import ActivityDetails from '@/components/ActivityDetails/ActivityDetails';
import activityData from '@/components/ActivityDetails/temp.json';

export default function activityDetails() {
  return <ActivityDetails activity={activityData} />;
}
