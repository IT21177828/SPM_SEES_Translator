// import mongoose from 'mongoose';
import mongoose from "../db/conn.js";

const feedbackSchema = new mongoose.Schema({
  word: {
    type: String,
    // required: true,
  },
  feedbackText: {
    type: String,
    // required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default feedbackSchema;
