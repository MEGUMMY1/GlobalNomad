import { InitialPageMeta } from '@/components/MetaData/MetaData';
import { SSRMetaProps } from '@/components/MetaData/MetaData.type';
import RegisterForm from '@/components/MyActivity/Register/RegisterForm';
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
  return (
    <>
      <InitialPageMeta title={OGTitle} url={OGUrl} />
      <RegisterForm />;
    </>
  );
}

export default RegisterActivity;
