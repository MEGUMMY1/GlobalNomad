import '@/styles/globals.css';
import '@/styles/calendar.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Popup from '@/components/Popup/Popup';
import Layout from '@/components/Layout/Layout';
import Modal from '@/components/Modal/Modal';
import LayoutMobile from '@/components/Layout/LayoutMobile';
import SilentRefresh from '@/hooks/useSilentRefresh';
import Spinner from '@/components/Spinner/Spinner';
import { useEffect, useState } from 'react';
import { Router } from 'next/router';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const start = () => setIsLoading(true);
    const end = () => setIsLoading(false);

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  let childContent: React.ReactNode;

  switch (pageProps.layoutType) {
    case 'removeLayout':
      childContent = <Component {...pageProps} />;
      break;
    case 'mobileLayout':
      childContent = (
        <LayoutMobile>
          <Component {...pageProps} />
        </LayoutMobile>
      );
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
          {childContent}
          <Popup />
          <Modal />
          <SilentRefresh />
        </QueryClientProvider>
      )}
    </RecoilRoot>
  );
}
