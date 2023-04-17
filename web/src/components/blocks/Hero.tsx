import { heroSchema } from '@/types/payload';
import Image from 'next/image';
import { z } from 'zod';

type Props = z.infer<typeof heroSchema>;

export default function Hero({ title, text, image }: Props) {
    return (
        <div className="bg-slate-700 text-white min-h-screen flex justify-center items-center">
            <div className="container justify-between flex gap-12">
                <div className="max-w-lg">
                    <h1 className="text-3xl mb-4">{title}</h1>
                    <p>{text}</p>
                </div>

                <Image
                    className="grow-0 shrink max-w-md"
                    src={image.url || ''}
                    alt={image.alt || ''}
                    width={image.width}
                    height={image.height}
                ></Image>
            </div>
        </div>
    );
}
