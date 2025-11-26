'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import { signupSchema } from "@/schema/signupSchema"
const Page = () => {
    // const [username, setUsername] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues:{
            username:'',
            email:'',
            password: '',
            contactNumber:''
        }
    })


    const onSubmit = async (data: z.infer<typeof signupSchema>) => {
        setIsSubmitting(true)
        try {
            // making api call
            const response = await axios.post<ApiResponse>('/api/signup',data)

            console.log("signUp response:",response);
            toast.success("successfully sign up", {
                // description:response.data.message,
                })
            router.replace(`/verify/${data.username}`)
            // router.replace('/signin')
            setIsSubmitting(false)
        } catch (error) {
            console.error("error in signup of user", error)
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            toast.error("signup failed")
            setIsSubmitting(false)
        } finally{
            setIsSubmitting(false)
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-green-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
                    🌱 CropAI Login
                    </h1>                
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField 
                        name="username"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="username" {...field}                      
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                        >    
                        </FormField>
                        <FormField 
                        name="email"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="email" {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                        > 
                        </FormField>
                        <FormField 
                        name="contactNumber"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>contact Number</FormLabel>
                                <FormControl>
                                    <Input 
    
                                        placeholder="contact number" {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                        > 
                        </FormField>
                        <FormField 
                        name="password"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="password"
                                        placeholder="password" {...field}
                                    />  
                                </FormControl>
                            </FormItem>
                        )}
                        >  
                        </FormField>
                        <Button type="submit" disabled= {isSubmitting} className='cursor-pointer'>
                        {
                            isSubmitting ? (
                                <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />please wait
                                </>
                            ) : ('signup')
                        }
                    </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                        <p>
                            Already a member?{""}
                            <Link href='/signin' className="text-blue-600 hover:text-blue-800">Sign-in</Link>
                        </p>
                </div>
            </div>
        </div>
    )
}


export default Page