import Head from 'next/head';
import { Provider } from 'react-redux';
import { UserProvider } from '@auth0/nextjs-auth0';
import { store } from '../redux/store';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <title>Video player</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </UserProvider>
  );
}

export default MyApp;
