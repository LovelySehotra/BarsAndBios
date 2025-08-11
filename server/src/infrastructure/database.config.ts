import mongoose from "mongoose";
import {DATABASE_URL}  from "@/config";

export  const connectionToDB = async()=>{
    try{
        const {connection }=await mongoose.connect(
            DATABASE_URL || 'mongodb://127.0.0.1:27017/lms'
        );
        if(connection){
            console.log(`Connected to MongoDb:${connection.host}`);
        }
    }catch(e){
        console.log(e);
        process.exit(1);//terminate the server because database is not connect
    }
}
