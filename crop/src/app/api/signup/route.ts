import { sendVerificationEmail } from "@/helpers/sendVerificationEmail"
import dbConnect from "@/lib/dbConnect"
import FarmerModel from "@/model/farmer.model"
import bcrypt from "bcryptjs"
export async function POST(request: Request){
    await dbConnect()
    try {
        const {username,email,contactNumber, password } = await request.json()
        const existingUserByEmail = await FarmerModel.findOne({email})
        const existingUserByContactNumber = await FarmerModel.findOne({contactNumber})
        const verifyCode = Math.floor(100000 + Math.random()*900000).toString()
        console.log("verify code:",verifyCode);
        if(existingUserByEmail){
           if(existingUserByEmail.isVerified){
            return Response.json({
                success:false,
                message: "user already exist with email"
            }, {
                status:500
            })
           }else{
            const hashedPassword = await bcrypt.hash(password,10)
            existingUserByEmail.password = hashedPassword;
            existingUserByEmail.verifyCode = verifyCode;
            existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
            await existingUserByEmail.save()
           } 
        }else{
            // if user does not exist 
            const hashedPassword = await bcrypt.hash(password,10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1);
            const newUser = new FarmerModel({
                username,
                email,
                contactNumber,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry:expiryDate,
                isLoggedIn:false,
                isVerified:false,
            })
            await newUser.save()

        }

        // send verification email 
        const emailResponse = await sendVerificationEmail(username, email, password,contactNumber)   
        if(!emailResponse.success){
            return Response.json({
                success: false,
                message: emailResponse.message
            },{
                status: 500
            })
        }
        return Response.json({
            success: true,
            message: "user registered successfully"
        }, {
            status: 201
        })
    } catch (error) {
        console.error("error while registering")
        return Response.json({
            success: false,
            message: "error registering user"
        }, {
            status: 500
        })       
    }
}