import mongoose from "../db/conn.js";

const membership = new mongoose.Schema({

    user:{
        type : String,
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
    status: {
        type: String,
        enum : ['active','inactive'],
        default: 'inactive'
    }
});

export default membership;
