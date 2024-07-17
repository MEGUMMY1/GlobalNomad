import { appKey } from '@/static/appKey';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <title>GlobalNomad</title>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services,clusterer,drawing &autoload=false`}
        ></script>
        <meta property="og:title" content="GlobalNomad" />
        <meta
          property="og:description"
          content="사람들이 여행을 갈 때, 가서 뭘 할지, 비용은 얼마인지 등 여러 고민을 하게 된다. 바쁜 현대인의 이런 고민을 줄여주기 위해 플랫폼 안에 잘 짜인 체험 상품을 보고 간단하게 예약할 수 있는 서비스입니다."
        />
        <meta property="og:image" content="/image/globalnomad.png" />
        <meta property="og:url" content="https://globalnomad-5-8.netlify.app" />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
