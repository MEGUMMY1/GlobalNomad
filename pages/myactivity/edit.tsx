import RegisterForm from '@/components/MyActivity/Register/RegisterForm';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getActivityInfoResponse } from '../api/activities/apiactivities.types';
import { getActivityInfo } from '../api/activities/apiactivities';

function EditMyActivity() {
  const { query } = useRouter();
  const id = Number(query.activityId);
  const { data: activityData } = useQuery<getActivityInfoResponse>({
    queryKey: ['activityDetailsEdit', id],
    queryFn: () => getActivityInfo({ id }),
  });

  return <RegisterForm activityData={activityData} isEdit />;
}

export default EditMyActivity;
