import express from 'express';
import {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
} from '../controllers/FeedbackController.js';

const feedbackRouter = express.Router();

// Create new feedback
FeedbackRouter.post('/', createFeedback);

// Get all feedback
FeedbackRouter.get('/', getAllFeedback);

// Get feedback by ID
FeedbackRouter.get('/:id', getFeedbackById);

// Update feedback by ID
feedbackRouter.put('/:id', updateFeedbackById);

// Delete feedback by ID
FeedbackRouter.delete('/:id', deleteFeedbackById);

export default feedbackRouter;
