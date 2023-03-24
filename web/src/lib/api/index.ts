import { z, ZodError } from 'zod';
import qs from 'qs';

export const API_URL = process.env.API_URL;

export const apiResponseSchema = function <T extends z.ZodTypeAny>(schema: T) {
    return z.object({
        docs: z.array(schema),
        totalDocs: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        page: z.number(),
        pagingCounter: z.number(),
        hasPrevPage: z.boolean(),
        hasNextPage: z.boolean(),
        prevPage: z.number().nullable().optional(),
        nextPage: z.number().nullable().optional(),
    });
};

interface Query {
    where?: unknown;
    sort?: unknown;
    limit?: number;
    page?: number;
    depth?: number;
}

export async function api(url: string, query: Query = {}) {
    const params = qs.stringify(query, { addQueryPrefix: true });
    const response = await fetch(`${API_URL}${url}${params}`);

    return await response.json();
}

export { getAllPages } from './page';
