import Head from 'next/head';
import { pageMetaProps } from './MetaData.type';

export const MainPageMeta = () => {
  return (
    <Head>
      <meta property="og:title" content="GlobalNomad" />
      <meta
        property="og:description"
        content="사람들이 여행을 갈 때, 가서 뭘 할지, 비용은 얼마인지 등 여러 고민을 하게 된다. 바쁜 현대인의 이런 고민을 줄여주기 위해 플랫폼 안에 잘 짜인 체험 상품을 보고 간단하게 예약할 수 있는 서비스입니다."
      />
      <meta property="og:image" content="/image/globalnomad.png" />
      <meta property="og:url" content="https://globalnomad-5-8.netlify.app" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="GlobalNomad" />
      <meta
        name="twitter:description"
        content="사람들이 여행을 갈 때, 가서 뭘 할지, 비용은 얼마인지 등 여러 고민을 하게 된다. 바쁜 현대인의 이런 고민을 줄여주기 위해 플랫폼 안에 잘 짜인 체험 상품을 보고 간단하게 예약할 수 있는 서비스입니다."
      />
      <meta name="twitter:image" content="/image/globalnomad.png" />
      <meta name="twitter:url" content="https://globalnomad-5-8.netlify.app" />
    </Head>
  );
};

export function ActivityDetailsPageMeta({
  title,
  description,
  bannerImageUrl,
  currentUrl,
}: pageMetaProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={bannerImageUrl} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={bannerImageUrl} />
      <meta name="twitter:url" content={currentUrl} />
    </Head>
  );
}

export const MyPageMeta = () => {
  return (
    <Head>
      <meta property="og:title" content="GlobalNomad" />
      <meta
        property="og:description"
        content="사람들이 여행을 갈 때, 가서 뭘 할지, 비용은 얼마인지 등 여러 고민을 하게 된다. 바쁜 현대인의 이런 고민을 줄여주기 위해 플랫폼 안에 잘 짜인 체험 상품을 보고 간단하게 예약할 수 있는 서비스입니다."
      />
      <meta property="og:image" content="/image/globalnomad.png" />
      <meta property="og:url" content="https://globalnomad-5-8.netlify.app" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="GlobalNomad" />
      <meta
        name="twitter:description"
        content="사람들이 여행을 갈 때, 가서 뭘 할지, 비용은 얼마인지 등 여러 고민을 하게 된다. 바쁜 현대인의 이런 고민을 줄여주기 위해 플랫폼 안에 잘 짜인 체험 상품을 보고 간단하게 예약할 수 있는 서비스입니다."
      />
      <meta name="twitter:image" content="/image/globalnomad.png" />
      <meta name="twitter:url" content="https://globalnomad-5-8.netlify.app" />
    </Head>
  );
};
