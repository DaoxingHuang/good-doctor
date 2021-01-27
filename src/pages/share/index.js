import Link from 'next/link';
import Head from "next/head";
import Layout from "../components/layout";
import { Component, useEffect } from 'react';
import { SharePrinciples, ShareParams } from "../../util/types";
import { wait } from 'next/dist/build/output/log';

/**
 * 
 * 
 * @param {Object} props
 * @example
 * <meta property="og:title" content="Kebanyakan Olahraga Bisa Berbahaya, Ini 7 Efek Buruknya bagi Tubuh!">
 * @return {Component} 
 */

 export default class Share extends Component{

  static getInitialProps = async ctx => {
    // const appProps = await App.getInitialProps(appContext)
    const query = ctx.query;
    console.log(133, query);
    const p = query[ShareParams.Principle]||SharePrinciples.OG;
    const t = query[ShareParams.Title];
    console.log(133, query, p, t);
    delete query[ShareParams.Principle];
    delete query[ShareParams.Title];
    console.log(133, query, p, t);
    // const res = await fetch('https://api.github.com/repos/vercel/next.js')
    // const json = await res.json()
    // const pp = new Promise.resolve({title:t, principles: p.split(','), metas: {...query, title:t}})
    return  {title:t, principles: p.split(','), metas: {...query, title:t}}
    // return  await setTimeout(()=>{
    //     {title:t, principles: p.split(','), metas: {...query, title:t}};
    // },0);
  };
  
  //  useEffect(()=>{
  //         console.log('share:',this.props)
  //   },[])

    render(){
      console.log('share:',this.props)
      return (
        <Layout>
            <Head>
              {this.props.metas && this.props.principles.map(item=>{
                  const metas = Object.keys(this.props.metas).map(key=>{
                    return <meta property={`${item}:${key}`} content={this.props.metas[key]}></meta>
                  });
                  console.log('metas:',metas)
                  return metas;
              })}
              <title>{this.props.title}</title>
            </Head>
        </Layout>
      )
    }
 }
// function Share(props) {
//   useEffect(()=>{
//       console.log('share:',props)
//   },[])
//   return (
//     <Layout>
//         <Head>
//           {/* {props.metas && props.principles.map(item=>{
//             debugger;
//               Object.keys(props.metas).map(key=>{
//                 return <meta property={`${item}:${key}`} content={props.metas[key]}></meta>
//               });
//           })} */}
//           <title>{props.title}</title>
//         </Head>
//     </Layout>
//   )
// }
// Share.getInitialProps =  ctx => {
//   return {a:123};
//   // const appProps = await App.getInitialProps(appContext)
//   const query = ctx.query;
//   console.log(133, query);
//   const p = query[ShareParams.Principle]||SharePrinciples.OG;
//   const t = query[ShareParams.Title];
//   console.log(133, query, p, t);
//   delete query[ShareParams.Principle];
//   delete query[ShareParams.Title];
//   console.log(133, query, p, t);
//   // const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   // const json = await res.json()
//   // const pp = new Promise.resolve({title:t, principles: p.split(','), metas: {...query, title:t}})
//   return {title:t, principles: p.split(','), metas: {...query, title:t}}
//   // return  await setTimeout(()=>{
//   //     {title:t, principles: p.split(','), metas: {...query, title:t}};
//   // },0);
// }
// export default Share;