import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}
const connection: ConnectionObject = {}
async function dbConnect():Promise<void>  {
    if(connection.isConnected){
        console.log("db connection already established")
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '')
        // console.log("connection:",db);
        connection.isConnected= db.connections[0].readyState        
       
    } catch (error) {
        console.log("db connection failed")
        process.exit(1)        
    }    
}
export default dbConnect