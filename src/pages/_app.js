import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import 'antd/dist/antd.compact.css';
import { Provider } from 'mobx-react';
import store from '../stores';

function CApp({ Component, pageProps }) {
  useEffect(() => {}, []);
  return (
    <Provider {...store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default CApp;

export const getServerSideProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    // 执行当前页面的getInitialProps
    const data = await Component.getServerSideProps(ctx);
    pageProps = { ...data };
  }
  return { pageProps };
};
