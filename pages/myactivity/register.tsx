import { InitialPageMeta } from '@/components/MetaData/MetaData';
import { SSRMetaProps } from '@/components/MetaData/MetaData.type';
import RegisterForm from '@/components/MyActivity/Register/RegisterForm';
import useAuthRedirect from '@/hooks/Auth/useAuthRedirect';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  const OGTitle = '내 체험 등록 | GLOBALNOMAD';
  const OGUrl = 'https://globalnomad-5-8.netlify.app/myactivity/register';
  return {
    props: {
      OGTitle,
      OGUrl,
    },
  };
};

function RegisterActivity({ OGTitle, OGUrl }: SSRMetaProps) {
  // 로그아웃 상태에서 페이지 접근시 로그인 페이지로 redirect
  useAuthRedirect();

  return (
    <>
      <InitialPageMeta title={OGTitle} url={OGUrl} />
      <RegisterForm />;
    </>
  );
}

export default RegisterActivity;
