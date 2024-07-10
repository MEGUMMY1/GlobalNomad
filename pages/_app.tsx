import '@/styles/globals.css';
import '@/styles/calendar.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Popup from '@/components/Popup/Popup';
import Layout from '@/components/Layout/Layout';
import Modal from '@/components/Modal/Modal';
import { useEffect, useState } from 'react';
import { apiRefreshToken } from './api/auth/auth';
import LayoutMobile from '@/components/Layout/LayoutMobile';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  let childContent: React.ReactNode;
  const [refreshed, setRefreshed] = useState(false);

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

  useEffect(() => {
    const refreshToken =
      typeof window !== 'undefined'
        ? localStorage.getItem('refreshToken')
        : null;
    if (refreshToken && !refreshed) {
      apiRefreshToken().then(() => setRefreshed(!refreshed));
    }
  }, [refreshed]);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {childContent}
        <Popup />
        <Modal />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
