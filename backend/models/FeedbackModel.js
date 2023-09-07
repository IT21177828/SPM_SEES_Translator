import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  feedbackText: {
    type: String,
    required: true,
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

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
