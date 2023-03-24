import { z } from 'zod';

const mediaSchema = z.object({
    id: z.string(),
    alt: z.string().optional(),
    url: z.string().optional(),
    filename: z.string().optional(),
    mimeType: z.string().optional(),
    filesize: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const heroSchema = z.object({
    title: z.string(),
    text: z.string(),
    image: z.string().or(mediaSchema),
    id: z.string().optional(),
    blockName: z.string().optional(),
    blockType: z.literal('hero'),
});

export const textSchema = z.object({
    text: z.array(z.unknown()),
    id: z.string().optional(),
    blockName: z.string().optional(),
    blockType: z.literal('text'),
});

export const blockSchema = z.union([heroSchema, textSchema]);

export const PageSchema = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string().optional(),
    blocks: blockSchema.array(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const PagesSchema = z.array(PageSchema);

export type Page = z.infer<typeof PageSchema>;
