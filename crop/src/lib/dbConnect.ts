import mongoose from "mongoose";
import { dbName } from "@/constant/constant";

type ConnectionObject = {
    isConnected?: number
}
const connection: ConnectionObject = {}
async function dbConnect():Promise<void>  {
    console.log("connection is connected:",connection);
    if(connection.isConnected){
        console.log("db connection already established")
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '',{
            dbName: dbName
        })
        console.log("connection:",db);
        console.log(`Connected to database: ${db.connections[0].name}`);
        connection.isConnected= db.connections[0].readyState        
       
    } catch (error) {
        console.log("db connection failed")
        process.exit(1)        
    }    
}
export default dbConnect

// console.log(dbConnect())