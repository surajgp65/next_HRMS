import "../Components/assets/scss/themes.scss";
import React, { ReactElement, ReactNode } from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import SSRProvider from "react-bootstrap/SSRProvider";
import { wrapper } from "../Components/slices";

import {
  AppContext,
  AppInitialProps,
  AppLayoutProps,
  AppProps,
} from "next/app";
import type { NextComponentType, NextPage } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";

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
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Hybrix | Next js & Admin Dashboard </title>
      </Head>
      <SSRProvider>
        <Provider store={store}>
          {getLayout(<Component {...pageProps} />)}
          <ToastContainer />
          <div className="">
            <Spinner
              id="showLoader"
              animation="border"
              className="position-fixed"
              style={loaderStyle}
              variant="primary"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </Provider>
      </SSRProvider>
    </>
  );
};

let loaderStyle = {
  // background: "white",
  // top: "43%",
  // width: "5.5rem",
  // height: "5.5rem",
  // left: "48%",
  right: "3rem",
  bottom: "3rem",
  width: "2.5rem",
  height: "2.5rem",
  zIndex: "999999",
};

export default MyApp;
