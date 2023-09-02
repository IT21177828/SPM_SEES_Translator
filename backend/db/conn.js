import dotenv from "dotenv"
import mongoose from 'mongoose'
dotenv.config();
mongoose.connect(process.env.ATLAS_URI,{

    useNewUrlParser: true,
    useUnifiedTopology: true
  
  }).then((result)=>{
    console.log("mongo db connected!!!")
  })
  export default mongoose