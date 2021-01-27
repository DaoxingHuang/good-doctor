

import App from "next/app";
import { useEffect } from "react";

function CApp({Component, pageProps}){
    useEffect(()=>{
        console.log(pageProps);
    },[])
    return <Component {...pageProps}></Component>
} 



export default CApp;

export const getServerSideProps = async ({Component, ctx}) => {
    let pageProps = {}
    if (Component.getInitialProps) {// 执行当前页面的getInitialProps
      let data = await Component.getServerSideProps(ctx)
      pageProps = {...data}
    }
    return {pageProps}
}

