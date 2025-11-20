import mongoose, {Schema,Document} from "mongoose";

export interface IFarmer extends Document{
    farmerName:string,
    email:string,
    contactNumber:number,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified:boolean,
    
}

const farmerSchema:Schema<IFarmer> = new Schema({
    farmerName:{
        type:String,
        required:[true,"name is required"],
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique: true,
        match:[ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"please enter a valid email"]
    },
    contactNumber:{
        type:Number,
        required:[true,"contact number is required"],
        unique: true,
        match:[ /^(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/,"please enter a valid contact number"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        unique: true,
    },
    verifyCode:{
        type:String,
        required:[true,"verify code is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"verify code expiry  is required"],
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const FarmerModel = (mongoose.models.Farmer as mongoose.Model<IFarmer>) || mongoose.model("Farmer",farmerSchema)

export default FarmerModel;