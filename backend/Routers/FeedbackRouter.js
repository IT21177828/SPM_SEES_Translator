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
feedbackRouter.post('/', createFeedback);

// Get all feedback
feedbackRouter.get('/', getAllFeedback);

// Get feedback by ID
feedbackRouter.get('/:id', getFeedbackById);

// Update feedback by ID
feedbackRouter.put('/:id', updateFeedbackById);

// Delete feedback by ID
feedbackRouter.delete('/:id', deleteFeedbackById);

export default feedbackRouter;
