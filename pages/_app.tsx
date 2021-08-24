import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0';
import { AppProps } from 'next/app';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Head>
        <title>Video player</title>
      </Head>
      <Component {...pageProps} />
    </UserProvider>
  );
}
