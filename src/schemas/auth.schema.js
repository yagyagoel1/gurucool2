import { z } from 'zod';


export const registerLoginSchema = ({email,password})=>{
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });
    return schema.safeParse({email,password});
};