import bcryptjs from "bcryptjs";
import { NextRequest,NextResponse } from "next/server";
import toast from "react-hot-toast";
import FarmerModel from "@/model/farmer.model";
import dbConnect from "@/lib/dbConnect";
import jwt from 'jsonwebtoken';


await dbConnect()
export async function POST(request: NextRequest){
    try {
        const requestBody = await request.json()
        const {email, contactNumber, password} = requestBody
        const user = await FarmerModel.findOne({
            $or: [
                    { email: email },
                    { contactNumber: contactNumber }
                ]
        })
       
        // if user does not exist
        if(!user){
            return NextResponse.json(
                {message: "user does not exist"},
                {status:400}
            )
        }
        // user already
        toast.error("user already exist")
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json(
                {message: "incorrect password"},
                {status: 400}
            )
        }

    
        const tokenData = {
            id: user._id,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

        const response = NextResponse.json(
            {
                message: "logged in success"
            },
            {
                status:200
            }
        )
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true
        })
        return response
        
    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status:500}
        )
        
    }
}