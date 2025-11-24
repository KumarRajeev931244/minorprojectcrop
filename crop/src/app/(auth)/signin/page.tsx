'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import Link from "next/link"

const page = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues:{
            identifier:'',
            password: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        const result = await signIn('credentials',{
            redirect: false,
            identifier: data.identifier,
            password: data.password
        })
        // TODO: console log error
        if(result?.error){
            toast.error(" username or password incorrect" )
        }     
        if(result?.url){
            toast.success("login successfully")
            router.replace('/dashboard')
        }   
    }
    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tacking-light lg:text-5xl mb-6">Join Mystry Message
                    </h1>
                    <p className="mb-4"> sign in to start your anonymous adventure</p>                 
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                       
                        <FormField 
                        name="identifier"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email/Username</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="email/username" {...field}
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
                                        placeholder="password" {...field}
                                    />  
                                </FormControl>
                            </FormItem>
                        )}
                        >  
                        </FormField>
                        <Button className='cursor-pointer' type="submit">
                            sign in
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                        <p>
                            Not a member?{""}
                            <Link href='/sign-up' className="text-blue-600 hover:text-blue-800">Sign-up</Link>
                        </p>
                 </div>
            </div>
        </div>
    )
}


export default page