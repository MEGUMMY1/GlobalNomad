// pages/activity-details/[id].tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import ActivityDetails from '@/components/ActivityDetails/ActivityDetails';
import { getActivityInfo } from '../api/activities/apiactivities';
import { getActivityInfoResponse } from '../api/activities/apiactivities.types';

export const getServerSideProps: GetServerSideProps = async (context) => {
  // context.query에서 id 추출
  const { id } = context.query;

  // id가 문자열인 경우 숫자로 변환
  const activityId = typeof id === 'string' ? parseInt(id, 10) : undefined;

  // activityId가 유효한 숫자인지 확인
  if (activityId === undefined || isNaN(activityId)) {
    console.error('유효하지 않은 활동 ID:', id);
    return {
      props: {
        activityDataBySSR: null,
      },
    };
  }

  try {
    // id를 인자로 getActivityInfo 호출
    const activityData = await getActivityInfo({ id: activityId });
    console.log(activityData);
    return {
      props: {
        activityDataBySSR: activityData,
      },
    };
  } catch (error) {
    console.error('Error fetching activity details:', error);
    return {
      props: {
        activityDataBySSR: null,
      },
    };
  }
};

interface ActivityDetailsPageProps {
  activityDataBySSR: getActivityInfoResponse | null;
}

export default function ActivityDetailsPage({
  activityDataBySSR,
}: ActivityDetailsPageProps) {
  const router = useRouter();
  const { id } = router.query;
  const activityId = typeof id === 'string' ? parseInt(id, 10) : undefined;

  return activityId ? (
    <ActivityDetails id={activityId} activityDataBySSR={activityDataBySSR} />
  ) : null;
}
