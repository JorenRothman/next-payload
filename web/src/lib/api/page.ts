import { PageSchema } from '@/types/payload';
import { api, apiResponseSchema, API_URL } from '.';

export const getAllPages = async () => {
    // Fetch all pages from the API
    const response = await api('/pages');

    // Create expected Zod schema
    // combines the API response schema with the PageSchema
    const schema = apiResponseSchema(PageSchema);

    // Validate the response using the schema
    const data = schema.parse(response);

    // Return the data
    return data;
};

export const getPageBySlug = async (slug: string) => {
    const response = await api('/pages', {
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 1,
    });

    const schema = apiResponseSchema(PageSchema);

    const data = schema.parse(response);

    if (data.totalDocs === 0) {
        throw new Error('Page not found');
    }

    return data;
};
