import mongoose from "mongoose";
import "dotenv/config"


const connectDb= async()=>{
    try{
        mongoose.connection.on("connected",()=>{
            console.log("Database Connected successfully")
        })

        let db_uri=process.env.MONGODB_URI;

        if(!db_uri){
            throw new Error("Mongodb_uri not specified in env file");
        }

        if(process.env.MONGODB_URI.endsWith('/')){
            db_uri=db_uri.slice(0,-1);
        }
        
        await mongoose.connect(db_uri,{dbName: "AI-resume-builder"})

    }catch(e){
        console.log("Failed to connect to DB. Error :"+e.message)
    }
}

export default connectDb;

