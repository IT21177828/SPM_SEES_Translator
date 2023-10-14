import mongoose from "../db/conn.js";

const membership = new mongoose.Schema({

    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    },


    membershipType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "membershipType",
      },

    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },

    payment:{
        type: String,
        enum : ['pending','approved'],
        default:'approved'
    },
    status: {
        type: String,
        enum : ['active','inactive'],
        default: 'inactive'
    },
    email:{
        type:String,
        required:true

    },
    name:{
        type:String,
        required:true
    }
});

export default membership;
