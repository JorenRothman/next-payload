import Resolver from '@/components/blocks/Resolver';
import { getAllPages } from '@/lib/api';
import { getPageBySlug } from '@/lib/api/page';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { z } from 'zod';

export default function Page(
    props: InferGetStaticPropsType<typeof getStaticProps>
) {
    return <Resolver blocks={props.page.blocks} />;
}

const paramsSchema = z.object({
    slug: z.string(),
});

interface Request {
    params: unknown;
}

export const getStaticProps = async ({ params }: Request) => {
    try {
        const safeParams = paramsSchema.parse(params);

        const response = await getPageBySlug(safeParams.slug);

        const page = response.docs[0];

        return {
            props: {
                page,
            },
            revalidate: 1,
        };
    } catch (error) {
        return { notFound: true };
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    const pages = await getAllPages();

    return {
        paths: pages.docs.map((page) => ({
            params: {
                slug: page.slug,
            },
        })),
        fallback: 'blocking',
    };
};
