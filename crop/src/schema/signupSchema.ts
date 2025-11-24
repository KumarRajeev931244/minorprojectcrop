import {z} from 'zod';

export const farmerNameValidation = z
    .string()
    .min(2,{message:"name must be atleast 2 character"})
    .max(10,{message:"name not more than 10 character"})
    .regex(/^[a-zA-Z\s'-]+$/,{message:"name must not contain special character"})

export const signupSchema = z.object({
    username:farmerNameValidation,
    contactNumber: z
        .string()
        .max(10)
        .min(0),
    email: z
        .string()
        .email({message:"invalid email address"}),
    password: z
        .string()
        .min(4,{message: "password must be atleast 4 character"})
})