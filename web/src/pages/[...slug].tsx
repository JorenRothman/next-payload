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

const paramsSchema = z
    .object({
        slug: z.array(z.string()),
    })
    .optional();

interface Request {
    params: unknown;
}

export const getStaticProps = async ({ params }: Request) => {
    try {
        const safeParams = paramsSchema.parse(params);

        const slug = safeParams?.slug
            ? (safeParams.slug as string[]).join('/')
            : 'home';

        const response = await getPageBySlug(slug);

        const page = response.docs[0];

        return {
            props: {
                page,
            },
            revalidate: 1,
        };
    } catch (error) {
        console.log(error);
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
