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

// React Query
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
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
