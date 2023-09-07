import mongoose from '../db/conn.js';

const membershipType = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    duration: {
        type: Number,
        default : 30
    },
});

export default membershipType;

