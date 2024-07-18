import '@/styles/globals.css';
import '@/styles/calendar.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Popup from '@/components/Popup/Popup';
import Layout from '@/components/Layout/Layout';
import Modal from '@/components/Modal/Modal';
import SilentRefresh from '@/hooks/useSilentRefresh';
import Spinner from '@/components/Spinner/Spinner';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SidenNavigationMobile from '@/components/SideNavigation/SideNavigationMobile';
import Theme from '@/components/Theme/Theme';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  let childContent: React.ReactNode;

  switch (pageProps.layoutType) {
    case 'removeLayout':
      childContent = <Component {...pageProps} />;
      break;
    default:
      childContent = (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
      break;
  }

  return (
    <RecoilRoot>
      {isLoading ? (
        <Spinner />
      ) : (
        <QueryClientProvider client={queryClient}>
          <Theme />
          {childContent}
          <Popup />
          <Modal />
          <SidenNavigationMobile />
          <SilentRefresh />
        </QueryClientProvider>
      )}
    </RecoilRoot>
  );
}
