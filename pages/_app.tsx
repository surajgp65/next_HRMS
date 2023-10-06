import "../Components/assets/scss/themes.scss";
import React, { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import { Provider } from "react-redux";
import SSRProvider from 'react-bootstrap/SSRProvider';
import { wrapper } from '../Components/slices';

import { AppContext, AppInitialProps, AppLayoutProps, AppProps } from 'next/app';
import type { NextComponentType, NextPage } from 'next';

// Import Firebase Configuration file
// import { initFirebaseBackend } from "Components/helpers/firebase_helper";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_APIKEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
//   databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
//   projectId: process.env.NEXT_PUBLIC_PROJECTID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
//   appId: process.env.NEXT_PUBLIC_APPID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
// };
  
// // init firebase backend
// initFirebaseBackend(firebaseConfig);


// Fake backend
// import fakeBackend from "Components/helpers/AuthType/fakeBackend";

// Activating fake backend
// fakeBackend();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
  ...rest
}: AppPropsWithLayout) => {
  const { store } = wrapper.useWrappedStore(rest);
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Hybrix | Next js & Admin Dashboard </title>
      </Head>
      <SSRProvider>
        <Provider store={store}>
          {getLayout(<Component {...pageProps} />)}
        </Provider>
      </SSRProvider>
    </>
  );
};

export default MyApp;