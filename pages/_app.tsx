import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Popup from '@/components/Popup/Popup';
import Layout from '@/components/Layout/Layout';
// import Modal from '@/components/Modal/Modal';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
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
      <QueryClientProvider client={queryClient}>
        {childContent}
        <Popup />
        {/* <Modal /> */}
      </QueryClientProvider>
    </RecoilRoot>
  );
}
