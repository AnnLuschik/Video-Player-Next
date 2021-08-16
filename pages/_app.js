import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <title>Video player</title>
      </Head>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
