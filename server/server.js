import express from "express";
import cors from "cors"
import "dotenv/config"
import connectDb from "./configs/db.js"
import userRouter from "./Routes/userRoutes.js";
import resumeRouter from "./Routes/resumeRoutes.js";
import aiRouter from "./Routes/aiRoutes.js";

const app=express();
const PORT = process.env.PORT || 3000;

app.use(express.json()) //All the req are parsed using json method
app.use(cors())
await connectDb()

app.get('/',(req,res)=>{
    res.send("Api is runnig.....")
})
app.use('/api/users',userRouter);
app.use('/api/resumes',resumeRouter)
app.use('/api/ai',aiRouter)




app.listen(PORT,()=>{
    console.log(`Listening on Port ${PORT}`)
})