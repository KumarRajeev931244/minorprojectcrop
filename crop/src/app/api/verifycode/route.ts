
import dbConnect from "@/lib/dbConnect";
import FarmerModel from "@/model/farmer.model";


export async function POST(request: Request){
    await dbConnect()
    try {
        const {username, code} = await request.json();
        const decodedUsername = decodeURIComponent(username)
        const user = await FarmerModel.findOne({username:decodedUsername})
        if(!user){
            return Response.json({
                success:false,
                message:"user not found"
            },
        {
            status:404
        })
        }
        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpire = new Date(user.verifyCodeExpiry) > new Date();
        if(isCodeValid && isCodeNotExpire){
            user.isVerified = true;
            await user.save();
            return Response.json({
                success:true,
                message:"account verified successfully"
            },
            
        {
            status:200
        })
        }else if(!isCodeNotExpire){
            return Response.json({
                success:false,
                message:"verification code has expired, please signup again to get a new code"
            },
        {
            status:400
        })
        }else{
            return Response.json({
                success:false,
                message:"incorrect verification code"
            },
        {
            status:400
        })
        }
        
  
    } catch (error) {
        console.log("error while checking verify code:", error)
        return Response.json({
            success:false,
            message: "error while checking verify code"
        },{
            status:500
        })
        
    }
        
    
}