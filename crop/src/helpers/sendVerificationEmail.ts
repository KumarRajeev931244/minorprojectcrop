import { resend } from "@/lib/resend";
import VerificationEmailTemplates from "../../emails/VerificationEmailTemplates";
import { ApiResponse } from "@/types/ApiResponse";


export async function sendVerificationEmail(email:string,username:string,verifyCode:string,contactNumber:Number):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'CropAI Verification Code',
            react: VerificationEmailTemplates({username, otp:verifyCode})
                });
        return {success:true, message:"verification email send successfully"}
    } catch (error) {
        console.error("error sending verification email",error);
        return {success:false, message:"failed to send verification email"}
        
    }


}