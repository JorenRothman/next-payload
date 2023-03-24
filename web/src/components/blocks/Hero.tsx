import { heroSchema } from '@/types/payload';
import { z } from 'zod';

type Props = z.infer<typeof heroSchema>;

export default function Hero({ title, text, image }: Props) {
    console.log(image);
    return (
        <div>
            <h1>{title}</h1>
            <p>{text}</p>
            <img src={image.url} alt={image.alt} />
        </div>
    );
}
