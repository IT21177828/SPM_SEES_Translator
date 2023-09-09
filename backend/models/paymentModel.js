import mongoose from "mongoose";

const payment = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },

    paymentMethod : {
        type : String,
        enum : ['card'],
        default : 'card'
    },

    currency : {
        type : String,
        enum : ['LKR', 'USD'],
        default : 'LKR'
    },

    source : {
        type : String,
        require : true
    },
    membershipType : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "membershipType"
    }


})

export default payment;