import Head from 'next/head';
import siteMetadata from '@/data/siteMetadata';

export default function GoogleAnalytics() {
  const measurementId = siteMetadata.googleAnalyticsId;

  return (
    <Head>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
      <script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}');`
        }}
      />
    </Head>
  );
}
