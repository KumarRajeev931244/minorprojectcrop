import dbConnect from "@/lib/dbConnect"
import FarmerModel from "@/model/farmer.model"
import bcrypt from "bcryptjs"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text",  },
                password: { label: "Password", type: "password" }
              },
            //   defining authorise function
              async authorize(credentials:any):Promise<any>{
                await dbConnect()
                try {
                    const user = await FarmerModel.findOne({
                        $or: [
                            {email: credentials.identifier},
                            {contactNumber: credentials.identifier}
                        ]
                    } )
                    if(!user){
                        throw new Error('no user found with this email or contact number')
                    }
                    if(!user.isVerified){
                        throw new Error("please verify your account")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                    if(isPasswordCorrect){
                        return user    
                    }else{
                        throw new Error("password is incorrect")
                    }
                    
                } catch (error:any) {
                    throw new Error(error)
                    
                }
              }
        })
    ],
    // Callbacks are asynchronous functions you can use to control what happens when an action is performed.
    callbacks:{
        async jwt({token,user}){
            if(user){
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.username = user.username;
                token.isLoggedIn = user.isLoggedIn;
            }
            return token
        },
        async session({session, token}){
            // ensure session.user exists before assigning
            // session.user = session.user ?? ({} as any);
            if(token){
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.username = token.username
                session.user.isLoggedIn = token.isLoggedIn
            }
            return session
        }
    },

    pages: {
        signIn: '/signin',
    },
    session:{
        strategy:"jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}