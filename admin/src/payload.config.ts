import { buildConfig } from 'payload/config';
import path from 'path';
// import Examples from './collections/Examples';
import Users from './collections/Users';
import Pages from './collections/Pages';
import Media from './collections/Media';

export default buildConfig({
    serverURL: 'http://localhost:3001',
    admin: {
        user: Users.slug,
    },
    collections: [
        Users,
        Pages,
        Media,
        // Add Collections here
        // Examples,
    ],
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    graphQL: {
        disable: true,
    },
    debug: true,
});
