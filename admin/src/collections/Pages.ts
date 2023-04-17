import { Block, CollectionConfig } from 'payload/types';

const Hero: Block = {
    slug: 'hero',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'text',
            type: 'textarea',
            required: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            maxDepth: 2,
            required: true,
        },
    ],
};

const Text: Block = {
    slug: 'text',
    fields: [
        {
            name: 'text',
            type: 'richText',
            required: true,
        },
    ],
};

const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            unique: true,
            index: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'blocks',
            type: 'blocks',
            required: true,
            blocks: [Hero, Text],
        },
    ],
    hooks: {
        beforeChange: [
            ({ data }) => {
                if (!data.slug) {
                    data.slug = data.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]/g, '-')
                        .replace(/-+/g, '-')
                        .replace(/^-|-$/g, '');
                }

                if (data.slug) {
                    data.slug = data.slug.toLowerCase();
                }

                return data;
            },
        ],
    },
};

export default Pages;
