'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schema/signInSchema";
import { z } from "zod"
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import Link from "next/link";


export default function page() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState("");
  const router = useRouter()
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Login Attempt:", { email, password });
   
//   };
  
     const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        const result = await signIn('credentials',{
            redirect: false,
            identifier: data.identifier,
            password: data.password
        })
        // TODO: console log error
        console.log("result:",result);
        if(result?.error){
            toast.error(" username or password incorrect" )
        }     
        if(result?.url){
            toast.success("login successfully")
            router.replace('/dashboard')
        }   
    }
 const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues:{
            identifier:'',
            password: ''
        }
    })
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-green-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          🌱 CropAI Login
        </h1>

        {/* Form */}
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField 
                name="identifier"
                control={form.control}
                 render={({field}) => (
                 <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700">Email/Number</FormLabel>
                    <FormControl>
                        <Input 
                        placeholder="email/number" {...field}
                        />
                        </FormControl>
                        </FormItem>
                        )}>

                        </FormField>
                        <FormField 
                        name="password"
                        control={form.control}
                        render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                 placeholder="Enter password" {...field}
                                 className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                 type="password"
                                 />  
                            </FormControl>
                        </FormItem>
                        )}>  
                        </FormField>
                        <Button className='cursor-pointer' type="submit">sign in
                        </Button>
                        </form>
                    </Form>
                {/* Extra Links */}
                <div className="flex justify-between mt-4 text-sm text-gray-600">
                <a href="#" className="hover:text-green-600">Forgot Password?</a>
                <a href="/signup" className="hover:text-green-600">Create Account</a>
                </div>
            </div>
        </div>
  );



// return(
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//                 <div className="text-center">
//                     <h1 className="text-4xl font-extrabold tacking-light lg:text-5xl mb-6">Join Mystry Message
//                     </h1>
//                     <p className="mb-4"> sign in to start your anonymous adventure</p>                 
//                 </div>
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                       
//                         <FormField 
//                         name="identifier"
//                         control={form.control}
//                         render={({field}) => (
//                             <FormItem>
//                                 <FormLabel>Email/Username</FormLabel>
//                                 <FormControl>
//                                     <Input 
//                                         placeholder="email/username" {...field}
//                                     />
//                                 </FormControl>
//                             </FormItem>
//                         )}
//                         > 
//                         </FormField>
//                         <FormField 
//                         name="password"
//                         control={form.control}
//                         render={({field}) => (
//                             <FormItem>
//                                 <FormLabel>Password</FormLabel>
//                                 <FormControl>
//                                     <Input 
//                                         placeholder="password" {...field}
//                                     />  
//                                 </FormControl>
//                             </FormItem>
//                         )}
//                         >  
//                         </FormField>
//                         <Button className='cursor-pointer' type="submit">
//                             sign in
//                         </Button>
//                     </form>
//                 </Form>
//                 <div className="text-center mt-4">
//                         <p>
//                             Not a member?{""}
//                             <Link href='/sign-up' className="text-blue-600 hover:text-blue-800">Sign-up</Link>
//                         </p>
//                  </div>
//             </div>
//         </div>
//     )
}



