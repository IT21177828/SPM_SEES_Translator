// import mongoose from "../db/conn.js";
// import userSchema from "../models/usermodel.js";
// import crypto from "crypto";
// import jwt from "jsonwebtoken";

// export const userModel = mongoose.model("user", userSchema);


// export function hashPasswordNew(password){
//     return crypto.pbkdf2Sync(password, "no_salt",  
//         1000, 64, `sha512`).toString(`hex`); 
    
// }


// //add new user
// export function registerUser(req,res){
//     const {firstName, lastName, email, passwordHash, gender, age, address} = req.body;

//     let newUser = new userModel()
//     newUser.firstName = firstName
//     newUser.lastName = lastName
//     newUser.email = email
//     newUser.passwordHash = hashPasswordNew(passwordHash)  
//     newUser.gender = gender
//     newUser.age = age
//     newUser.address = address

//     newUser.save().then((response)=>{
//         res.send(response)
//         console.log("User added successfully");
//     }).catch((err)=>{
//         res.send(err)
//         console.log(err)
//     })
// }


// // create an admin account
// export function adminAccount(req,res){
//     const {firstName, lastName, email, passwordHash, gender, age, address} = req.body;

//     let newUser = new userModel()
//     newUser.firstName = "admin"
//     newUser.lastName = "superadmin"
//     newUser.email = "admin@gmail.com"
//     newUser.passwordHash = hashPasswordNew("0000")  
//     newUser.gender = "---"
//     newUser.age = 12
//     newUser.address = "admin"

//     newUser.save().then((response)=>{
//         res.send(response)
//         console.log("User added successfully");
//     }).catch((err)=>{
//         res.send(err)
//         console.log(err)
//     })
// }


// // login user
// export function loginUser(req,res){

//     const {email, passwordHash} = req.body;

//     const user = userModel.findOne({email:email}).then((response)=>{

//         // check response is not null
//         if(response != null){
//             // check if the user is admin
//             if(response.email === "admin@gmail.com" && response.passwordHash === hashPasswordNew("0000")){
//                 const token = jwt.sign({email : user.email}, "secret_key",{
//                     expiresIn: "1h",
//                 });

//                 // req.session.userId = response._id;

//                 res.status(200).json({
//                     message : "Auth successful, admin",
//                     token: token,
//                 });

//             }
//             else{
//                 if(response.passwordHash == hashPasswordNew(passwordHash)){

//                     const token = jwt.sign({email : user.email}, "secret_key",{
//                         expiresIn: "1h",
//                     });

//                     res.status(200).json({
//                         message : "Auth successful",
//                         token: token,
//                     });

//                 }else{
//                     res.send("Incorrect password")
//                 }
//             }
//         }else{
//             res.send("User not found")
//         }
//     }
//     ).catch((err)=>{
//         res.send(err)
//         console.log(err)

//     })

// }


// //checking age for safe browsing
// export function checkAge(req,res){
//     const {age} = req.body;

//     if(age < 18){
//         res.send("You are not eligible to register")
//         // other code
//     }else{
//         res.send("You are eligible to register")
//     }
// }


// export function updateUser(req,re){
//     const {firstName, lastName, email, passwordHash, gender, age, address} = req.body;


// }


