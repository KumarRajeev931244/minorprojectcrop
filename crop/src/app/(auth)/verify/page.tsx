'use client'
import { useParams, useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { ApiResponse } from '@/types/ApiResponse'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { verifyCodeSchema } from '@/schema/verifySchema'


const Page = () => {
    const router =  useRouter()
    // getting data from url
    const form = useForm<z.infer<typeof verifyCodeSchema>>({
        resolver: zodResolver(verifyCodeSchema)
    })
    const onSubmit = async(data: z.infer<typeof verifyCodeSchema>) => {
       
        try {
            const response = await axios.post<ApiResponse>(`/api/verifycode`, {
                code: data.code
            })
            toast.success("verification done successfully")
            router.replace('/signin')
        } catch (error) {
            console.error("error in verification of user", error)
        }
    }
    return (
       <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tacking-light lg:text-5xl mb-6">verify your account</h1>
                <p className="mb-4"> Enter the verification code sent to your email</p>                 
            </div>
            <div className="text-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                        <FormField
                            name='code'
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>verification code</FormLabel>
                                    <FormControl>
                                        
                                        <Input placeholder='code' {...field}/>
 
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        >
                        </FormField>
                        <Button className='cursor-pointer' type='submit'>Submit</Button>
                    </form>
                </Form>
            
            </div>
        </div>

       </div>
    )
}


export default Page