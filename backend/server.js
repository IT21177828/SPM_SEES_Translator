import express from "express";
import cors from "cors";
import mongoose from "./db/conn.js"
// import "./loadEnvironment.mjs";
// import records from "./routes/record.mjs";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import usermodel from "./models/usermodel.js";
dotenv.config();

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

const User = mongoose.model("user", usermodel);



let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}


const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
//   console.log(connectionString);
});


app.get("/name", async (req, res) => {
    User.find().then((result)=>{
        console.log(result);
    }).catch((err)=>{
        console.log(err)
    })
    res.send("hello");
});

app.post("/name", (req, res) => {
    const user = new User({
        name: req.body.name
    })
    user.save().then((result)=>{
        console.log(result);
    }).catch((err)=>{
        console.log(err)
    })
    res.send("hello");
})
