import RegisterForm from '@/components/MyActivity/Register/RegisterForm';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getActivityInfoResponse } from '../api/activities/apiactivities.types';
import { getActivityInfo } from '../api/activities/apiactivities';
import { GetServerSideProps } from 'next';
import { InitialPageMeta } from '@/components/MetaData/MetaData';
import { SSRMetaProps } from '@/components/MetaData/MetaData.type';
import useAuthRedirect from '@/hooks/useAuthRedirect';

export const getServerSideProps: GetServerSideProps = async () => {
  const OGTitle = '내 체험 수정 | GLOBALNOMAD';
  const OGUrl = 'https://globalnomad-5-8.netlify.app/myactivity/edit';
  return {
    props: {
      OGTitle,
      OGUrl,
    },
  };
};

function EditMyActivity({ OGTitle, OGUrl }: SSRMetaProps) {
  const { query } = useRouter();
  // 로그아웃 상태에서 페이지 접근시 로그인 페이지로 redirect
  useAuthRedirect();
  const id = Number(query.activityId);
  const { data: activityData } = useQuery<getActivityInfoResponse>({
    queryKey: ['activityDetailsEdit', id],
    queryFn: () => getActivityInfo({ id }),
  });

  return (
    <>
      <InitialPageMeta title={OGTitle} url={OGUrl} />
      <RegisterForm activityData={activityData} isEdit />;
    </>
  );
}

export default EditMyActivity;
