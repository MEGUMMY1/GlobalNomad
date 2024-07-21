// pages/activity-details/[id].tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import ActivityDetails from '@/components/ActivityDetails/ActivityDetails';
import { getActivityInfo } from '../api/activities/apiactivities';
import { getActivityInfoResponse } from '../api/activities/apiactivities.types';
import { ActivityDetailsPageMeta } from '@/components/MetaData/MetaData';

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
        metaProps: null,
      },
    };
  }

  try {
    // id를 인자로 getActivityInfo 호출
    const activityData = await getActivityInfo({ id: activityId });

    // metaProps 생성
    const metaProps = {
      title: activityData.title,
      description: activityData.description,
      bannerImageUrl: activityData.bannerImageUrl,
      currentUrl: `https://${context.req.headers.host}/activity-details/${id}`,
    };

    return {
      props: {
        activityDataBySSR: activityData,
        metaProps,
      },
    };
  } catch (error) {
    console.error('Error fetching activity details:', error);
    return {
      props: {
        activityDataBySSR: null,
        metaProps: null,
      },
    };
  }
};

interface ActivityDetailsPageProps {
  activityDataBySSR: getActivityInfoResponse | null;
  metaProps: {
    title: string;
    description: string;
    bannerImageUrl: string;
    currentUrl: string;
  } | null;
}

export default function ActivityDetailsPage({
  activityDataBySSR,
  metaProps,
}: ActivityDetailsPageProps) {
  const router = useRouter();
  const { id } = router.query;
  const activityId = typeof id === 'string' ? parseInt(id, 10) : undefined;

  return (
    <>
      {metaProps && <ActivityDetailsPageMeta {...metaProps} />}
      {activityId && activityDataBySSR && <ActivityDetails id={activityId} />}
    </>
  );
}
