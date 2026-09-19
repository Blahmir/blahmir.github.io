import type { AppProps } from 'next/app';
import Head from 'next/head';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@/css/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#08090c" />
      </Head>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}
