import { CollectionConfig } from 'payload/types';

// Media Collection used for uploading images and files
const Media: CollectionConfig = {
    slug: 'media',
    upload: {
        staticURL: '/media',
        staticDir: 'media',
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
        },
    ],
    access: {
        read: () => true,
    },
};

export default Media;
