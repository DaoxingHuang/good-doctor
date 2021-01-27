import Link from 'next/link';
import Head from "next/head";
import { } from "next/document";
import Layout from "../components/layout";
import { Component, useEffect } from 'react';
import { SharePrinciples, ShareParams } from "../../util/types";
import Schema from "../../config/schema";
import { openApp } from "../../mobile/evocation";
import { useRouter } from 'next/router'

/**
 * 
 * Share page
 * @param {Object} props
 * @example
 * <meta property="og:title" content="Kebanyakan Olahraga Bisa Berbahaya, Ini 7 Efek Buruknya bagi Tubuh!">
 * @return {Component} 
 */

function Share(props) {

  const router = useRouter()

  useEffect(()=>{
    const {schema} = props;
    schema && openApp(schema);
    !schema && router.push('/404');
  },[])
  return (
    <>
        <Head>
          {props.metas && props.principles.map(item=>{
              const metas = Object.keys(props.metas).map(key=>{
                return <meta property={`${item}:${key}`} content={props.metas[key]}></meta>
              });
              return metas;
          })}
          {/* <meta property="og:title" content="Title Here" />
          <meta property="og:url" content="http://www.example.com/" />
          <meta property="og:image" content="http://example.com/image.jpg" />
          <meta property="og:description" content="Description Here" /> */}
          <title>{props.title}</title>
        </Head>
        <div>{props.description}</div>
    </>
  )
}
export default Share;

export const getServerSideProps =  ctx => {
  const query = ctx.query;
  const p = query[ShareParams.Principle]||SharePrinciples.OG;
  const t = query[ShareParams.Title];
  const id = query[ShareParams.ID];
  const desc = query[ShareParams.DESC]
  delete query[ShareParams.Principle];
  delete query[ShareParams.Title];
  delete query[ShareParams.ID];
  delete query[ShareParams.DESC];

  const schemas = ctx.req.state.loaclMemory.schemaConfig||[];
  const schema = schemas.find(item=>item.id == id);

  return {props :{title:t, principles: p.split(','),description:desc, metas: {...query, title:t, description:desc}, schema}}
}

