import { blockSchema } from '@/types/payload';
import { useCallback } from 'react';
import { z } from 'zod';
import Hero from './Hero';
import Text from './Text';

type Block = z.infer<typeof blockSchema>;

interface Props {
    blocks: Block[];
}

export default function Resolver(props: Props) {
    const components = useCallback((blocks: Block[]) => {
        return blocks.map((block) => {
            switch (block.blockType) {
                case 'hero':
                    return <Hero key={block.id} {...block} />;
                case 'text':
                    return <Text key={block.id} />;
            }
        });
    }, []);

    return <>{components(props.blocks).map((component) => component)}</>;
}
