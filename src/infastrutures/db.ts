import mongoose from "mongoose";


export const connectDB = async () => {

    try {
        const connectionString = process.env.MONGOURI;
        if (!connectionString) {
            throw new Error("Please Enter Connection String");
        }
        await mongoose.connect(connectionString);
        console.log("DB connection Successfull!"); 
        
    } catch (error) {
        console.log("DB connection Fail!"); 
        console.log(error)
    }

}