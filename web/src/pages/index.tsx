import { getAllPages } from '@/lib/api';
import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Page, { getStaticProps as sharedGetStaticProps } from './[...slug]';

export default Page;

export const getStaticProps = async (ctx) => {
    const func = sharedGetStaticProps.bind(this);

    return func(ctx);
};
