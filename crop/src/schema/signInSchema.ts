import {z} from "zod";

export const signInSchema = z.object({
    identifier:z.string(),
    // contactNumber: z.string(),
    password:z.string()
})