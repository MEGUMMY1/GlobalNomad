import { InitialPageMeta } from '@/components/MetaData/MetaData';
import { SSRMetaProps } from '@/components/MetaData/MetaData.type';
import MyPageInput from '@/components/MyPageInput/MyPageInput';
import SidenNavigation from '@/components/SideNavigation/SideNavigation';
import SidenNavigationMobile from '@/components/SideNavigation/SideNavigationMobile';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import useLoginState from '@/hooks/useLoginState';
import { useSideNavigation } from '@/hooks/useSideNavigation';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async () => {
  const OGTitle = '내정보 | GLOBALNOMAD';
  const OGUrl = 'https://globalnomad-5-8.netlify.app/mypage';
  return {
    props: {
      OGTitle,
      OGUrl,
    },
  };
};

export default function MyPage({ OGTitle, OGUrl }: SSRMetaProps) {
  const route = useRouter();
  const { isLoggedIn } = useLoginState();
  const { isOpen } = useSideNavigation();
  // 로그아웃 상태에서 페이지 접근시 로그인 페이지로 redirect
  useAuthRedirect();

  return (
    <>
      <InitialPageMeta title={OGTitle} url={OGUrl} />
      <div
        className={`flex justify-center w-full mt-[72px] gap-[24px] t:mt-[24px] t:gap-[16px] m:mt-[26px] ${isOpen ? 'fixed' : ''}`}
      >
        <div className="m:hidden">
          <SidenNavigation />
        </div>
        <MyPageInput />
      </div>
      <SidenNavigationMobile />
    </>
  );
}
